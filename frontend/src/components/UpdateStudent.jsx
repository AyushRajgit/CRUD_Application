import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/config.js"

function UpdateStudent() {
    const navigate = useNavigate();
    const { id } = useParams(); // This grabs the student ID from the URL

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        mobileNumber: ""
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/student/get/${id}`)
            .then(res => res.json())
            .then(data => setFormData(data))
            .catch(err => console.error("Error fetching student details:", err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${API_BASE_URL}/api/student/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    console.log("Student updated successfully!");
                    navigate('/dashboard');
                } else {
                    console.error("Failed to update student");
                }
            })
            .catch(err => console.error("Error updating student:", err));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text" name="firstName" placeholder="First Name"
                    value={formData.firstName} onChange={handleChange} required
                />
                <input
                    type="text" name="lastName" placeholder="Last Name"
                    value={formData.lastName} onChange={handleChange} required
                />
                <input
                    type="email" name="email" placeholder="Email"
                    value={formData.email} onChange={handleChange} required
                />
                <input
                    type="number" name="age" placeholder="Age"
                    value={formData.age} onChange={handleChange} required
                />
                <input
                    type="text" name="mobileNumber" placeholder="Mobile Number"
                    value={formData.mobileNumber} onChange={handleChange} required
                />

                <button type="submit" style={{ marginTop: '10px' }}>Update Student</button>
                <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateStudent;