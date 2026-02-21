/**
 * MonthDetailsPage.jsx
 *
 * Detailed view of transactions for a specific month. Provides comprehensive
 * filtering and sorting capabilities to explore expenses and revenues by category,
 * type, date, and search term. Includes visual chart summary and transaction listing.
 */

import { useContext, useState, useMemo } from "react"
import { DataContext } from "../context/expenserevenue.context"
import { useParams } from "react-router-dom"
import TransactionCard from "../components/TransactionCard"
import { Card, Col, ListGroup, Row, Stack } from "react-bootstrap"
import SearchBar from "../components/SearchBar"
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import CollapsibleBarChart from "../components/Chart/CollapsibleBarChart"

/**
 * MonthDetailsPage - Detailed month view with advanced transaction filtering
 *
 * Features:
 * - Monthly transaction chart breakdown by category
 * - Multi-criteria filtering (category, type, search term)
 * - Sorting options (newest/oldest first)
 * - Dynamic category extraction from transaction data
 * - Responsive transaction list with details
 *
 * Route Params:
 * - yearMonth (string): Format "YYYY-M" to identify the selected month
 *
 * @component
 * @returns {React.ReactElement} Month detail page with filters, chart, and transaction list
 */
function MonthDetailsPage() {

    // Retrieve monthly overview data from context
    const { monthOverviews } = useContext(DataContext)

    /** @type {[string, Function]} Search term for filtering transactions by title */
    const [searchTerm, setSearchTerm] = useState("")

    /** @type {[string, Function]} Selected category filter (default: "All") */
    const [selectedCategory, setSelectedCategory] = useState("All")

    /** @type {[string, Function]} Selected transaction type filter (default: "All") */
    const [selectedType, setSelectedType] = useState("All")

    /** @type {[string, Function]} Selected sorting order (default: "Newest first") */
    const [selectedSortingType, setSelectedSortingType] = useState("Newest first")

    // Extract month parameter from URL route
    const params = useParams()

    // Find the month data matching the route parameter
    const monthOverview = monthOverviews.find(([month, transactions]) => month === params.yearMonth)

    // Filter and sort transactions based on current filter and search selections
    const filteredTransactions = monthOverview[1]
        .filter(transaction => transaction.category === selectedCategory || selectedCategory === "All")
        .filter(transaction => transaction.type === selectedType.toLowerCase() || selectedType === "All")
        .filter(transaction => transaction.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => selectedSortingType === "Newest first" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt))

    /**
     * First it maps over the transactions to extract the category of each transaction,
     * then it filters out any falsy values (like null or undefined) to ensure only valid 
     * categories are included. Next, it creates a Set from the filtered categories to 
     * eliminate duplicates, and finally converts the Set back into an array and sorts it alphabetically.
     * The resulting array of unique, sorted categories is then combined with the "All" 
     * option at the beginning to create the final list of categories for filtering.
     * The useMemo hook ensures that this computation only runs when the monthOverviews 
     * data changes, optimizing performance by avoiding unnecessary recalculations on every render.
     */
    const categories = useMemo(() => {
        return [
            "All",
            ...[...new Set(monthOverview[1].map(tx => tx.category).filter(value => Boolean(value)))].sort()
        ]
    }, [monthOverviews])

    // Available transaction type options for filtering
    const types = ["All", "Expense", "Revenue"]

    // Available sorting options for transaction ordering
    const sortingTypes = ["Newest first", "Oldest first"]

    // Human-readable month label (e.g., "February 2026")
    const formattedDate = new Date(monthOverview[0]).toLocaleString("en-US", {
        year: "numeric",
        month: "long"
    })

    return (
        <div>
            {/* Page Header with Month Label */}
            <h1 className="py-3">{formattedDate}</h1>

            {/* Transaction Chart Summary */}
            <CollapsibleBarChart transactions={filteredTransactions} className="py-3" />

            {/* Filter and Search Controls */}
            <Row className="g-3 justify-content-around align-items-center mx-5">
                <Col md={6}>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchBar>
                </Col>
                <Col md={2}>
                    <FloatingLabel
                        controlId="floatingSort"
                        label="Sort"
                    >
                        <Form.Select
                            value={selectedSortingType}
                            onChange={(e) => setSelectedSortingType(e.target.value)}
                        >
                            {sortingTypes.map((sortingType) => <option value={sortingType}>{sortingType}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md={2}>
                    <FloatingLabel
                        controlId="floatingCategory"
                        label="Filter by Category"
                    >
                        <Form.Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => <option value={category}>{category}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md={2}>
                    <FloatingLabel
                        controlId="floatingType"
                        label="Filter by Type"
                    >
                        <Form.Select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {types.map((type) => <option value={type}>{type}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            {/* Transaction List Card */}
            <div className="mx-5 py-5">
                <Card className="shadow-sm">
                    <Card.Header className="fw-bold">
                        <Stack direction='horizontal' className="align-items-center py-1 text-info">
                            <div className="w-100">Date</div>
                            <div className="w-100">Title</div>
                            <div className="w-100">Amount</div>
                            <div className="w-100">Category</div>
                            <div className="w-100">Vendor/Payer</div>
                            <div className="w-100"></div>
                        </Stack>
                    </Card.Header>
                    <ListGroup variant="flush">
                        {filteredTransactions.length === 0 ? 
                            <p style={{ textAlign: "center" }}>No transactions found.</p>
                            : filteredTransactions.map((transaction) => {
                                return (
                                    <ListGroup.Item key={transaction.id}>
                                        <TransactionCard transaction={transaction} />
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Card>
            </div>
        </div>
    )
}

export default MonthDetailsPage