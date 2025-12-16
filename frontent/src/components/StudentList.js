import { useEffect, useState } from "react";
import { getAllStudents, getDepartments, deleteStudent } from "../api/api";

function StudentList({ departmentId }) {
    const [students, setStudents] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        if (departmentId) {
            loadData();
        }
    }, [departmentId]);

    async function loadData() {
        const allStudents = await getAllStudents();
        const allDepartments = await getDepartments();
        setStudents(allStudents);
        setDepartments(allDepartments);
    }

    async function loadStudents() {
        await loadData();
    }

    function getDepartmentName(deptId) {
        const dept = departments.find(d => d.id === deptId);
        return dept ? dept.name : null;
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this student?")) {
            await deleteStudent(id);
            alert("Student deleted!");
            loadStudents();
        }
    }

    async function handleRefresh() {
        loadStudents();
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2>All Students</h2>
                <button onClick={handleRefresh} style={{ padding: "0.5rem 1rem" }}>
                    🔄 Refresh
                </button>
            </div>

            {students.length === 0 ? (
                <p style={{color: "#999", fontStyle: "italic"}}>No students yet. Add one above!</p>
            ) : (
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                        <tr style={{backgroundColor: "#dc3545", color: "white"}}>
                            <th style={{padding: "0.75rem", textAlign: "left"}}>ID</th>
                            <th style={{padding: "0.75rem", textAlign: "left"}}>Name</th>
                            <th style={{padding: "0.75rem", textAlign: "left"}}>Email</th>
                            <th style={{padding: "0.75rem", textAlign: "left"}}>Department</th>
                            <th style={{padding: "0.75rem", textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} style={{
                                backgroundColor: index % 2 === 0 ? "#fff5f5" : "white",
                                borderBottom: "1px solid #e0e0e0"
                            }}>
                                <td style={{padding: "0.75rem", fontWeight: "bold", color: "#dc3545"}}>
                                    {student.id}
                                </td>
                                <td style={{padding: "0.75rem"}}>{student.name}</td>
                                <td style={{padding: "0.75rem", color: "#666"}}>{student.email}</td>
                                <td style={{padding: "0.75rem"}}>
                                    {student.departmentId ? (
                                        <span style={{
                                            padding: "0.25rem 0.5rem",
                                            background: "#dc3545",
                                            color: "white",
                                            borderRadius: "4px",
                                            fontSize: "0.85rem"
                                        }}>
                                            {getDepartmentName(student.departmentId) || `ID: ${student.departmentId}`}
                                        </span>
                                    ) : (
                                        <span style={{color: "#999", fontStyle: "italic"}}>Not assigned</span>
                                    )}
                                </td>
                                <td style={{padding: "0.75rem", textAlign: "center"}}>
                                    <button 
                                        onClick={() => handleDelete(student.id)}
                                        style={{
                                            padding: "0.4rem 0.8rem",
                                            fontSize: "0.85rem",
                                            background: "#ff6b6b"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default StudentList;
