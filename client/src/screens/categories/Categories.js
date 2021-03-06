import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { Helmet } from 'react-helmet';
import { getCategories } from '../../store/actions/category';
import CategoryItem from './CategoryItem';
import CategoryFilter from './CategoryFilter';
import Loader from '../../components/utils/Loader';
import Fab from '../../components/utils/Fab';

const Categories = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const { categories, loading, filtered } = category;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <CategoryFilter />
      {categories && !loading ? (
        <Row>
          <Col className="grid-style">
            {filtered
              ? filtered.map((item) => <CategoryItem key={item._id} category={item} />)
              : categories.map((item) => <CategoryItem key={category._id} category={item} />)}
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
