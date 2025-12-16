package com.example.demo.service;

import com.example.demo.db.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService
{
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;
    @Transactional
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public Student getStudentById(Integer id) {
        return studentRepository.findById(id).orElse(null);
    }
    @Transactional
    public Student updateStudent(Integer id, Student updatedStudent) {
        Student existing = studentRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());

        return studentRepository.save(existing);
    }

    //  Șterge un student după ID
    @Transactional
    public void deleteStudent(Integer id) {
        Student student = studentRepository.findById(id).orElse(null);
        if (student == null) return;
        
        // Șterge studentul din toate cursurile (Many-to-Many)
        List<Course> allCourses = courseRepository.findAll();
        for (Course course : allCourses) {
            if (course.getStudents().contains(student)) {
                course.getStudents().remove(student);
                courseRepository.save(course);
            }
        }

        studentRepository.deleteById(id);
    }

    //  Asignează un student la un curs (Many-to-Many)
    @Transactional
    public Student assignStudentToCourse(Integer studentId, Integer courseId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || course == null) return null;

        // Verifică dacă studentul e deja într-un alt departament
        if (student.getDepartmentId() != null && !student.getDepartmentId().equals(course.getDepartmentId())) {
            throw new IllegalStateException("Student is already assigned to a different department (Department ID: " + student.getDepartmentId() + ")");
        }

        // Setează departmentId la student când e asignat la primul curs
        if (student.getDepartmentId() == null && course.getDepartmentId() != null) {
            student.setDepartmentId(course.getDepartmentId());
            studentRepository.save(student);
        }

        // Adaugă cursul la lista de cursuri a studentului (dacă nu e deja acolo)
        if (!course.getStudents().contains(student)) {
            course.getStudents().add(student);
            courseRepository.save(course);
        }

        return student;
    }

    //  Returnează toți studenții înscriși la un anumit curs
    public List<Student> getStudentsByCourse(Integer courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return List.of();
        return course.getStudents();
    }


    //  Returnează toți studenții dintr-un departament
    public List<Student> getStudentsByDepartment(Integer departmentId) {
        return studentRepository.findByDepartmentId(departmentId);
    }

    //  Scoate un student dintr-un curs (fără să-l șteargă)
    @Transactional
    public void removeStudentFromCourse(Integer studentId, Integer courseId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || course == null) return;

        // Scoate studentul din curs
        course.getStudents().remove(student);
        courseRepository.save(course);

        // Verifică dacă studentul mai e în alte cursuri din departament
        List<Course> allCourses = courseRepository.findAll();
        boolean stillInDepartment = false;
        for (Course c : allCourses) {
            if (c.getDepartmentId() != null && c.getDepartmentId().equals(course.getDepartmentId()) 
                && c.getStudents().contains(student)) {
                stillInDepartment = true;
                break;
            }
        }

        // Dacă nu mai e în niciun curs din departament șterge departmentId
        if (!stillInDepartment) {
            student.setDepartmentId(null);
            studentRepository.save(student);
        }
    }

}
