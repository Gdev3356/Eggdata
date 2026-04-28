package com.eggman.empire.eggdata.services;

import com.eggman.empire.eggdata.exceptions.DuplicateUserNameException;
import com.eggman.empire.eggdata.exceptions.ResourceNotFoundException;
import com.eggman.empire.eggdata.models.User;
import com.eggman.empire.eggdata.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        if (userRepository.existsByUserName(user.getUserName())) {
            throw new DuplicateUserNameException(user.getUserName());
        }
        return userRepository.save(user);
    }

    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(Long id) {
        return findUserById(id);
    }

    public User updateUser(Long id, User newUser) {
        findUserById(id);
        newUser.setId(id);
        return userRepository.save(newUser);
    }

    public void deleteUser(Long id) {
        findUserById(id);
        userRepository.deleteById(id);
    }


    private User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Usuário com id " + id + " não foi encontrado na base de dados do Império.")
        );
    }

    public User authenticate(String userName, String password) {
        return userRepository.findByUserName(userName)
                .filter(user -> user.getPassword().equals(password)) // In production, use BCrypt!
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}