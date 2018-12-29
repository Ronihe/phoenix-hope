DROP DATABASE IF EXISTS "goals";
CREATE DATABASE "goals";
\c "goals";

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
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    photo_url TEXT
);

INSERT INTO users
    (username, password, first_name, last_name, email, phone)
VALUES
    ('roni', '123456', 'roni', 'h', 'rh@abc.com', '+12675373543'),
    ('jason', '123456', 'jason', 'h', 'gh@abc.com', '+5342683984');


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

INSERT INTO goals
    (username, title, description, category, due_date)
VALUES
    ('roni', 'deploy this app', 'you can make it', 'coding', '2018-12-22');

CREATE TABLE steps
(
    id SERIAL PRIMARY KEY,
    goal_id INTEGER NOT NULL REFERENCES goals ON DELETE CASCADE,
    step_content TEXT,
    date_posted date DEFAULT CURRENT_DATE NOT NULL
);
INSERT INTO steps
    (goal_id, step_content)
VALUES
    (1, 'deploy this app, day1');

CREATE TABLE supports
(
    id SERIAL PRIMARY KEY,
    goal_id INTEGER NOT NULL REFERENCES goals ON DELETE CASCADE,
    supporter_username TEXT NOT NULL REFERENCES users ON DELETE CASCADE
);
INSERT INTO supports
    (goal_id, supporter_username)
VALUES
    (1, 'roni');

