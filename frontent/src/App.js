import './App.css';
import { useState } from 'react';
import DepartmentList from './components/DepartmentList';
import AddCourse from './components/AddCourse';
import AddStudent from './components/AddStudent';
import AssignStudent from './components/AssignStudent';
import CourseList from './components/CourseList';
import StudentList from './components/StudentList';
import Predictions from './components/Predictions';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Funcție pentru a reîmprospăta datele fără să schimbe pagina
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (!selectedDepartment) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>📚 University Courses Platform</h1>
        </header>
        <DepartmentList onSelectDepartment={setSelectedDepartment} />
        <Predictions />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <h1>📚 {selectedDepartment.name}</h1>
          <button 
            onClick={() => setSelectedDepartment(null)}
            style={{ 
              background: "#dc3545",
              border: "none",
              color: "white",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600"
            }}
          >
            ← Back to Departments
          </button>
        </div>
      </header>
      
      <div className="container">
        {/* Lists Section - Top, Large */}
        <div className="lists-top">
          <div className="card card-large">
            <StudentList key={`students-${refreshKey}`} departmentId={selectedDepartment.id} />
          </div>
          
          <div className="card card-large">
            <CourseList key={`courses-${refreshKey}`} departmentId={selectedDepartment.id} />
          </div>
        </div>
        
        {/* Forms Section - Bottom, Small */}
        <div className="forms-bottom">
          <div className="card card-small">
            <AddCourse 
              departmentId={selectedDepartment.id} 
              onCourseAdded={handleRefresh}
            />
          </div>
          
          <div className="card card-small">
            <AddStudent 
              departmentId={selectedDepartment.id}
              onStudentAdded={handleRefresh}
            />
          </div>
          
          <div className="card card-small">
            <AssignStudent onStudentAssigned={handleRefresh} />
          </div>
        </div>
      </div>
      <Predictions />
    </div>
  );
}

export default App;
