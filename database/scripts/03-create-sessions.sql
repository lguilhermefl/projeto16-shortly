CREATE TABLE "sessions" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR NOT NULL,
    created_at DATE DEFAULT NOW()
);