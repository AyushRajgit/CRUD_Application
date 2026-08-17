package com.cper.CRUD_Application.repository;

import com.cper.CRUD_Application.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student,Long> {

}
