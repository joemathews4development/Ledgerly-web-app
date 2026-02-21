/**
 * DeleteConfirmationModal.jsx
 *
 * Reusable delete confirmation dialog component. Displays a delete button that
 * triggers a modal confirmation dialog with customizable warning message.
 * Handles confirmation and cancellation with appropriate callbacks.
 */

import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

/**
 * DeleteConfirmation - Modal confirmation dialog for delete operations
 *
 * Features:
 * - Delete button with trash icon trigger
 * - Modal confirmation dialog with centered layout
 * - Customizable confirmation message content
 * - Cancel and Delete action buttons
 * - Clean separation of concerns with callback pattern
 * - Prevents accidental deletions with explicit confirmation
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onConfirm - Callback function executed when delete is confirmed
 * @param {React.ReactNode} props.content - The content/message displayed in the modal body (can include JSX)
 * @returns {React.ReactElement} Delete button with confirmation modal
 *
 * @example
 * const handleDelete = async () => {
 *   // Delete logic here
 * }
 * const message = (
 *   <>
 *     Are you sure?
 *     <br />
 *     <strong>This action cannot be undone.</strong>
 *   </>
 * )
 * <DeleteConfirmation onConfirm={handleDelete} content={message} />
 */
function DeleteConfirmation({ onConfirm, content }) {

  /** @type {[boolean, Function]} Controls visibility of the confirmation modal */
  const [show, setShow] = useState(false)

  // Close the confirmation modal
  const handleClose = () => setShow(false)

  // Open the confirmation modal
  const handleShow = () => setShow(true)

  /**
   * Execute the delete operation and close the modal.
   * Calls the onConfirm callback passed from parent component.
   */
  const handleDelete = () => {
    onConfirm()
    handleClose()
  }

  return (
    <>
      {/* Delete Button - Triggers confirmation modal */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleShow}
      >
        <i className="bi bi-trash"></i>
        Delete
      </Button>

      {/* Confirmation Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        {/* Custom confirmation message passed from parent */}
        <Modal.Body>{content}</Modal.Body>

        {/* Action Buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteConfirmation