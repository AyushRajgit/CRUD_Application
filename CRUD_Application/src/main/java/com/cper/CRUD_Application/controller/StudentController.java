package com.cper.CRUD_Application.controller;

import com.cper.CRUD_Application.entity.Student;
import com.cper.CRUD_Application.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/student")
@CrossOrigin(origins = "*")
public class StudentController {

    private StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/create")
    public ResponseEntity<Student> create(@RequestBody Student student){
        Optional<Student> studentRes = studentService.createStudent(student);

        if (studentRes.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(studentRes.get());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Student> update(@PathVariable long id, @RequestBody Student student){
        Optional<Student> studentRes = studentService.updateStudent(id, student);
        if (studentRes.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentRes.get());
    }

    @PatchMapping("/patch/{id}")
    public ResponseEntity<Student> patch(@PathVariable long id, @RequestBody Student student){
        Optional<Student> studentRes = studentService.patchStudent(id, student);
        if (studentRes.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentRes.get());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Student> get(@PathVariable long id){
        Optional<Student> studentRes = studentService.getStudent(id);
        if (studentRes.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentRes.get());
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Student>> getAll(){
        Optional<List<Student>> studentRes = studentService.getAllStudents();
        if (studentRes.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentRes.get());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Student> delete(@PathVariable long id){
        Optional<Student> studentRes = studentService.deleteStudent(id);
        if (studentRes.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(studentRes.get());
    }
}
