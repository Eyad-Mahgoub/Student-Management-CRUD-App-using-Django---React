import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
// import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { addStudent } from "../services/StudentServices";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddStudentModal = (props) => {

    const MySwal = withReactContent(Swal);
    
    const handleSubmit = e => {
        e.preventDefault();
        addStudent(e.target).then((result) => {
            props.setUpdated(true);
            props.onHide();

            MySwal.fire({
                title: "Student Added Successfully",
                icon: "success"
            })

        }, (error) => {
            MySwal.fire("Failed to Add Student", '', "error");
        })
    }

    return (
        <div className='container'>
            <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton> 
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Fill in Student Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='FirstName'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type='text' name='FirstName' required placeholder='' />
                                </Form.Group>
                                <Form.Group controlId='LastName'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type='text' name='LastName' required placeholder='' />
                                </Form.Group>
                                <Form.Group controlId='RegistrationNo'>
                                    <Form.Label>Registration No</Form.Label>
                                    <Form.Control type='text' name='RegistrationNo' required placeholder='' />
                                </Form.Group>
                                <Form.Group controlId='Email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' name='Email' required placeholder='' />
                                </Form.Group>
                                <Form.Group controlId='Course'>
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control type='text' name='Course' required placeholder='' />
                                </Form.Group>
                                <Form.Group>
                                    <p></p>
                                    <Button variant='primary' type='submit'>Submit</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' type='submit' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddStudentModal;