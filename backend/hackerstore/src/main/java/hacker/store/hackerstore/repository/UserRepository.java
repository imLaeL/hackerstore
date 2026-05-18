package hacker.store.hackerstore.repository;

import hacker.store.hackerstore.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<Users, String> {
    UserDetails findByLogin(String login);
}
