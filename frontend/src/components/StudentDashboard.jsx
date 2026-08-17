import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/config.js"

function StudentDashboard() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/student/getAll`)
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const handleDelete = (id) => {
        fetch(`${API_BASE_URL}/api/student/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
                    console.log("Successfully deleted student:", id);
                }
            })
            .catch(err => console.error("Error deleting data:", err));
    }

    const handleUpdate = (id, studentData) => {
        fetch(`${API_BASE_URL}/api/student/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
            .then(res => res.json())
            .then(updatedStudent => {
                setStudents(prevStudents =>
                    prevStudents.map(student =>
                        student.id === id ? updatedStudent : student
                    )
                );
                console.log("Successfully updated student:", id);
            })
            .catch(err => console.error("Error updating data:", err));
    }

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate("/")}>← Back to Home</button>

            <h2>Student Dashboard</h2>
            <button onClick={() => navigate("/add-student")}>+ Add New Student</button>

            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        {student.firstName} | {student.lastName} | {student.email} | {student.age} | {student.mobileNumber}
                        <button onClick={() => handleDelete(student.id)}>Delete</button>
                        <button onClick={() => navigate(`/update-student/${student.id}`)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default StudentDashboard;