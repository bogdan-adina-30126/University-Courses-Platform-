package com.example.demo.controller;

import com.example.demo.db.Student;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students") // toate rutele încep cu /students
public class StudentController {

    @Autowired
    private StudentService studentService;

    // 🔹 1. Adaugă un student nou (CREATE)
    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    // 🔹 2. Returnează toți studenții (READ ALL)
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    //  Returnează un student după ID (READ ONE)
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Integer id) {
        return studentService.getStudentById(id);
    }

    // Actualizează un student (UPDATE)
    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // Șterge un student (DELETE)
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudent(id);
    }

    //  Asignează un student la un curs (CUSTOM)
    @PutMapping("/{studentId}/assign-course/{courseId}")
    public Student assignStudentToCourse(@PathVariable Integer studentId, @PathVariable Integer courseId) {
        return studentService.assignStudentToCourse(studentId, courseId);
    }

    //  Returnează toți studenții înscriși la un anumit curs (CUSTOM) - REPARAT
    @GetMapping("/course/{courseId}")
    public List<Student> getStudentsByCourse(@PathVariable Integer courseId) {
        return studentService.getStudentsByCourse(courseId);
    }

    //  Returnează toți studenții dintr-un departament
    @GetMapping("/department/{departmentId}")
    public List<Student> getStudentsByDepartment(@PathVariable Integer departmentId) {
        return studentService.getStudentsByDepartment(departmentId);
    }

    //  Scoate un student dintr-un curs (drop)
    @DeleteMapping("/{studentId}/drop-course/{courseId}")
    public void dropStudentFromCourse(@PathVariable Integer studentId, @PathVariable Integer courseId) {
        studentService.removeStudentFromCourse(studentId, courseId);
    }

}
