package hacker.store.hackerstore.dto;

import hacker.store.hackerstore.entity.UserRole;

public record RegisterDto(String login, String password, UserRole role) {
}

