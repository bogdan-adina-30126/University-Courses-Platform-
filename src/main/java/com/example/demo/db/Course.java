package com.example.demo.db;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Entity
@Data
@AllArgsConstructor

public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer departmentId;
    @ManyToOne
    @JoinColumn(name="course id",  insertable = false, updatable = false)
    Department department;
    @OneToMany(mappedBy = "course")
    private List<Student> students;

    public Course() {

    }
}
