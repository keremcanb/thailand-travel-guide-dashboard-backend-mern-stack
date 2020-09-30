import React, { useState } from 'react';
import { Button, Icon, Modal, TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { addCategory } from '../../actions/category';
import useResources from '../../utils/useResources';

const AddCategoryModal = ({ addCategory }) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, thumbnail } = category;
  const locations = useResources('locations');
  const animatedComponents = makeAnimated();

  const onChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter category' });
    } else {
      addCategory(category);
      M.toast({ html: `Category added` });
      setCategory(initialFormState);
    }
  };

  return (
    <Modal
      id="add-category-modal"
      style={{
        height: '100%',
        width: '60%'
      }}
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
      trigger={
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          waves="light"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <Select
        id="add-cat-loc"
        name="location"
        placeholder="Location *"
        options={locations.map((loc) => ({
          value: loc.title,
          label: loc.title
        }))}
        onChange={onSelect}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
      />
      {/* <Select
        id="location"
        name="location"
        onChange={onChange}
        multiple
      >
        <option disabled value="">
          Location
        </option>
        {locations.map((location) => (
          <option key={location._id} value={location.title}>
            {location.title}
          </option>
        ))}
      </Select> */}
      <TextInput
        id="add-cat-title"
        name="title"
        placeholder="Title *"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="add-cat-thumb"
        name="thumbnail"
        placeholder="Thumbnail *"
        value={thumbnail}
        onChange={onChange}
      />
    </Modal>
  );
};

AddCategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory })(AddCategoryModal);
