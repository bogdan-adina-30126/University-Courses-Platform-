import { useState, useEffect } from "react";
import { getAllStudents, getCourses, getDepartments, getStudentsByCourse } from "../api/api";

function Predictions() {
    const [isOpen, setIsOpen] = useState(false);
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);

    async function generatePredictions() {
        setLoading(true);
        try {
            // PASUL 1: Iau toate datele din baza de date
            const students = await getAllStudents();
            const courses = await getCourses();
            const departments = await getDepartments();

            // PREDICȚIA 1: Cursuri care vor avea probleme în viitor
            const futurePredictions = [];
            for (const course of courses) {
                const courseStudents = await getStudentsByCourse(course.id);
                
                // Predicție: dacă un curs are 4-5 studenți, va fi supraaglomerat curând
                if (courseStudents.length >= 4 && courseStudents.length <= 5) {
                    futurePredictions.push({
                        course: course.name,
                        count: courseStudents.length,
                        prediction: `${course.name} will likely be overcrowded next semester (currently ${courseStudents.length} students)`
                    });
                }
                // Predicție: cursuri cu 6+ studenți vor avea nevoie de mai multe resurse
                else if (courseStudents.length > 6) {
                    futurePredictions.push({
                        course: course.name,
                        count: courseStudents.length,
                        prediction: `${course.name} will need additional resources (${courseStudents.length} students is above capacity)`
                    });
                }
            }

            // PREDICȚIA 2: Tendința de creștere a departamentelor
            const departmentGrowth = [];
            for (const dept of departments) {
                const deptStudents = students.filter(s => s.departmentId === dept.id);
                const avgStudentsPerDept = students.length / departments.length;
                
                let growthPrediction = "";
                if (deptStudents.length > avgStudentsPerDept * 1.3) {
                    growthPrediction = `${dept.name} will likely need more courses next year (high enrollment: ${deptStudents.length} students)`;
                } else if (deptStudents.length < avgStudentsPerDept * 0.7) {
                    growthPrediction = `${dept.name} might merge with another department (low enrollment: ${deptStudents.length} students)`;
                } else {
                    growthPrediction = `${dept.name} will remain stable (${deptStudents.length} students)`;
                }
                
                departmentGrowth.push({
                    department: dept.name,
                    studentCount: deptStudents.length,
                    prediction: growthPrediction
                });
            }

            setPredictions({
                futurePredictions,
                departmentGrowth,
                totalStudents: students.length,
                totalCourses: courses.length,
                totalDepartments: departments.length
            });
        } catch (error) {
            console.error("Prediction error:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (isOpen && !predictions) {
            generatePredictions();
        }
    }, [isOpen]);

    return (
        <>
            {/* Predictions Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        padding: "12px 24px",
                        background: "#333",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <span style={{ fontSize: "18px" }}>📊</span>
                    AI Predictions
                </button>
            )}

            {/* Predictions Panel */}
            {isOpen && (
                <div style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "400px",
                    maxHeight: "600px",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    zIndex: 1000
                }}>
                    {/* Header */}
                    <div style={{
                        padding: "1rem",
                        background: "#333",
                        color: "white",
                        borderRadius: "8px 8px 0 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontWeight: "600" }}>📊 AI Predictions</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                onClick={generatePredictions}
                                style={{
                                    background: "transparent",
                                    border: "1px solid white",
                                    color: "white",
                                    padding: "4px 12px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                }}
                            >
                                🔄 Refresh
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "white",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                    padding: "0"
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "1rem"
                    }}>
                        {loading && (
                            <div style={{ textAlign: "center", color: "#999", padding: "2rem" }}>
                                Analyzing data...
                            </div>
                        )}

                        {!loading && predictions && (
                            <>
                                {/* Statistici generale */}
                                <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f0f8ff", borderRadius: "4px" }}>
                                    <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#333" }}>
                                        📊 University Statistics
                                    </h3>
                                    <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                                        <strong>Total Students:</strong> {predictions.totalStudents}
                                    </p>
                                    <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                                        <strong>Total Courses:</strong> {predictions.totalCourses}
                                    </p>
                                    <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                                        <strong>Total Departments:</strong> {predictions.totalDepartments}
                                    </p>
                                </div>

                                {/* Predicția 1: Probleme viitoare la cursuri */}
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#333" }}>
                                        🔮 Future Course Predictions
                                    </h3>
                                    {predictions.futurePredictions.length === 0 ? (
                                        <p style={{ color: "#00aa00", fontSize: "0.9rem" }}>
                                            ✅ No capacity issues predicted for next semester
                                        </p>
                                    ) : (
                                        predictions.futurePredictions.map((pred, idx) => (
                                            <div key={idx} style={{
                                                padding: "0.75rem",
                                                background: "#fff3cd",
                                                border: "1px solid #ffaa00",
                                                borderRadius: "4px",
                                                marginBottom: "0.5rem",
                                                fontSize: "0.9rem"
                                            }}>
                                                🔮 {pred.prediction}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Predicția 2: Viitorul departamentelor */}
                                <div>
                                    <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#333" }}>
                                        📈 Department Future Trends
                                    </h3>
                                    {predictions.departmentGrowth.map((growth, idx) => (
                                        <div key={idx} style={{
                                            padding: "0.75rem",
                                            background: "#f0f8ff",
                                            border: "1px solid #4da6ff",
                                            borderRadius: "4px",
                                            marginBottom: "0.5rem",
                                            fontSize: "0.9rem"
                                        }}>
                                            📊 {growth.prediction}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Predictions;
