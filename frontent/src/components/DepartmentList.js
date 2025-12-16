import React, { useEffect, useState } from "react";
import { getDepartments, addDepartment, deleteDepartment } from "../api/api";

function DepartmentList({ onSelectDepartment }) {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

    async function loadDepartments() {
        const data = await getDepartments();
        setDepartments(data);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await addDepartment({ name });
        alert("Department added!");
        setName("");
        loadDepartments();
    }

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this department?")) {
            await deleteDepartment(id);
            alert("Department deleted!");
            loadDepartments();
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <div style={{ 
                maxWidth: "800px", 
                margin: "0 auto",
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <h1 style={{ color: "#dc3545", marginBottom: "2rem" }}>
                    📚 Select Department
                </h1>

                <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                    <h3 style={{ marginBottom: "1rem" }}>Add New Department</h3>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <input 
                            type="text"
                            placeholder="Department name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ flex: 1 }}
                        />
                        <button type="submit">Add</button>
                    </div>
                </form>

                <h3 style={{ marginBottom: "1rem" }}>Available Departments</h3>
                {departments.length === 0 ? (
                    <p style={{color: "#999", fontStyle: "italic"}}>
                        No departments yet. Add one above!
                    </p>
                ) : (
                    <div style={{ display: "grid", gap: "1rem" }}>
                        {departments.map((dept) => (
                            <div 
                                key={dept.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "1.5rem",
                                    background: "#dc3545",
                                    borderRadius: "8px",
                                    color: "white",
                                    cursor: "pointer",
                                }}
                            >
                                <div 
                                    onClick={() => onSelectDepartment(dept)}
                                    style={{ flex: 1 }}
                                >
                                    <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                                        ID: {dept.id}
                                    </div>
                                    <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                                        {dept.name}
                                    </div>
                                </div>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(dept.id);
                                    }}
                                    style={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        border: "2px solid white",
                                        color: "white"
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DepartmentList;
