package com.capstone.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.usertype.UserType;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Email(message = "Email should be valid")
    @Pattern(regexp=".+@nucleusteq\\.com$", message="Email must belong to nucleusteq.com domain")
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;


    @Column(nullable = false)
    private String role;
}
