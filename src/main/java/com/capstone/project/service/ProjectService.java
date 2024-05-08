package com.capstone.project.service;

import com.capstone.project.entity.Project;


import java.util.List;


public interface ProjectService {
    public Project createProject(Project project);
    public Project updateProject(Long projectId, Project project);
    public void deleteProject(Long projectId);
    public List<Project> getAllProject();
    public Project getProjectById(Long projectId);
}
