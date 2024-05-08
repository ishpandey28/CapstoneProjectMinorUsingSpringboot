package com.capstone.project.controller;

import com.capstone.project.entity.Project;
import com.capstone.project.entity.User;
import com.capstone.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @PostMapping()
    ResponseEntity<Project> createProject(@RequestBody Project project){
        Project createdProject = projectService.createProject(project);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateUser(@PathVariable Long projectId, @RequestBody Project project) {
        Project updatedProject = projectService.updateProject(projectId, project);
        return ResponseEntity.ok(updatedProject);
    }


    @GetMapping
    public ResponseEntity<List<Project>> getAllUsers() {
        List<Project> project = projectService.getAllProject();
        return ResponseEntity.ok(project);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(project);
    }
}
