
/**
 * Represents an expense entry in the Ledgerly application.
 * This class encapsulates all the details of a single expense transaction.
 */
class Expense {

    /**
     * Creates an instance of Expense.
     * @param {string|number} id - The unique identifier for the expense.
     * @param {string} title - The title or description of the expense.
     * @param {number} amount - The monetary amount of the expense.
     * @param {string} category - The category under which the expense falls (e.g., 'Food', 'Transportation').
     * @param {string} vendor - The vendor or merchant where the expense was incurred.
     * @param {string} note - Additional notes or comments about the expense.
     * @param {string} receiptUrl - The URL to the receipt image or document.
     * @param {Date|string} createdAt - The date and time when the expense was created.
     */
    constructor(id, title, amount, category, vendor, note, receiptUrl, createdAt) {
        this.id = id
        this.title = title
        this.amount = amount
        this.category = category
        this.vendor = vendor
        this.note = note
        this.receiptUrl = receiptUrl
        this.createdAt = createdAt
    }

}