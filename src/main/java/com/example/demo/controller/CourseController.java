package com.example.demo.controller;

import com.example.demo.service.CourseService;
import com.example.demo.db.Course;
import com.example.demo.db.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    public Course crateCourse(@RequestBody Course course){
        //validare
        return courseService.crateCourse(course);
//service mereu
    }
   // @GetMapping
    //public List<Course> findAllCourse(){
        //return courseService.findAllCourse();

    //}
}
