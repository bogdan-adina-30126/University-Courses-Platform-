package com.example.demo.service;

import com.example.demo.db.Course;
import com.example.demo.db.CourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//aici fac ce e in operatii din tabele addcourses
@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository; // am conectat leyerele
    @Transactional
    public Course crateCourse(Course course){
        return courseRepository.save(course);

    }
    public List<Course> crateCourseList(){
        return courseRepository.findAll();
    }
}
