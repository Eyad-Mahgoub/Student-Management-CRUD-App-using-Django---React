import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getStudents, deleteStudent } from "../services/StudentServices";
import AddStudentModal from "./AddStudentModal";
import UpdateStudentModal from "./UpdateStudentModal";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Manage = () =>{
    const [students, setStudents] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editStudent, setEditStudent] = useState([]);
    const [isUpdated, setIsUpdated] = useState([]);
    const MySwal = withReactContent(Swal);
    
    useEffect(() => {
        let mounted = true;

        if (students.length && !isUpdated) {
            return;
        }

        getStudents().then(data => {
            if (mounted) {
                setStudents(data);
            }
        })

        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, students]);

    const handleUpdate = (e, stu) => {
        e.preventDefault()
        setEditModalShow(true);
        setEditStudent(stu);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    }

    const handleDelete = (e, studentId) => {

        MySwal.fire({
            title: 'Are You Sure you want to delete student ID ' + studentId,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault()
                deleteStudent(studentId).then((result) => {
                    MySwal.fire("Student Deleted Successfully", '', 'success');
                    setIsUpdated(true);
                }, (error) => {
                    MySwal.fire("Failed to Delete Student", "", "error");
                })
        
            }
        })
    }

    let AddModalClose = () => setAddModalShow(false);
    let editModalClose = () => setEditModalShow(false);

    return (
        <div className='container-fluid side-container'>
            <div className='row side-row' >
                <p id='manage'></p>
                <Table striped bordered hover className='react-bootstrap-table' id='dataTable'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Registration No</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { students.map((stu) => 
                            <tr key={stu.studentId}>
                                <td>{stu.studentId}</td>
                                <td>{stu.FirstName}</td>
                                <td>{stu.LastName}</td>
                                <td>{stu.RegistrationNo}</td>
                                <td>{stu.Email}</td>
                                <td>{stu.Course}</td>
                                <td>
                                    <Button className='me-2' variant='danger' onClick={event => handleDelete(event, stu.studentId)}><RiDeleteBin5Line /></Button>
                                    <Button className='me-2'  onClick={event => handleUpdate(event, stu)}><FaEdit /></Button>
                                    <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated} onHide={editModalClose}></UpdateStudentModal>
                                </td>
                            </tr>
                        ) }
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={handleAdd}>Add Student</Button>
                    <AddStudentModal show={addModalShow} setUpdated={setIsUpdated} onHide={AddModalClose}></AddStudentModal>
                </ButtonToolbar>
            </div>
        </div>
    )

}

export default Manage;