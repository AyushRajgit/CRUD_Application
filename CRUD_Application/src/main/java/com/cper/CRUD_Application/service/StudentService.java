package com.cper.CRUD_Application.service;

import com.cper.CRUD_Application.entity.Student;
import com.cper.CRUD_Application.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private StudentRepository studentRepository;

    @Autowired
    public void setStudentRepository(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Optional<Student> createStudent(Student student) {
        Student newStudent = studentRepository.save(student);
        if (newStudent == null) return Optional.empty();
        return Optional.of(newStudent);
    }

    public Optional<Student> getStudent(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isEmpty()) return Optional.empty();
        return student;
    }

    public Optional<List<Student>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        if (students.isEmpty()) return Optional.empty();
        return Optional.of(students);
    }

    public Optional<Student> updateStudent(Long id, Student student) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isEmpty()) return Optional.empty();

        Student updatedStudent = existingStudent.get();
        updatedStudent.setFirstName(student.getFirstName());
        updatedStudent.setLastName(student.getLastName());
        updatedStudent.setEmail(student.getEmail());
        updatedStudent.setAge(student.getAge());
        updatedStudent.setMobileNumber(student.getMobileNumber());

        studentRepository.save(updatedStudent);
        return Optional.of(updatedStudent);
    }

    public Optional<Student> patchStudent(Long id, Student student) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isEmpty()) return Optional.empty();

        Student updatedStudent = existingStudent.get();
        if (student.getFirstName() != null) updatedStudent.setFirstName(student.getFirstName());
        if (student.getLastName() != null) updatedStudent.setLastName(student.getLastName());
        if (student.getEmail() != null) updatedStudent.setEmail(student.getEmail());
        if (student.getAge() > 0) updatedStudent.setAge(student.getAge());
        if (student.getMobileNumber() > 0) updatedStudent.setMobileNumber(student.getMobileNumber());

        studentRepository.save(updatedStudent);
        return Optional.of(updatedStudent);
    }

    public Optional<Student> deleteStudent(Long id) {
        Optional<Student> existingStudent = studentRepository.findById(id);
        if (existingStudent.isEmpty()) return Optional.empty();
        studentRepository.deleteById(id);
        return Optional.of(existingStudent.get());
    }

    public Optional<List<Student>> deleteAllStudents() {
        List<Student> students = studentRepository.findAll();
        if (students.isEmpty()) return Optional.empty();
        studentRepository.deleteAll(students);
        return Optional.of(students);
    }
}
