package com.example.demo.db;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@Entity
@Data
@AllArgsConstructor
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

@OneToMany(mappedBy = "department")
private List<Course> courses;

    public Department() {


    }
}
