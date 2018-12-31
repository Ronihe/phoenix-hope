-- DROP DATABASE IF EXISTS "goals";
-- CREATE DATABASE "goals";
-- \c "goals";

DROP TABLE IF EXISTS supports;
DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    photo_url TEXT
);

CREATE TABLE goals
(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    title TEXT,
    description TEXT,
    state TEXT DEFAULT 'start',
    date_posted date DEFAULT CURRENT_DATE NOT NULL,
    due_date date NOT NULL,
    category TEXT,
    claps INTEGER DEFAULT 0
);

CREATE TABLE steps
(
    id SERIAL PRIMARY KEY,
    goal_id INTEGER NOT NULL REFERENCES goals ON DELETE CASCADE,
    step_content TEXT,
    date_posted date DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE supports
(
    goal_id INTEGER NOT NULL REFERENCES goals ON DELETE CASCADE,
    supporter_username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY (goal_id, supporter_username)
);
