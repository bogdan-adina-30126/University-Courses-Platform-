import React from "react";
import AddCourse from "./components/AddCourse";
import AddStudent from "./components/AddStudent";
import AssignStudent from "./components/AssignStudent";
import CourseList from "./components/CourseList";

function App() {
    return (
        <div style={{ padding: 20 }}>
            <h1>University App</h1>

            <AddCourse />
            <AddStudent />
            <AssignStudent />
            <CourseList />
        </div>
    );
}

export default App;
