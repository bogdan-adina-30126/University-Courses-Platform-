import { useEffect, useState } from "react";
import { getCoursesByDepartment, getStudentsByCourse, dropStudentFromCourse } from "../api/api";

function CourseList({ departmentId }) {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(() => {
        if (departmentId) {
            loadCourses();
        }
    }, [departmentId]);

    async function loadCourses() {
        const data = await getCoursesByDepartment(departmentId);
        setCourses(data);
    }

    async function viewStudents(courseId) {
        const data = await getStudentsByCourse(courseId);
        setStudents(data);
        setSelectedCourseId(courseId);
    }

    async function drop(studentId) {
        if (window.confirm("Are you sure you want to drop this student from the course?")) {
            await dropStudentFromCourse(studentId, selectedCourseId);
            alert("Student dropped from course!");
            // Reîncarcă lista de studenți pentru cursul curent
            viewStudents(selectedCourseId);
        }
    }

    return (
        <div>
            <h2>Courses</h2>
            {courses.length === 0 ? (
                <p style={{color: "#999", fontStyle: "italic"}}>No courses yet.</p>
            ) : (
                courses.map(c => (
                    <div key={c.id}>
                        <p>
                            <span style={{fontWeight: "bold", color: "#dc3545"}}>ID: {c.id}</span> - {c.name} 
                            <button onClick={() => viewStudents(c.id)}>
                                View Students
                            </button>
                        </p>
                    </div>
                ))
            )}

            <h3 style={{color: "#dc3545"}}>Students in Selected Course:</h3>
            {students.length === 0 ? (
                <p style={{color: "#999", fontStyle: "italic"}}>Select a course to view students.</p>
            ) : (
                <ul>
                    {students.map(s => (
                        <li key={s.id}>
                            {s.name} ({s.email})
                            <button onClick={() => drop(s.id)}>Drop</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CourseList;
