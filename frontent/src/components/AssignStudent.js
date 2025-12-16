import React, { useState } from "react";
import { assignStudent } from "../api/api";

function AssignStudent({ onStudentAssigned }) {
    const [studentId, setStudentId] = useState("");
    const [courseId, setCourseId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await assignStudent(studentId, courseId);
            if (response.ok) {
                alert("Student assigned to course!");
                setStudentId("");
                setCourseId("");
                if (onStudentAssigned) onStudentAssigned();
            } else {
                const error = await response.text();
                alert("Error: " + error);
            }
        } catch (error) {
            alert("Error: Could not assign student. Student may already be in a different department.");
        }
    };

    return (
        <div>
            <h2>Assign Student to Course</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number"
                    placeholder="Student ID"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                />
                <input 
                    type="number"
                    placeholder="Course ID"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                />
                <button type="submit">Assign</button>
            </form>
        </div>
    );
}

export default AssignStudent;
