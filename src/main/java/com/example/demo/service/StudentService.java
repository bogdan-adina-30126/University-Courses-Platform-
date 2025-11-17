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
    public Student getAllStudentsByDepartment(Integer id) {
        return studentRepository.findById(id).get();
    }
    @Transactional
    public Student updateStudent(Integer id, Student updatedStudent) {
        Student existing = studentRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setCourseId(updatedStudent.getCourseId());

        return studentRepository.save(existing); // save face update
    }


    //  Șterge un student după ID
    @Transactional
    public void deleteStudent(Integer id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
        }
    }

    //  Asignează un student la un curs
    @Transactional
    public Student assignStudentToCourse(Integer studentId, Integer courseId) {
        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);

        if (student == null || course == null) return null;

        student.setCourseId(courseId);
        return studentRepository.save(student);
    }

    //  Returnează toți studenții înscriși la un anumit curs
    public List<Student> getStudentsByCourse(Integer courseId) {
        return studentRepository.findByCourseId(courseId);
    }
    public List<Student> getStudentsByCourseReindexed(Integer courseId) {
        List<Student> students = studentRepository.findByCourseId(courseId);

        // Reindexăm ID-urile pentru afișarea în frontend
        for (int i = 0; i < students.size(); i++) {
            students.get(i).setId(i + 1);
        }

        return students;
    }

}
