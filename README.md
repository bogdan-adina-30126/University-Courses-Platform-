# 📚 University Courses Platform

A full-stack application for managing university courses, students, and departments with AI predictions.

## 🏗️ Architecture

- **Backend**: Spring Boot (Java) - REST API
- **Frontend**: React (JavaScript) - Web Interface  
- **Desktop Client**: C# WinForms - Desktop Interface
- **Database**: MySQL
- **AI**: Custom prediction algorithms

## 🚀 Features

### Core Functionality
- ✅ **Department Management** - Create, view, delete departments
- ✅ **Course Management** - Add courses to departments
- ✅ **Student Management** - Register students and assign to courses
- ✅ **Many-to-Many Relationships** - Students can be in multiple courses
- ✅ **Smart Department Assignment** - Auto-assign students to departments
- ✅ **Drop vs Delete** - Remove from course vs complete deletion

### AI Predictions
- 🔮 **Future Course Predictions** - Identify courses that will have capacity issues
- 📈 **Department Growth Trends** - Predict which departments need more resources
- ⚠️ **Overload Risk Analysis** - Alert for courses approaching capacity limits

## 🛠️ Technology Stack

### Backend (Spring Boot)
```
- Java 21
- Spring Boot 3.x
- Spring Data JPA
- MySQL Database
- Maven
- Lombok
```

### Frontend (React)
```
- React 18
- JavaScript ES6+
- CSS3
- Fetch API
- React Hooks
```

### Desktop Client (C#)
```
- .NET 8
- WinForms
- System.Text.Json
- HttpClient
```

## 📦 Installation & Setup

### Prerequisites
- Java 21+
- Node.js 18+
- MySQL 8.0+
- .NET 8 SDK (for desktop client)

### Backend Setup
```bash
# Clone repository
git clone <repository-url>
cd UniversityCoursesPlatform

# Configure database in application.properties
# Update MySQL connection details

# Run backend
./mvnw spring-boot:run
# Backend will start on http://localhost:8083
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontent

# Install dependencies
npm install

# Start development server
npm start
# Frontend will start on http://localhost:3000
```

### Desktop Client Setup
```bash
# Navigate to desktop client directory
cd desktop_client

# Build and run
dotnet build
dotnet run
```

## 🌐 API Endpoints

### Students
- `GET /students/all` - Get all students
- `POST /students/add` - Add new student
- `PUT /students/{id}/assign-course/{courseId}` - Assign student to course
- `DELETE /students/{id}/drop-course/{courseId}` - Drop student from course
- `DELETE /students/delete/{id}` - Delete student completely

### Courses
- `GET /courses/all` - Get all courses
- `POST /courses/add` - Add new course
- `GET /students/course/{courseId}` - Get students in course

### Departments
- `GET /departments/all` - Get all departments
- `POST /departments/add` - Add new department
- `GET /departments/{id}/courses` - Get courses in department

## 🤖 AI Predictions Explained

The AI system analyzes current enrollment data and applies predictive algorithms:

### Algorithm 1: Course Capacity Prediction
```javascript
if (courseStudents.length >= 4 && courseStudents.length <= 5) {
    // Predict: "Will likely be overcrowded next semester"
}
if (courseStudents.length > 6) {
    // Predict: "Will need additional resources"
}
```

### Algorithm 2: Department Growth Analysis
```javascript
if (deptStudents.length > avgStudentsPerDept * 1.3) {
    // Predict: "Department will likely need more courses next year"
}
if (deptStudents.length < avgStudentsPerDept * 0.7) {
    // Predict: "Department might merge with another"
}
```

## 🏛️ Database Schema

### Entities
- **Department** (id, name)
- **Course** (id, name, departmentId)
- **Student** (id, name, email, departmentId)
- **course_student** (junction table for Many-to-Many)

### Business Rules
1. Students start without departmentId (null)
2. First course assignment sets departmentId automatically
3. Students cannot be in courses from different departments
4. Dropping from all courses resets departmentId to null

## 🎯 Key Features Demonstrated

### Backend Architecture
- **MVC Pattern** - Controllers, Services, Repositories
- **JPA Relationships** - OneToMany, ManyToMany with proper annotations
- **Transaction Management** - @Transactional for data consistency
- **CORS Configuration** - Cross-origin resource sharing setup
- **Exception Handling** - Proper error responses

### Frontend Architecture  
- **Component-Based** - Reusable React components
- **State Management** - useState and useEffect hooks
- **API Integration** - RESTful service consumption
- **Responsive Design** - Clean, simple UI
- **Smart Refresh** - Updates without page reload

### Advanced Features
- **Cascade Operations** - Delete student removes from all courses
- **Data Validation** - Business rule enforcement
- **Real-time Updates** - Immediate UI refresh after operations
- **Multi-client Support** - Web and desktop interfaces

## 👨‍💻 Development Notes

This project demonstrates:
- Full-stack development skills
- Database design and relationships
- REST API development
- Modern frontend development
- Cross-platform desktop applications
- AI/ML algorithm implementation
- Git version control
- Professional code organization

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is an academic project. For questions or suggestions, please contact the author.