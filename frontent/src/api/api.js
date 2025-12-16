const API_URL = "http://localhost:8083";

export async function getCourses() {
    return fetch(`${API_URL}/courses/all`).then(res => res.json());
}

export async function getAllStudents() {
    return fetch(`${API_URL}/students/all`).then(res => res.json());
}

export async function getDepartments() {
    return fetch(`${API_URL}/departments/all`).then(res => res.json());
}

export async function addDepartment(department) {
    return fetch(`${API_URL}/departments/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(department)
    });
}

export async function deleteDepartment(id) {
    return fetch(`${API_URL}/departments/delete/${id}`, {
        method: "DELETE"
    });
}

export async function getCoursesByDepartment(departmentId) {
    return fetch(`${API_URL}/departments/${departmentId}/courses`).then(res => res.json());
}

export async function getStudentsByDepartment(departmentId) {
    return fetch(`${API_URL}/students/department/${departmentId}`).then(res => res.json());
}

export async function getStudentsByCourse(courseId) {
    return fetch(`${API_URL}/students/course/${courseId}`).then(res => res.json());
}

export async function addCourse(course) {
    return fetch(`${API_URL}/courses/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(course)
    });
}

export async function addStudent(student) {
    return fetch(`${API_URL}/students/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(student)
    });
}

export async function assignStudent(studentId, courseId) {
    return fetch(`${API_URL}/students/${studentId}/assign-course/${courseId}`, {
        method: "PUT"
    }).catch(error => {
        throw new Error("Failed to assign student");
    });
}

export async function deleteStudent(id) {
    return fetch(`${API_URL}/students/delete/${id}`, {
        method: "DELETE"
    });
}

export async function dropStudentFromCourse(studentId, courseId) {
    return fetch(`${API_URL}/students/${studentId}/drop-course/${courseId}`, {
        method: "DELETE"
    });
}
