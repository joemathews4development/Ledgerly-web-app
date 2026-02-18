import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

function DeleteConfirmation({ onConfirm, content }) {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDelete = () => {
    onConfirm()
    handleClose()
  }

  return (
    <>
      {/* Delete Button */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={handleShow}
      >
        <i className="bi bi-trash"></i>
        Delete
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>{content}</Modal.Body>

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