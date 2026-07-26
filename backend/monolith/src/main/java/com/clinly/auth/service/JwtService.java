package com.clinly.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    private final UserDetailsService userDetailsService;

    public JwtService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public String generateToken(String username) {
        UserDetails user = userDetailsService.loadUserByUsername(username);
        return Jwts.builder()
                .subject(user.getUsername())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .claims(Map.of("ROLES", user.getAuthorities()))
                .signWith(signInToken())
                .compact();
    }

    public String extractUsername(String token) {
        return parseToken(token).getSubject();
    }

    private SecretKey signInToken() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    private Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(signInToken())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            Claims claims = parseToken(token);
            String username = claims.getSubject();
            return username.equals(userDetails.getUsername()) && claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
