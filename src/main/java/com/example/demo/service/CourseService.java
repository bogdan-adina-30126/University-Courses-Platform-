package com.example.demo.service;

import com.example.demo.db.Course;
import com.example.demo.db.CourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Transactional
    public Course createCourse(Course course) { //creez un curs nou
        return courseRepository.save(course);
    }
    public List<Course> getAllCourses() {   // afisez toate cursurile
        return courseRepository.findAll();
    }
    //public Optional<Course> getCourseById(Long id) {
     //   return courseRepository.findById(id);
    //}
    public Course getCourseById(Integer id){
        return courseRepository.findById(id).orElse(null);
    }
    @Transactional
    public Course updateCourse(Integer id, Course course){
        Course existing = courseRepository.findById(id).orElse(null);
        if(existing == null){
            return null;
        }
        existing.setName(course.getName());
        existing.setDepartmentId(course.getDepartmentId());
        return courseRepository.save(existing);
    }
    public void deleteCourse(Integer id){
        Course course = courseRepository.findById(id).orElse(null);
        if(course == null){
            return;
        }
        courseRepository.delete(course);
    }
}
