package com.example.demo.db;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
// am repository pentru a putea comunica cu baza de date fara a folosi sql
//jpa repository imi ofera CRUD dar daca am o interogare speciala atunci creez eu o metoda de tip findby
public interface CourseRepository extends JpaRepository<Course, Integer>
{
    List<Course> findByDepartmentId(Long departmentId);
}
