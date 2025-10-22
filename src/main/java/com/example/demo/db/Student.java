package com.example.demo.db;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private Integer courseId;
    @ManyToOne
    @JoinColumn(name = "courseId", insertable = false, updatable = false)
    private Course course;

    public Student() {

    }
}
