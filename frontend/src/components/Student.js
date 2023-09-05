import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import { getStudents } from "../services/StudentServices";
import "../App.css"

const Students = () =>{
    const [students, setStudents] = useState([]);

    useEffect(() => {
        let mounted = true;
        getStudents().then(data => {
            if (mounted) {
                setStudents(data)
            }
        })
        return () => mounted = false
    }, []);

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <p id="before-table"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Registration No</th>
                            <th>Email</th>
                            <th>Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((stu) => 
                            <tr key={stu.studentId}>
                                <th>{stu.studentId}</th>
                                <th>{stu.FirstName}</th>
                                <th>{stu.LastName}</th>
                                <th>{stu.RegistrationNo}</th>
                                <th>{stu.Email}</th>
                                <th>{stu.Course}</th>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Students