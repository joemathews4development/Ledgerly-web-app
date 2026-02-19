import { useContext, useState, useMemo } from "react";
import { DataContext } from "../context/expenserevenue.context"
import { useParams } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";
import { Card, Col, ListGroup, Row, Stack } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import MonthlyTransactionsBar from "../components/Chart/BarChart";
import CollapsibleBarChart from "../components/Chart/CollapsibleBarChart";

function MonthDetailsPage(props) {

    const { monthOverviews } = useContext(DataContext)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedType, setSelectedType] = useState("All")
    const [selectedSortingType, setSelectedSortingType] = useState("Newest first")

    const params = useParams()

    const monthOverview = monthOverviews.find(([month, transactions]) => month === params.yearMonth)

    const filteredTransactions = monthOverview[1]
        .filter(transaction => transaction.category === selectedCategory || selectedCategory === "All")
        .filter(transaction => transaction.type === selectedType.toLowerCase() || selectedType === "All")
        .filter(transaction => transaction.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => selectedSortingType === "Newest first" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt))

    const categories = useMemo(() => {
        return [
            "All",
            ...[...new Set(monthOverview[1].map(tx => tx.category).filter(value => Boolean(value)))].sort()
        ]
    }, [monthOverviews])

    const types = ["All", "Expense", "Revenue"]

    const sortingTypes = ["Newest first", "Oldest first"]

    const formattedDate = new Date(monthOverview[0]).toLocaleString("en-US", {
        year: "numeric",
        month: "long"
    })

    return (
        <div>
            <h1 className="py-3">{formattedDate}</h1>
            <CollapsibleBarChart transactions={filteredTransactions} className="py-3" />
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
                        {filteredTransactions.length === 0 ? <p style={{ textAlign: "center" }}>No transactions found.</p>
                            : filteredTransactions.map((transaction) => {
                                return (
                                    <ListGroup.Item key={transaction.id}>
                                        <TransactionCard transaction={transaction} />
                                    </ListGroup.Item>
                                )
                            })}
                    </ListGroup>
                </Card>
            </div>
        </div>
    )
}

export default MonthDetailsPage