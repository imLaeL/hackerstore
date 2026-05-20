package hacker.store.hackerstore.controller;


import hacker.store.hackerstore.dto.AuthenticationDto;
import hacker.store.hackerstore.dto.LoginResponseDto;
import hacker.store.hackerstore.dto.RegisterDto;
import hacker.store.hackerstore.dto.UserDto;
import hacker.store.hackerstore.entity.Users;
import hacker.store.hackerstore.infra.security.TokenService;
import hacker.store.hackerstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AutheticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthenticationDto data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var user = (Users) auth.getPrincipal();
        var token = tokenService.generateToken(user);
        
        var userDto = new UserDto(user.getLogin(), user.getRole().toString());
        var response = new LoginResponseDto(token, userDto);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDto data){
        if(userRepository.findByLogin(data.login()) != null){
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        var user = new Users(data.login(), encryptedPassword, data.role());
        this.userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
