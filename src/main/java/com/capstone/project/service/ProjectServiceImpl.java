package com.capstone.project.service;

import com.capstone.project.entity.Project;
import com.capstone.project.entity.User;
import com.capstone.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project createProject(Project project){
       return projectRepository.save(project);
    }

    public Project updateProject(Long projectId, Project project) {
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project with ID " + projectId + " not found"));

        // Update user properties
        existingProject.setProjectId(project.getProjectId());
        existingProject.setProjectName(project.getProjectName());

        return projectRepository.save(existingProject);
    }

    public void deleteProject(Long projectId) {
        projectRepository.deleteById(projectId);
    }

    public List<Project> getAllProject() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project with ID " + projectId + " not found"));
    }

}
