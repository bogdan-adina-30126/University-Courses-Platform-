package com.example.demo.controller;

import com.example.demo.db.Course;
import com.example.demo.db.Student;
import com.example.demo.db.StudentRepository;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class StudentControlller {

    @RestController
    @RequestMapping("/students") // plural e mai recomandat
    public class StudentController {

        @Autowired
        private StudentService studentService; // ⚡ corect, folosim Service, nu Repository

        // Creează student
        @PostMapping("/add")
        public Student addStudent(@RequestBody Student student) {
            return studentService.createStudent(student);
        }

        // Listează toți studenții
        @GetMapping("/all")
        public List<Student> getAllStudents() {
            return studentService.getAllStudents();
        }

        // Găsește student după ID
        @GetMapping("/{id}")
        public Student getStudentById(@PathVariable Integer id) {
            return studentService.getAllStudents(id);
        }

        // Actualizează student
        @PutMapping("/update/{id}")
        public Student updateStudent(@PathVariable Integer id, @RequestBody Student student) {
            return studentService.updateStudent(id, student);
        }
    }
}
