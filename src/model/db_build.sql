BEGIN;

DROP TABLE IF EXISTS users, attendance, flags, feedbacks, weeks, week_mentors, days, workshops, suggestions_complaints, cohort CASCADE;

CREATE TABLE cohort(
  id SERIAL PRIMARY KEY,
  name VARCHAR(6)
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  role VARCHAR DEFAULT 'student' CHECK(role IN ('admin', 'cf', 'mentor', 'student')),
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  email VARCHAR(40) NOT NULL UNIQUE,
  bio TEXT,
  phone VARCHAR(20) UNIQUE,
  password VARCHAR(80),
  cohort_id INT REFERENCES cohort(id) ON DELETE CASCADE ON UPDATE CASCADE,
  github_username VARCHAR(30) UNIQUE
);

CREATE TABLE weeks(
  id SERIAL PRIMARY KEY,
  week_no INT,
  name VARCHAR(20),
  cohort_id INT REFERENCES cohort(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE days(
  id SERIAL PRIMARY KEY,
  week_id INT NOT NULL REFERENCES weeks(id) ON DELETE CASCADE ON UPDATE CASCADE,
  day_no INT NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE attendance(
  -- id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  clock_in TIME,
  clock_out TIME,
  day_id INT REFERENCES days(id) NOT NULL,
  PRIMARY key (user_id, day_id)
);

CREATE TABLE flags(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  type VARCHAR(30) CHECK(type IN ('attendance', 'being on time', 'attitude towards teemwork', 'attitude towards learning', 'emotional maturity'))
);

CREATE TABLE feedbacks(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  content TEXT NOT NULL
);

CREATE TABLE week_mentors(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  week_id INT NOT NULL REFERENCES weeks(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE workshops(
  id SERIAL PRIMARY KEY,
  day_id INT NOT NULL REFERENCES days(id) ON DELETE CASCADE ON UPDATE CASCADE,
  title VARCHAR(50),
  link VARCHAR,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);

CREATE TABLE suggestions_complaints(
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  content TEXT NOT NULL,
  type VARCHAR(10) CHECK(type IN ('suggestion', 'complaint'))
);

INSERT INTO cohort (name) VALUES ('FACG4'), ('FACG5');

INSERT INTO users (first_name, last_name, email, bio, phone, password, role, github_username, cohort_id) VALUES
  ('Ahmed', 'A. Shatat', 'a.shatat@hotmail.com', 'Programming is a dream i hope to achieve', '0599946544', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'student', 'ashatat', 1),
  ('Mohammad', 'Heila', 'a.heila@hotmail.com', 'Programming is a dream i live with it everyday', '0599944654', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'student', 'mheila', 1),
  ('Ahmed', 'Ajour', 'a.ajour@gmail.com', 'great CF', '0599123456', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'cf', 'ahmedaj', NULL),
  ('Sultan', 'Asi', 'a.sultan@gmail.com', 'great mentor', '0599223456', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'mentor', 'sultanasi', NULL),
  ('Ghada', 'Ibrahim', 'a.ghada@gmail.com', 'great admin', '0599123556', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'admin', 'ghadaibrahim', NULL),
  (NULL, NULL, 'abdalsamad.y.m@gamil.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  (NULL, NULL, 'anoos.hanii@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  (NULL, NULL, 'blsam.2332016@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1);

INSERT INTO weeks(week_no, name, cohort_id) VALUES
  (1, 'welcome week', 1),
  (2, 'Api week', 1),
  (1, 'welcome week', 2),
  (2, 'Api week', 2);

INSERT INTO days (week_id, day_no, date) VALUES
  (1, 1, '2018-05-20'),
  (1, 2, '2018-05-20'),
  (1, 3, '2018-05-20'),
  (1, 4, '2018-05-20'),
  (1, 5, '2018-05-20'),
  (2, 1, '2018-05-20'),
  (2, 2, '2018-05-20'),
  (2, 3, '2018-05-20');

INSERT INTO attendance(user_id, clock_in, clock_out, day_id) VALUES
  (1, '09:00', '17:00', 1),
  (2, '09:00', '14:00', 1),
  (1, '012:00', '17:00', 2),
  (2, '11:00', '12:00', 2);

COMMIT;