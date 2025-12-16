import React, { useState } from "react";
import { addCourse } from "../api/api";

function AddCourse({ departmentId, onCourseAdded }) {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCourse({ name, departmentId });
        alert("Course added!");
        setName("");
        if (onCourseAdded) onCourseAdded();
    };

    return (
        <div>
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Course name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddCourse;
