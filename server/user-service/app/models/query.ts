`CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('BUYER', 'SELLER')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_pic TEXT,
    verification VARCHAR(255),
    expiry BOOLEAN,
    name VARCHAR(200)
);
`