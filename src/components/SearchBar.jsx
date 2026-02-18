import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function SearchBar({searchTerm, setSearchTerm}) {
    return (
        <InputGroup className="mx-auto my-3">
            <InputGroup.Text>
                <i className="bi bi-search"></i>
            </InputGroup.Text>

            <Form.Control
                type="search"
                placeholder="Search transactions by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </InputGroup>
    )
}

export default SearchBar;