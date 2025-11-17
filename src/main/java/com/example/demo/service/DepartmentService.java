package com.example.demo.service;

import com.example.demo.db.Department;
import com.example.demo.db.DepartmentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Provider;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService
{
    @Autowired
    private DepartmentRepository departmentRepository;
    public Department createDepartment(Department department)
    {
        return departmentRepository.save(department);
    }
    public List<Department> getAllDepartments()
    {
        return departmentRepository.findAll();
    }
    public Optional<Department> getAllDepartmentsById(Integer id)
    {
        return departmentRepository.findById(id);
    }
    @Transactional
    public Department updateDepartment(Integer id, Department updatedDepartment) {
        Department existing = departmentRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setName(updatedDepartment.getName());

        return departmentRepository.save(existing);
    }
    @Transactional
    public void deleteDepartment(Integer id)
    {
        Department existing = departmentRepository.findById(id).orElse(null);
        if (existing == null) {
            return;
        }
        departmentRepository.delete(existing);
    }

}
