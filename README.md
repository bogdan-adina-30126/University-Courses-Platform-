#  University Courses Platform

A full-stack application for managing university courses, students, and departments with AI predictions.

##  Architecture

- **Backend**: Spring Boot (Java) - REST API
- **Frontend**: React (JavaScript) - Web Interface  
- **Desktop Client**: C# WinForms - Desktop Interface
- **Database**: MySQL
- **AI**: Custom prediction algorithms

### Core Functionality
-  Department Management - Create, view, delete departments
-  Course Management - Add courses to departments
-  Student Management - Register students and assign to courses

### AI Predictions
-  **Future Course Predictions** - Identify courses that will have capacity issues
-  **Department Growth Trends** - Predict which departments need more resources
-  **Overload Risk Analysis** - Alert for courses approaching capacity limits

##  Technology Stack

### Backend (Spring Boot)
```
- Java 
- Spring Boot
- Spring Data JPA
- MySQL Database
- Maven
### Frontend (React)
```
- React 
- JavaScript 
- CSS3
- Fetch API
- React Hooks

### Desktop Client (C#)
```
- .NET 8
- WinForms
- System.Text.Json
- HttpClient
```


##  Database Schema

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



##  Contributing

This is an academic project.
