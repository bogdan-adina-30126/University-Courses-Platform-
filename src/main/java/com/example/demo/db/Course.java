package com.example.demo.db;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JoinColumn(name = "departmentId", insertable = false, updatable = false)
    private Department department;

    @OneToMany(mappedBy = "course")
    @JsonManagedReference  // ✅ legătură cu Student
    private List<Student> students;

    public Course() { }
}
