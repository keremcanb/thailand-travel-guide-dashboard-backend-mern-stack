import { TextInput, Row } from 'react-materialize';

const SearchBox = ({ onSearch }) => (
  <Row className="row-grid" style={{ marginBottom: '5px', marginTop: '5px' }}>
    <TextInput type="search" placeholder="Filter" onChange={onSearch} />
  </Row>
);

export default SearchBox;
