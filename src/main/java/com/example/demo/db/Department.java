package com.example.demo.db;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

@OneToMany(mappedBy = "department", cascade = CascadeType.ALL,  orphanRemoval = true)
@JsonManagedReference   // 👉 gestionează partea "părinte" a relației

private List<Course> courses;

    public Department() {


    }
}
