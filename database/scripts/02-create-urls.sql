CREATE TABLE "urls" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    visits INTEGER NOT NULL DEFAULT 0,
    created_at DATE DEFAULT NOW()
);