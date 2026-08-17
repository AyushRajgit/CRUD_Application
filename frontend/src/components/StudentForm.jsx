import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/config.js"

function StudentForm() {
    const navigate = useNavigate();

    // State to hold the form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        mobileNumber: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        fetch(`${API_BASE_URL}/api/student/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    console.log("Student created successfully!");
                    navigate('/dashboard'); // Redirect back to the dashboard
                } else {
                    console.error("Failed to create student");
                }
            })
            .catch(err => console.error("Error creating student:", err));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Add New Student</h2>
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

                <button type="submit" style={{ marginTop: '10px' }}>Save Student</button>
                <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
            </form>
        </div>
    );
}

export default StudentForm;