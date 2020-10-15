import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { getCategories } from '../../actions/category';
import CategoryItem from './CategoryItem';
import CategoryFilter from './CategoryFilter';
import Loader from '../layout/Loader';
import Fab from '../layout/Fab';

const Categories = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);
  const { categories, loading, filtered } = category;

  useEffect(() => {
    dispatch(getCategories());
    document.title = 'Categories';
  }, [dispatch]);

  return (
    <>
      <CategoryFilter />
      {categories && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((item) => (
                  <CategoryItem key={item._id} category={item} />
                ))
              : categories.map((item) => (
                  <CategoryItem key={category._id} category={item} />
                ))}
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
      <Link to="addcategory">
        <Fab />
      </Link>
    </>
  );
};

export default Categories;
