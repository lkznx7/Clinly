# Clinly Auth Service

Authentication microservice for the Clinly platform. Handles user registration and login.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register a new user account |
| POST | `/auth/login` | Authenticate and receive a JWT token |

Both endpoints are public (no authentication required).

## JWT Authentication

After successful login or registration, the API returns a JWT access token.

### Token structure (decoded)

```json
{
  "sub": "user@email.com",
  "role": "USER",
  "iat": 1700000000,
  "exp": 1700086400
}
```

### Claims

| Claim | Description |
|-------|-------------|
| `sub` | User's email |
| `role` | User's role (`USER` or `ADMIN`) |
| `iat` | Issued-at timestamp |
| `exp` | Expiration timestamp (24 hours from `iat`) |

### Usage

The frontend stores the token in `localStorage` and sends it in the `Authorization` header as `Bearer <token>`. There is **no refresh token** — the access token alone is used for the full 24-hour window.

## Security

- CSRF protection is disabled (stateless API).
- Session management is stateless.
- `/auth/**` paths are publicly accessible; all other requests require authentication.
- A JWT authentication filter runs before `UsernamePasswordAuthenticationFilter`.
