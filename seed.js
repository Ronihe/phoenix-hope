const bcrypt = require('bcrypt');
const db = require('./db');
const BCRYPT_WORK_FACTOR = 10;

// Database DDL (for tests)
const DDL = `
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
);`;

async function seedData() {
  try {
    await db.query(DDL);
    const hashedPassword = await bcrypt.hash('secret', BCRYPT_WORK_FACTOR);
    const user = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, phone)
                  VALUES ('test', $1, 'roni', 'h', 'rh@abc.com', '+12675373543')`,
      [hashedPassword]
    );
    const goals = await db.query(`
  INSERT INTO goals (username, title, description, category, due_date) VALUES
  ('test', 'deploy this app', 'you can make it', 'coding', '2018-12-22');

  INSERT INTO steps (goal_id, step_content) VALUES
  (1, 'deploy this app, day1');

<<<<<<< HEAD
  INSERT INTO  supports (goal_id, supporter_username) VALUES 
  (1, 'roni');
=======
  INSERT INTO supports (goal_id, supporter_username) VALUES 
  (1, 'test');
>>>>>>> master
  `);
  } catch (err) {
    console.log('Something went wrong!');
    console.log(err);
    process.exit(1);
  }
}

seedData().then(() => {
  console.log('Successful seed!');
  process.exit();
});
