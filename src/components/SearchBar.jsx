/**
 * SearchBar.jsx
 *
 * Reusable search input component for filtering transactions by title.
 * Provides real-time search functionality with visual search icon and placeholder text.
 */

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

/**
 * SearchBar - Input component for searching transactions by title
 *
 * Features:
 * - Real-time search input with visual search icon
 * - Controlled component pattern for parent state management
 * - Bootstrap-styled input with integrated search icon
 * - Responsive width with centered alignment
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.searchTerm - Current search term value controlled by parent
 * @param {Function} props.setSearchTerm - Callback function to update search term in parent state
 * @returns {React.ReactElement} Styled search input field
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState("");
 * <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
 */
function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <InputGroup className="mx-auto my-3">
            {/* Search Icon */}
            <InputGroup.Text>
                <i className="bi bi-search"></i>
            </InputGroup.Text>

            {/* Search Input Field */}
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