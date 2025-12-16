import React, { useState } from "react";
import { addStudent } from "../api/api";

function AddStudent({ departmentId, onStudentAdded }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Don't set departmentId on creation - student is unassigned
        await addStudent({ name, email });
        alert("Student added!");
        setName("");
        setEmail("");
        if (onStudentAdded) onStudentAdded();
    };

    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Student name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddStudent;
