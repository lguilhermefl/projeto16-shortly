CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(140) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR NOT NULL,
    created_at DATE DEFAULT NOW()
);