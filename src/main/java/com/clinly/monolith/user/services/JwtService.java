package com.clinly.monolith.user.services;

import com.clinly.monolith.user.entity.ROLES;
import com.clinly.monolith.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HexFormat;

public class JwtService implements UserDetailsService {

    @Value("${jwt.secret}")
    String secret;
    @Value("${jwt.expiration}")
    Long expiration;
    UserRepository userRepository;
    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public String generateToken(String email) {
       UserDetails user =  loadUserByUsername(email);
       return Jwts.builder().subject(user.getUsername())
               .issuedAt(new Date())
               .expiration(new Date(System.currentTimeMillis()+expiration))
               .claim("roles", user.getAuthorities())
               .signWith(getSigningKey()).compact();
    }
    public SecretKey getSigningKey() {
        byte[] keyBytes = HexFormat.of().parseHex(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }
    public Date getExpirationDateFromToken(String token) {
        return getClaimsFromToken(token).getExpiration();
    }
    public ROLES  getRoleFromToken(String token) {
        return getClaimsFromToken(token).get("roles", ROLES.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
