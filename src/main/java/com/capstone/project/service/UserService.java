package com.capstone.project.service;

import com.capstone.project.entity.User;

import java.util.List;

public interface UserService {
    public User createUser(User user);
    public User updateUser(Long userId, User user);
    public void deleteUser(Long userId);
    public List<User> getAllUsers();
    public User getUserById(Long userId);
}
