package com.example.demo.controller;

import com.example.demo.db.Student;
import com.example.demo.service.CourseService;
import com.example.demo.db.Course;
import com.example.demo.db.CourseRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/courses") // prefix pentru toate endpointurile
public class CourseController {
//endpointurile
    @Autowired
    private CourseService courseService;

    // Adaugă un curs
    @PostMapping("/add")
    public Course addCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    //  Listează toate cursurile
    @GetMapping("/all")
    public List<Course> listCourses() {
        return courseService.getAllCourses();
    }

    //  Găsește un curs după ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Integer id) {
        return courseService.getCourseById(id);
    }

    //  Actualizează un curs după ID
    @PutMapping("/update/{id}")
    public Course updateCourse(@PathVariable Integer id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    //  Șterge un curs după ID
    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
    }
    // 🔹 Adaugă un student la un curs


}
