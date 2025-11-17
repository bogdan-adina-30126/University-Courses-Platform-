package com.example.demo.controller;

import com.example.demo.db.Course;
import com.example.demo.db.Department;
import com.example.demo.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    // Creează un departament nou
    @PostMapping("/add")
    public Department addDepartment(@RequestBody Department department) {
        return departmentService.createDepartment(department);
    }

    //  Returnează toate departamentele
    @GetMapping("/all")
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    //  Returnează un departament după ID
    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable Integer id) {
        return departmentService.getAllDepartmentsById(id).orElse(null);
    }

    //  Returnează toate cursurile unui departament
    @GetMapping("/{id}/courses")
    public List<Course> getCoursesByDepartment(@PathVariable Integer id) {
        Department department = departmentService.getAllDepartmentsById(id).orElse(null);
        if (department == null) {
            return List.of(); // dacă nu există departamentul
        }
        return department.getCourses();
    }

    //  Update la departament
    @PutMapping("/update/{id}")
    public Department updateDepartment(@PathVariable Integer id, @RequestBody Department updated) {
        return departmentService.updateDepartment(id, updated);
    }

    //  Șterge un departament
    @DeleteMapping("/delete/{id}")
    public void deleteDepartment(@PathVariable Integer id) {
        departmentService.deleteDepartment(id);
    }
}
