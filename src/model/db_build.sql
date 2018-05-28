BEGIN;

DROP TABLE IF EXISTS cohort, users, weeks, days, attendance, flags, feedbacks, week_mentors, workshops, suggestions_complaints,  CASCADE;

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
  github_username VARCHAR(30) UNIQUE,
  avatar VARCHAR
);

CREATE TABLE weeks(
  id SERIAL PRIMARY KEY,
  week_no INT,
  name VARCHAR(50),
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
  ('Ahmed', 'M. Shatat', 'ahmed_m_sh@hotmail.com', 'SEO Master', '0599944633', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'student', 'shatat_m', 1),
  ('Farah', 'Zaqot', 'a.zaqot@hotmail.com', 'Great man', '0599944666', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'student', 'zfarah', 1),
  (NULL, NULL, 'abdalsamad.y.m@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  (NULL, NULL, 'anoos.haniioi@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  (NULL, NULL, 'blsam.2332016@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  ('Sultan', 'Asi', 'a.sultan@gmail.com', 'great mentor', '0599223456', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'mentor', 'sultanasi', NULL),
  ('Noureldean', 'Swearky', 'noureldean.saed@gmail.com', 'great mentor', '0599123416', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'mentor', 'NoureldeanSaed', NULL),
  ('Ahmed', 'Ajour', 'a.ajour@gmail.com', 'great CF', '0599123456', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'cf', 'ahmedaj', NULL),
  ('Ghada', 'Ibrahim', 'a.ghada@gmail.com', 'great admin', '0599123556', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'admin', 'ghadaibrahim', NULL);

INSERT INTO weeks(week_no, name, cohort_id) VALUES
  (1, 'Toolkit', 1),
  (2, 'Testing', 1),
  (3, 'APIs', 1),
  (4, 'Node.js 1/2', 1),
  (5, 'Node.js 2/2', 1),
  (6, 'PostgreSQL', 1),
  (7, 'Authentication', 1),
  (8, 'Express', 1),
  (9, 'Reading', 1),
  (10, 'Design Sprint project1', 1),
  (11, 'Build Sprint project1', 1),
  (12, 'Build Sprint project1', 1),
  (13, 'Design Sprint project2', 1),
  (14, 'Build Sprint project2', 1),
  (15, 'Build Sprint project2', 1),
  (16, 'Design Sprint project3', 1),
  (17, 'Build Sprint project3', 1),
  (18, 'Build Sprint project3', 1),
  (1, 'Toolkit', 2),
  (2, 'Testing', 2),
  (3, 'APIs', 2),
  (4, 'Node.js 1/2', 2),
  (5, 'Node.js 2/2', 2),
  (6, 'PostgreSQL', 2),
  (7, 'Authentication', 2),
  (8, 'Express', 2),
  (10, 'Design Sprint project1', 2),
  (11, 'Build Sprint project1', 2),
  (12, 'Build Sprint project1', 2),
  (13, 'Design Sprint project2', 2),
  (14, 'Build Sprint project2', 2),
  (15, 'Build Sprint project2', 2),
  (16, 'Design Sprint project3', 2),
  (17, 'Build Sprint project3', 2),
  (18, 'Build Sprint project3', 2);

INSERT INTO days (week_id, day_no, date) VALUES
  (1, 1, '2018-03-11'),
  (1, 2, '2018-03-12'),
  (1, 3, '2018-03-13'),
  (1, 4, '2018-03-14'),
  (1, 5, '2018-03-15'),
  (2, 1, '2018-03-18'),
  (2, 2, '2018-03-19'),
  (2, 3, '2018-03-20'),
  (2, 4, '2018-03-21'),
  (2, 5, '2018-03-22'),
  (3, 1, '2018-03-25'),
  (3, 2, '2018-03-26'),
  (3, 3, '2018-03-27'),
  (3, 4, '2018-03-28'),
  (3, 5, '2018-03-29'),
  (4, 1, '2018-04-01'),
  (4, 2, '2018-04-02'),
  (4, 3, '2018-04-03'),
  (4, 4, '2018-04-04'),
  (4, 5, '2018-04-05'),
  (5, 1, '2018-04-08'),
  (5, 2, '2018-04-09'),
  (5, 3, '2018-04-10'),
  (5, 4, '2018-04-11'),
  (5, 5, '2018-04-12'),
  (6, 1, '2018-04-15'),
  (6, 2, '2018-04-16'),
  (6, 3, '2018-04-17'),
  (6, 4, '2018-04-18'),
  (6, 5, '2018-04-19'),
  (7, 1, '2018-04-22'),
  (7, 2, '2018-04-23'),
  (7, 3, '2018-04-24'),
  (7, 4, '2018-04-25'),
  (7, 5, '2018-04-26'),
  (8, 1, '2018-04-29'),
  (8, 2, '2018-04-30'),
  (8, 3, '2018-05-01'),
  (8, 4, '2018-05-02'),
  (8, 5, '2018-05-03'),
  (9, 1, '2018-05-06'),
  (9, 2, '2018-05-07'),
  (9, 3, '2018-05-08'),
  (9, 4, '2018-05-09'),
  (9, 5, '2018-05-10'),
  (10, 1, '2018-05-13'),
  (10, 2, '2018-05-14'),
  (10, 3, '2018-05-15'),
  (10, 4, '2018-05-16'),
  (10, 5, '2018-05-17'),
  (11, 1, '2018-05-20'),
  (11, 2, '2018-05-21'),
  (11, 3, '2018-05-22'),
  (11, 4, '2018-05-23'),
  (11, 5, '2018-05-24'),
  (12, 1, '2018-05-27'),
  (12, 2, '2018-05-28'),
  (12, 3, '2018-05-29'),
  (12, 4, '2018-05-30'),
  (12, 5, '2018-05-31'),
  (13, 1, '2018-06-03'),
  (13, 2, '2018-06-04'),
  (13, 3, '2018-06-05'),
  (13, 4, '2018-06-06'),
  (13, 5, '2018-06-07'),
  (14, 1, '2018-06-10'),
  (14, 2, '2018-06-11'),
  (14, 3, '2018-06-12'),
  (14, 4, '2018-06-13'),
  (14, 5, '2018-06-14'),
  (15, 1, '2018-06-17'),
  (15, 2, '2018-06-18'),
  (15, 3, '2018-06-19'),
  (15, 4, '2018-06-20'),
  (15, 5, '2018-06-21'),
  (16, 1, '2018-06-24'),
  (16, 2, '2018-06-25'),
  (16, 3, '2018-06-26'),
  (16, 4, '2018-06-27'),
  (16, 5, '2018-06-28'),
  (17, 1, '2018-07-01'),
  (17, 2, '2018-07-02'),
  (17, 3, '2018-07-03'),
  (17, 4, '2018-07-04'),
  (17, 5, '2018-07-05'),
  (18, 1, '2018-07-08'),
  (18, 2, '2018-07-09'),
  (18, 3, '2018-07-10'),
  (18, 4, '2018-07-11'),
  (18, 5, '2018-07-12'),
  (19, 1, '2018-07-01'),
  (19, 2, '2018-07-02'),
  (19, 3, '2018-07-03'),
  (19, 4, '2018-07-04'),
  (19, 5, '2018-07-05'),
  (20, 1, '2018-07-08'),
  (20, 2, '2018-07-09'),
  (20, 3, '2018-07-10'),
  (20, 4, '2018-07-11'),
  (20, 5, '2018-07-12'),
  (21, 1, '2018-07-15'),
  (21, 2, '2018-07-16'),
  (21, 3, '2018-07-17'),
  (21, 4, '2018-07-18'),
  (21, 5, '2018-07-19'),
  (22, 1, '2018-07-22'),
  (22, 2, '2018-07-23'),
  (22, 3, '2018-07-24'),
  (22, 4, '2018-07-25'),
  (22, 5, '2018-07-26'),
  (23, 1, '2018-07-29'),
  (23, 2, '2018-07-30'),
  (23, 3, '2018-07-31'),
  (23, 4, '2018-08-01'),
  (23, 5, '2018-08-02'),
  (24, 1, '2018-08-05'),
  (24, 2, '2018-08-06'),
  (24, 3, '2018-08-07'),
  (24, 4, '2018-08-08'),
  (24, 5, '2018-08-09');

INSERT INTO attendance(user_id, clock_in, clock_out, day_id) VALUES
  ( 1, '09:00:00', '17:00:00', 1 ),
  ( 2, '09:00:00', '17:00:00', 1 ),
  ( 3, '09:00:00', '17:00:00', 1 ),
  ( 4, '09:00:00', '17:00:00', 1 ),
  ( 1, '09:00:00', '17:00:00', 2 ),
  ( 2, '09:00:00', '17:00:00', 2 ),
  ( 3, '09:00:00', '17:00:00', 2 ),
  ( 4, '09:00:00', '17:00:00', 2 ),
  ( 1, '09:00:00', '17:00:00', 3 ),
  ( 2, '09:00:00', '17:00:00', 3 ),
  ( 3, '09:00:00', '17:00:00', 3 ),
  ( 4, '09:00:00', '17:00:00', 3 ),
  ( 1, '09:00:00', '17:00:00', 4 ),
  ( 2, '09:00:00', '17:00:00', 4 ),
  ( 3, '09:00:00', '17:00:00', 4 ),
  ( 4, '09:00:00', '17:00:00', 4 ),
  ( 1, '09:00:00', '17:00:00', 5 ),
  ( 2, '09:00:00', '17:00:00', 5 ),
  ( 3, '09:00:00', '17:00:00', 5 ),
  ( 4, '09:00:00', '17:00:00', 5 ),
  ( 1, '09:00:00', '17:00:00', 6 ),
  ( 2, '09:00:00', '17:00:00', 6 ),
  ( 3, '09:00:00', '17:00:00', 6 ),
  ( 4, '09:00:00', '17:00:00', 6 ),
  ( 1, '09:00:00', '17:00:00', 7 ),
  ( 2, '09:00:00', '17:00:00', 7 ),
  ( 3, '09:00:00', '17:00:00', 7 ),
  ( 4, '09:00:00', '17:00:00', 7 ),
  ( 1, '09:00:00', '17:00:00', 8 ),
  ( 2, '09:00:00', '17:00:00', 8 ),
  ( 3, '09:00:00', '17:00:00', 8 ),
  ( 4, '09:00:00', '17:00:00', 8 ),
  ( 1, '09:00:00', '17:00:00', 9 ),
  ( 2, '09:00:00', '17:00:00', 9 ),
  ( 3, '09:00:00', '17:00:00', 9 ),
  ( 4, '09:00:00', '17:00:00', 9 ),
  ( 1, '09:00:00', '17:00:00', 10 ),
  ( 2, '09:00:00', '17:00:00', 10 ),
  ( 3, '09:00:00', '17:00:00', 10 ),
  ( 4, '09:00:00', '17:00:00', 10 ),
  ( 1, '09:00:00', '17:00:00', 11 ),
  ( 2, '09:00:00', '17:00:00', 11 ),
  ( 3, '09:00:00', '17:00:00', 11 ),
  ( 4, '09:00:00', '17:00:00', 11 ),
  ( 1, '09:00:00', '17:00:00', 12 ),
  ( 2, '09:00:00', '17:00:00', 12 ),
  ( 3, '09:00:00', '17:00:00', 12 ),
  ( 4, '09:00:00', '17:00:00', 12 ),
  ( 1, '09:00:00', '17:00:00', 13 ),
  ( 2, '09:00:00', '17:00:00', 13 ),
  ( 3, '09:00:00', '17:00:00', 13 ),
  ( 4, '09:00:00', '17:00:00', 13 ),
  ( 1, '09:00:00', '17:00:00', 14 ),
  ( 2, '09:00:00', '17:00:00', 14 ),
  ( 3, '09:00:00', '17:00:00', 14 ),
  ( 4, '09:00:00', '17:00:00', 14 ),
  ( 1, '09:00:00', '17:00:00', 15 ),
  ( 2, '09:00:00', '17:00:00', 15 ),
  ( 3, '09:00:00', '17:00:00', 15 ),
  ( 4, '09:00:00', '17:00:00', 15 ),
  ( 1, '09:00:00', '17:00:00', 16 ),
  ( 2, '09:00:00', '17:00:00', 16 ),
  ( 3, '09:00:00', '17:00:00', 16 ),
  ( 4, '09:00:00', '17:00:00', 16 ),
  ( 1, '09:00:00', '17:00:00', 17 ),
  ( 2, '09:00:00', '17:00:00', 17 ),
  ( 3, '09:00:00', '17:00:00', 17 ),
  ( 4, '09:00:00', '17:00:00', 17 ),
  ( 1, '09:00:00', '17:00:00', 18 ),
  ( 2, '09:00:00', '17:00:00', 18 ),
  ( 3, '09:00:00', '17:00:00', 18 ),
  ( 4, '09:00:00', '17:00:00', 18 ),
  ( 1, '09:00:00', '17:00:00', 19 ),
  ( 2, '09:00:00', '17:00:00', 19 ),
  ( 3, '09:00:00', '17:00:00', 19 ),
  ( 4, '09:00:00', '17:00:00', 19 ),
  ( 1, '09:00:00', '17:00:00', 20 ),
  ( 2, '09:00:00', '17:00:00', 20 ),
  ( 3, '09:00:00', '17:00:00', 20 ),
  ( 4, '09:00:00', '17:00:00', 20 ),
  ( 1, '09:00:00', '17:00:00', 21 ),
  ( 2, '09:00:00', '17:00:00', 21 ),
  ( 3, '09:00:00', '17:00:00', 21 ),
  ( 4, '09:00:00', '17:00:00', 21 ),
  ( 1, '09:00:00', '17:00:00', 22 ),
  ( 2, '09:00:00', '17:00:00', 22 ),
  ( 3, '09:00:00', '17:00:00', 22 ),
  ( 4, '09:00:00', '17:00:00', 22 ),
  ( 1, '09:00:00', '17:00:00', 23 ),
  ( 2, '09:00:00', '17:00:00', 23 ),
  ( 3, '09:00:00', '17:00:00', 23 ),
  ( 4, '09:00:00', '17:00:00', 23 ),
  ( 1, '09:00:00', '17:00:00', 24 ),
  ( 2, '09:00:00', '17:00:00', 24 ),
  ( 3, '09:00:00', '17:00:00', 24 ),
  ( 4, '09:00:00', '17:00:00', 24 ),
  ( 1, '09:00:00', '17:00:00', 25 ),
  ( 2, '09:00:00', '17:00:00', 25 ),
  ( 3, '09:00:00', '17:00:00', 25 ),
  ( 4, '09:00:00', '17:00:00', 25 ),
  ( 1, '09:00:00', '17:00:00', 26 ),
  ( 2, '09:00:00', '17:00:00', 26 ),
  ( 3, '09:00:00', '17:00:00', 26 ),
  ( 4, '09:00:00', '17:00:00', 26 ),
  ( 1, '09:00:00', '17:00:00', 27 ),
  ( 2, '09:00:00', '17:00:00', 27 ),
  ( 3, '09:00:00', '17:00:00', 27 ),
  ( 4, '09:00:00', '17:00:00', 27 ),
  ( 1, '09:00:00', '17:00:00', 28 ),
  ( 2, '09:00:00', '17:00:00', 28 ),
  ( 3, '09:00:00', '17:00:00', 28 ),
  ( 4, '09:00:00', '17:00:00', 28 ),
  ( 1, '09:00:00', '17:00:00', 29 ),
  ( 2, '09:00:00', '17:00:00', 29 ),
  ( 3, '09:00:00', '17:00:00', 29 ),
  ( 4, '09:00:00', '17:00:00', 29 ),
  ( 1, '09:00:00', '17:00:00', 30 ),
  ( 2, '09:00:00', '17:00:00', 30 ),
  ( 3, '09:00:00', '17:00:00', 30 ),
  ( 4, '09:00:00', '17:00:00', 30 ),
  ( 1, '09:00:00', '17:00:00', 31 ),
  ( 2, '09:00:00', '17:00:00', 31 ),
  ( 3, '09:00:00', '17:00:00', 31 ),
  ( 4, '09:00:00', '17:00:00', 31 ),
  ( 1, '09:00:00', '17:00:00', 32 ),
  ( 2, '09:00:00', '17:00:00', 32 ),
  ( 3, '09:00:00', '17:00:00', 32 ),
  ( 4, '09:00:00', '17:00:00', 32 ),
  ( 1, '09:00:00', '17:00:00', 33 ),
  ( 2, '09:00:00', '17:00:00', 33 ),
  ( 3, '09:00:00', '17:00:00', 33 ),
  ( 4, '09:00:00', '17:00:00', 33 ),
  ( 1, '09:00:00', '17:00:00', 34 ),
  ( 2, '09:00:00', '17:00:00', 34 ),
  ( 3, '09:00:00', '17:00:00', 34 ),
  ( 4, '09:00:00', '17:00:00', 34 ),
  ( 1, '09:00:00', '17:00:00', 35 ),
  ( 2, '09:00:00', '17:00:00', 35 ),
  ( 3, '09:00:00', '17:00:00', 35 ),
  ( 4, '09:00:00', '17:00:00', 35 ),
  ( 1, '09:00:00', '17:00:00', 36 ),
  ( 2, '09:00:00', '17:00:00', 36 ),
  ( 3, '09:00:00', '17:00:00', 36 ),
  ( 4, '09:00:00', '17:00:00', 36 ),
  ( 1, '09:00:00', '17:00:00', 37 ),
  ( 2, '09:00:00', '17:00:00', 37 ),
  ( 3, '09:00:00', '17:00:00', 37 ),
  ( 4, '09:00:00', '17:00:00', 37 ),
  ( 1, '09:00:00', '17:00:00', 38 ),
  ( 2, '09:00:00', '17:00:00', 38 ),
  ( 3, '09:00:00', '17:00:00', 38 ),
  ( 4, '09:00:00', '17:00:00', 38 ),
  ( 1, '09:00:00', '17:00:00', 39 ),
  ( 2, '09:00:00', '17:00:00', 39 ),
  ( 3, '09:00:00', '17:00:00', 39 ),
  ( 4, '09:00:00', '17:00:00', 39 ),
  ( 1, '09:00:00', '17:00:00', 40 ),
  ( 2, '09:00:00', '17:00:00', 40 ),
  ( 3, '09:00:00', '17:00:00', 40 ),
  ( 4, '09:00:00', '17:00:00', 40 ),
  ( 1, '09:00:00', '17:00:00', 41 ),
  ( 2, '09:00:00', '17:00:00', 41 ),
  ( 3, '09:00:00', '17:00:00', 41 ),
  ( 4, '09:00:00', '17:00:00', 41 ),
  ( 1, '09:00:00', '17:00:00', 42 ),
  ( 2, '09:00:00', '17:00:00', 42 ),
  ( 3, '09:00:00', '17:00:00', 42 ),
  ( 4, '09:00:00', '17:00:00', 42 ),
  ( 1, '09:00:00', '17:00:00', 43 ),
  ( 2, '09:00:00', '17:00:00', 43 ),
  ( 3, '09:00:00', '17:00:00', 43 ),
  ( 4, '09:00:00', '17:00:00', 43 ),
  ( 1, '09:00:00', '17:00:00', 44 ),
  ( 2, '09:00:00', '17:00:00', 44 ),
  ( 3, '09:00:00', '17:00:00', 44 ),
  ( 4, '09:00:00', '17:00:00', 44 ),
  ( 1, '09:00:00', '17:00:00', 45 ),
  ( 2, '09:00:00', '17:00:00', 45 ),
  ( 3, '09:00:00', '17:00:00', 45 ),
  ( 4, '09:00:00', '17:00:00', 45 ),
  ( 1, '09:00:00', '17:00:00', 46 ),
  ( 2, '09:00:00', '17:00:00', 46 ),
  ( 3, '09:00:00', '17:00:00', 46 ),
  ( 4, '09:00:00', '17:00:00', 46 ),
  ( 1, '09:00:00', '17:00:00', 47 ),
  ( 2, '09:00:00', '17:00:00', 47 ),
  ( 3, '09:00:00', '17:00:00', 47 ),
  ( 4, '09:00:00', '17:00:00', 47 ),
  ( 1, '09:00:00', '17:00:00', 48 ),
  ( 2, '09:00:00', '17:00:00', 48 ),
  ( 3, '09:00:00', '17:00:00', 48 ),
  ( 4, '09:00:00', '17:00:00', 48 ),
  ( 1, '09:00:00', '17:00:00', 49 ),
  ( 2, '09:00:00', '17:00:00', 49 ),
  ( 3, '09:00:00', '17:00:00', 49 ),
  ( 4, '09:00:00', '17:00:00', 49 ),
  ( 1, '09:00:00', '17:00:00', 50 ),
  ( 2, '09:00:00', '17:00:00', 50 ),
  ( 3, '09:00:00', '17:00:00', 50 ),
  ( 4, '09:00:00', '17:00:00', 50 ),
  ( 1, '09:00:00', '17:00:00', 51 ),
  ( 2, '09:00:00', '17:00:00', 51 ),
  ( 3, '09:00:00', '17:00:00', 51 ),
  ( 4, '09:00:00', '17:00:00', 51 ),
  ( 1, '09:00:00', '17:00:00', 52 ),
  ( 2, '09:00:00', '17:00:00', 52 ),
  ( 3, '09:00:00', '17:00:00', 52 ),
  ( 4, '09:00:00', '17:00:00', 52 ),
  ( 1, '09:00:00', '17:00:00', 53 ),
  ( 2, '09:00:00', '17:00:00', 53 ),
  ( 3, '09:00:00', '17:00:00', 53 ),
  ( 4, '09:00:00', '17:00:00', 53 ),
  ( 1, '09:00:00', '17:00:00', 54 ),
  ( 2, '09:00:00', '17:00:00', 54 ),
  ( 3, '09:00:00', '17:00:00', 54 ),
  ( 4, '09:00:00', '17:00:00', 54 ),
  ( 1, '09:00:00', '17:00:00', 55 ),
  ( 2, '09:00:00', '17:00:00', 55 ),
  ( 3, '09:00:00', '17:00:00', 55 ),
  ( 4, '09:00:00', '17:00:00', 55 ),
  ( 1, '09:00:00', '17:00:00', 56 ),
  ( 2, '09:00:00', '17:00:00', 56 ),
  ( 3, '09:00:00', '17:00:00', 56 ),
  ( 4, '09:00:00', '17:00:00', 56 ),
  ( 1, '09:00:00', '17:00:00', 57 ),
  ( 2, '09:00:00', '17:00:00', 57 ),
  ( 3, '09:00:00', '17:00:00', 57 ),
  ( 4, '09:00:00', '17:00:00', 57 ),
  ( 1, '09:00:00', '17:00:00', 58 ),
  ( 2, '09:00:00', '17:00:00', 58 ),
  ( 3, '09:00:00', '17:00:00', 58 ),
  ( 4, '09:00:00', '17:00:00', 58 ),
  ( 1, '09:00:00', '17:00:00', 59 ),
  ( 2, '09:00:00', '17:00:00', 59 ),
  ( 3, '09:00:00', '17:00:00', 59 ),
  ( 4, '09:00:00', '17:00:00', 59 ),
  ( 1, '09:00:00', '17:00:00', 60 ),
  ( 2, '09:00:00', '17:00:00', 60 ),
  ( 3, '09:00:00', '17:00:00', 60 ),
  ( 4, '09:00:00', '17:00:00', 60 ),
  ( 1, '09:00:00', '17:00:00', 61 ),
  ( 2, '09:00:00', '17:00:00', 61 ),
  ( 3, '09:00:00', '17:00:00', 61 ),
  ( 4, '09:00:00', '17:00:00', 61 ),
  ( 1, '09:00:00', '17:00:00', 62 ),
  ( 2, '09:00:00', '17:00:00', 62 ),
  ( 3, '09:00:00', '17:00:00', 62 ),
  ( 4, '09:00:00', '17:00:00', 62 ),
  ( 1, '09:00:00', '17:00:00', 63 ),
  ( 2, '09:00:00', '17:00:00', 63 ),
  ( 3, '09:00:00', '17:00:00', 63 ),
  ( 4, '09:00:00', '17:00:00', 63 ),
  ( 1, '09:00:00', '17:00:00', 64 ),
  ( 2, '09:00:00', '17:00:00', 64 ),
  ( 3, '09:00:00', '17:00:00', 64 ),
  ( 4, '09:00:00', '17:00:00', 64 ),
  ( 1, '09:00:00', '17:00:00', 65 ),
  ( 2, '09:00:00', '17:00:00', 65 ),
  ( 3, '09:00:00', '17:00:00', 65 ),
  ( 4, '09:00:00', '17:00:00', 65 ),
  ( 1, '09:00:00', '17:00:00', 66 ),
  ( 2, '09:00:00', '17:00:00', 66 ),
  ( 3, '09:00:00', '17:00:00', 66 ),
  ( 4, '09:00:00', '17:00:00', 66 ),
  ( 1, '09:00:00', '17:00:00', 67 ),
  ( 2, '09:00:00', '17:00:00', 67 ),
  ( 3, '09:00:00', '17:00:00', 67 ),
  ( 4, '09:00:00', '17:00:00', 67 ),
  ( 1, '09:00:00', '17:00:00', 68 ),
  ( 2, '09:00:00', '17:00:00', 68 ),
  ( 3, '09:00:00', '17:00:00', 68 ),
  ( 4, '09:00:00', '17:00:00', 68 ),
  ( 1, '09:00:00', '17:00:00', 69 ),
  ( 2, '09:00:00', '17:00:00', 69 ),
  ( 3, '09:00:00', '17:00:00', 69 ),
  ( 4, '09:00:00', '17:00:00', 69 ),
  ( 1, '09:00:00', '17:00:00', 70 ),
  ( 2, '09:00:00', '17:00:00', 70 ),
  ( 3, '09:00:00', '17:00:00', 70 ),
  ( 4, '09:00:00', '17:00:00', 70 ),
  ( 1, '09:00:00', '17:00:00', 71 ),
  ( 2, '09:00:00', '17:00:00', 71 ),
  ( 3, '09:00:00', '17:00:00', 71 ),
  ( 4, '09:00:00', '17:00:00', 71 ),
  ( 1, '09:00:00', '17:00:00', 72 ),
  ( 2, '09:00:00', '17:00:00', 72 ),
  ( 3, '09:00:00', '17:00:00', 72 ),
  ( 4, '09:00:00', '17:00:00', 72 ),
  ( 1, '09:00:00', '17:00:00', 73 ),
  ( 2, '09:00:00', '17:00:00', 73 ),
  ( 3, '09:00:00', '17:00:00', 73 ),
  ( 4, '09:00:00', '17:00:00', 73 ),
  ( 1, '09:00:00', '17:00:00', 74 ),
  ( 2, '09:00:00', '17:00:00', 74 ),
  ( 3, '09:00:00', '17:00:00', 74 ),
  ( 4, '09:00:00', '17:00:00', 74 ),
  ( 1, '09:00:00', '17:00:00', 75 ),
  ( 2, '09:00:00', '17:00:00', 75 ),
  ( 3, '09:00:00', '17:00:00', 75 ),
  ( 4, '09:00:00', '17:00:00', 75 ),
  ( 1, '09:00:00', '17:00:00', 76 ),
  ( 2, '09:00:00', '17:00:00', 76 ),
  ( 3, '09:00:00', '17:00:00', 76 ),
  ( 4, '09:00:00', '17:00:00', 76 ),
  ( 1, '09:00:00', '17:00:00', 77 ),
  ( 2, '09:00:00', '17:00:00', 77 ),
  ( 3, '09:00:00', '17:00:00', 77 ),
  ( 4, '09:00:00', '17:00:00', 77 ),
  ( 1, '09:00:00', '17:00:00', 78 ),
  ( 2, '09:00:00', '17:00:00', 78 ),
  ( 3, '09:00:00', '17:00:00', 78 ),
  ( 4, '09:00:00', '17:00:00', 78 ),
  ( 1, '09:00:00', '17:00:00', 79 ),
  ( 2, '09:00:00', '17:00:00', 79 ),
  ( 3, '09:00:00', '17:00:00', 79 ),
  ( 4, '09:00:00', '17:00:00', 79 ),
  ( 1, '09:00:00', '17:00:00', 80 ),
  ( 2, '09:00:00', '17:00:00', 80 ),
  ( 3, '09:00:00', '17:00:00', 80 ),
  ( 4, '09:00:00', '17:00:00', 80 ),
  ( 1, '09:00:00', '17:00:00', 81 ),
  ( 2, '09:00:00', '17:00:00', 81 ),
  ( 3, '09:00:00', '17:00:00', 81 ),
  ( 4, '09:00:00', '17:00:00', 81 ),
  ( 1, '09:00:00', '17:00:00', 82 ),
  ( 2, '09:00:00', '17:00:00', 82 ),
  ( 3, '09:00:00', '17:00:00', 82 ),
  ( 4, '09:00:00', '17:00:00', 82 ),
  ( 1, '09:00:00', '17:00:00', 83 ),
  ( 2, '09:00:00', '17:00:00', 83 ),
  ( 3, '09:00:00', '17:00:00', 83 ),
  ( 4, '09:00:00', '17:00:00', 83 ),
  ( 1, '09:00:00', '17:00:00', 84 ),
  ( 2, '09:00:00', '17:00:00', 84 ),
  ( 3, '09:00:00', '17:00:00', 84 ),
  ( 4, '09:00:00', '17:00:00', 84 ),
  ( 1, '09:00:00', '17:00:00', 85 ),
  ( 2, '09:00:00', '17:00:00', 85 ),
  ( 3, '09:00:00', '17:00:00', 85 ),
  ( 4, '09:00:00', '17:00:00', 85 ),
  ( 1, '09:00:00', '17:00:00', 86 ),
  ( 2, '09:00:00', '17:00:00', 86 ),
  ( 3, '09:00:00', '17:00:00', 86 ),
  ( 4, '09:00:00', '17:00:00', 86 ),
  ( 1, '09:00:00', '17:00:00', 87 ),
  ( 2, '09:00:00', '17:00:00', 87 ),
  ( 3, '09:00:00', '17:00:00', 87 ),
  ( 4, '09:00:00', '17:00:00', 87 ),
  ( 1, '09:00:00', '17:00:00', 88 ),
  ( 2, '09:00:00', '17:00:00', 88 ),
  ( 3, '09:00:00', '17:00:00', 88 ),
  ( 4, '09:00:00', '17:00:00', 88 ),
  ( 1, '09:00:00', '17:00:00', 89 ),
  ( 2, '09:00:00', '17:00:00', 89 ),
  ( 3, '09:00:00', '17:00:00', 89 ),
  ( 4, '09:00:00', '17:00:00', 89 ),
  ( 1, '09:00:00', '17:00:00', 90 ),
  ( 2, '09:00:00', '17:00:00', 90 ),
  ( 3, '09:00:00', '17:00:00', 90 ),
  ( 4, '09:00:00', '17:00:00', 90 ),
  ( 1, '09:00:00', '17:00:00', 91 ),
  ( 2, '09:00:00', '17:00:00', 91 ),
  ( 3, '09:00:00', '17:00:00', 91 ),
  ( 4, '09:00:00', '17:00:00', 91 ),
  ( 1, '09:00:00', '17:00:00', 92 ),
  ( 2, '09:00:00', '17:00:00', 92 ),
  ( 3, '09:00:00', '17:00:00', 92 ),
  ( 4, '09:00:00', '17:00:00', 92 ),
  ( 1, '09:00:00', '17:00:00', 93 ),
  ( 2, '09:00:00', '17:00:00', 93 ),
  ( 3, '09:00:00', '17:00:00', 93 ),
  ( 4, '09:00:00', '17:00:00', 93 ),
  ( 1, '09:00:00', '17:00:00', 94 ),
  ( 2, '09:00:00', '17:00:00', 94 ),
  ( 3, '09:00:00', '17:00:00', 94 ),
  ( 4, '09:00:00', '17:00:00', 94 ),
  ( 1, '09:00:00', '17:00:00', 95 ),
  ( 2, '09:00:00', '17:00:00', 95 ),
  ( 3, '09:00:00', '17:00:00', 95 ),
  ( 4, '09:00:00', '17:00:00', 95 ),
  ( 1, '09:00:00', '17:00:00', 96 ),
  ( 2, '09:00:00', '17:00:00', 96 ),
  ( 3, '09:00:00', '17:00:00', 96 ),
  ( 4, '09:00:00', '17:00:00', 96 ),
  ( 1, '09:00:00', '17:00:00', 97 ),
  ( 2, '09:00:00', '17:00:00', 97 ),
  ( 3, '09:00:00', '17:00:00', 97 ),
  ( 4, '09:00:00', '17:00:00', 97 ),
  ( 1, '09:00:00', '17:00:00', 98 ),
  ( 2, '09:00:00', '17:00:00', 98 ),
  ( 3, '09:00:00', '17:00:00', 98 ),
  ( 4, '09:00:00', '17:00:00', 98 ),
  ( 1, '09:00:00', '17:00:00', 99 ),
  ( 2, '09:00:00', '17:00:00', 99 ),
  ( 3, '09:00:00', '17:00:00', 99 ),
  ( 4, '09:00:00', '17:00:00', 99 ),
  ( 1, '09:00:00', '17:00:00', 100 ),
  ( 2, '09:00:00', '17:00:00', 100 ),
  ( 3, '09:00:00', '17:00:00', 100 ),
  ( 4, '09:00:00', '17:00:00', 100 ),
  ( 1, '09:00:00', '17:00:00', 101 ),
  ( 2, '09:00:00', '17:00:00', 101 ),
  ( 3, '09:00:00', '17:00:00', 101 ),
  ( 4, '09:00:00', '17:00:00', 101 ),
  ( 1, '09:00:00', '17:00:00', 102 ),
  ( 2, '09:00:00', '17:00:00', 102 ),
  ( 3, '09:00:00', '17:00:00', 102 ),
  ( 4, '09:00:00', '17:00:00', 102 ),
  ( 1, '09:00:00', '17:00:00', 103 ),
  ( 2, '09:00:00', '17:00:00', 103 ),
  ( 3, '09:00:00', '17:00:00', 103 ),
  ( 4, '09:00:00', '17:00:00', 103 ),
  ( 1, '09:00:00', '17:00:00', 104 ),
  ( 2, '09:00:00', '17:00:00', 104 ),
  ( 3, '09:00:00', '17:00:00', 104 ),
  ( 4, '09:00:00', '17:00:00', 104 ),
  ( 1, '09:00:00', '17:00:00', 105 ),
  ( 2, '09:00:00', '17:00:00', 105 ),
  ( 3, '09:00:00', '17:00:00', 105 ),
  ( 4, '09:00:00', '17:00:00', 105 ),
  ( 1, '09:00:00', '17:00:00', 106 ),
  ( 2, '09:00:00', '17:00:00', 106 ),
  ( 3, '09:00:00', '17:00:00', 106 ),
  ( 4, '09:00:00', '17:00:00', 106 ),
  ( 1, '09:00:00', '17:00:00', 107 ),
  ( 2, '09:00:00', '17:00:00', 107 ),
  ( 3, '09:00:00', '17:00:00', 107 ),
  ( 4, '09:00:00', '17:00:00', 107 ),
  ( 1, '09:00:00', '17:00:00', 108 ),
  ( 2, '09:00:00', '17:00:00', 108 ),
  ( 3, '09:00:00', '17:00:00', 108 ),
  ( 4, '09:00:00', '17:00:00', 108 ),
  ( 1, '09:00:00', '17:00:00', 109 ),
  ( 2, '09:00:00', '17:00:00', 109 ),
  ( 3, '09:00:00', '17:00:00', 109 ),
  ( 4, '09:00:00', '17:00:00', 109 ),
  ( 1, '09:00:00', '17:00:00', 110 ),
  ( 2, '09:00:00', '17:00:00', 110 ),
  ( 3, '09:00:00', '17:00:00', 110 ),
  ( 4, '09:00:00', '17:00:00', 110 ),
  ( 1, '09:00:00', '17:00:00', 111 ),
  ( 2, '09:00:00', '17:00:00', 111 ),
  ( 3, '09:00:00', '17:00:00', 111 ),
  ( 4, '09:00:00', '17:00:00', 111 ),
  ( 1, '09:00:00', '17:00:00', 112 ),
  ( 2, '09:00:00', '17:00:00', 112 ),
  ( 3, '09:00:00', '17:00:00', 112 ),
  ( 4, '09:00:00', '17:00:00', 112 ),
  ( 1, '09:00:00', '17:00:00', 113 ),
  ( 2, '09:00:00', '17:00:00', 113 ),
  ( 3, '09:00:00', '17:00:00', 113 ),
  ( 4, '09:00:00', '17:00:00', 113 ),
  ( 1, '09:00:00', '17:00:00', 114 ),
  ( 2, '09:00:00', '17:00:00', 114 ),
  ( 3, '09:00:00', '17:00:00', 114 ),
  ( 4, '09:00:00', '17:00:00', 114 ),
  ( 1, '09:00:00', '17:00:00', 115 ),
  ( 2, '09:00:00', '17:00:00', 115 ),
  ( 3, '09:00:00', '17:00:00', 115 ),
  ( 4, '09:00:00', '17:00:00', 115 ),
  ( 1, '09:00:00', '17:00:00', 116 ),
  ( 2, '09:00:00', '17:00:00', 116 ),
  ( 3, '09:00:00', '17:00:00', 116 ),
  ( 4, '09:00:00', '17:00:00', 116 ),
  ( 1, '09:00:00', '17:00:00', 117 ),
  ( 2, '09:00:00', '17:00:00', 117 ),
  ( 3, '09:00:00', '17:00:00', 117 ),
  ( 4, '09:00:00', '17:00:00', 117 ),
  ( 1, '09:00:00', '17:00:00', 118 ),
  ( 2, '09:00:00', '17:00:00', 118 ),
  ( 3, '09:00:00', '17:00:00', 118 ),
  ( 4, '09:00:00', '17:00:00', 118 ),
  ( 1, '09:00:00', '17:00:00', 119 ),
  ( 2, '09:00:00', '17:00:00', 119 ),
  ( 3, '09:00:00', '17:00:00', 119 ),
  ( 4, '09:00:00', '17:00:00', 119 );

INSERT INTO flags(user_id, type) VALUES
  (1, 'attendance'),
  (1, 'being on time'),
  (1, 'attitude towards teemwork'),
  (2, 'attitude towards learning');

INSERT INTO feedbacks (user_id, content) VALUES
  (1, 'you are doing great but you should stop your bad attitude towards your teamwork, we all have different thoughts and we should bear with each other'),
  (1, 'you have been late for more than one day, please come in early');

INSERT INTO week_mentors (user_id, week_id) VALUES
  ( 8, 1 ),
  ( 9, 1 ),
  ( 8, 2 ),
  ( 9, 2 ),
  ( 8, 3 ),
  ( 9, 3 ),
  ( 8, 4 ),
  ( 9, 4 ),
  ( 8, 5 ),
  ( 9, 5 ),
  ( 8, 6 ),
  ( 9, 6 ),
  ( 8, 7 ),
  ( 9, 7 ),
  ( 8, 8 ),
  ( 9, 8 ),
  ( 1, 19 ),
  ( 2, 19 ),
  ( 3, 19 ),
  ( 4, 19 ),
  ( 1, 20 ),
  ( 2, 20 ),
  ( 3, 20 ),
  ( 4, 20 ),
  ( 1, 21 ),
  ( 2, 21 ),
  ( 3, 21 ),
  ( 4, 21 ),
  ( 1, 22 ),
  ( 2, 22 ),
  ( 3, 22 ),
  ( 4, 22 ),
  ( 1, 23 ),
  ( 2, 23 ),
  ( 3, 23 ),
  ( 4, 23 ),
  ( 1, 24 ),
  ( 2, 24 ),
  ( 3, 24 ),
  ( 4, 24 ),
  ( 1, 25 ),
  ( 2, 25 ),
  ( 3, 25 ),
  ( 4, 25 ),
  ( 1, 26 ),
  ( 2, 26 ),
  ( 3, 26 ),
  ( 4, 26 ),
  ( 1, 27 ),
  ( 2, 27 ),
  ( 3, 27 ),
  ( 4, 27 );

INSERT INTO workshops (day_id , title , link , start_time , end_time) VALUES
(1 , 'Welcome talk' , NULL , '09:00:00' , '09:30:00'),
(1 , 'Name game' , NULL , '09:30:00' , '10:30:00'),
(1 , 'Coffee Break' , NULL , '10:30:00' , '10:40:00'),
(1 , 'Course overview' , NULL , '10:40:00' , '12:00:00'),
(1 , 'Intro to pair programming' , NULL , '13:00:00' , '13:50:00'),
(1 , 'Coffee Break' , NULL , '13:50:00' , '14:00:00'),
(1 , 'Accessibility Workshop' , NULL , '14:00:00' , '15:00:00'),
(1 , 'Github Scavenger Hunt' , NULL , '15:00:00' , '16:00:00'),
(1 , 'Intro to consensus based descision-making' , NULL , '16:00:00' , '17:00:00'),
(2 , 'Morning Challenge - Accessibility challenge' , NULL , '09:00:00' , '10:00:00'),
(2 , 'Git Workshop' , NULL , '10:00:00' , '12:00:00'),
(2 , 'Introduce Project' , NULL , '13:00:00' , '13:30:00'),
(2 , 'Introduce research topics' , NULL , '13:30:00' , '13:45:00'),
(2 , 'Presentation Guidance' , NULL , '13:45:00' , '14:00:00'),
(2 , 'Research' , NULL , '14:00:00' , '16:00:00'),
(2 , 'Research presentation' , NULL , '16:00:00' , '17:00:00'),
(3 , 'Morning challenge CSS Gallery' , NULL , '09:00:00' , '10:00:00'),
(3 , 'Projects' , NULL , '10:00:00' , '12:00:00'),
(3 , 'Projects' , NULL , '13:00:00' , '16:30:00'),
(3 , 'FAC community talk' , NULL , '16:30:00' , '17:00:00'),
(4 , 'Projects' , NULL , '09:00:00' , '12:00:00'),
(4 , 'Projects' , NULL , '13:00:00' , '17:00:00'),
(5 , 'How to code review' , NULL , '09:00:00' , '09:15:00'),
(5 , 'Code review' , NULL , '09:15:00' , '10:00:00'),
(5 , 'Respond to issues' , NULL , '10:00:00' , '12:00:00'),
(5 , 'Plan presentations' , NULL , '13:00:00' , '13:15:00'),
(5 , 'presentations' , NULL , '13:15:00' , '14:35:00'),
(5 , 'Coffee Break' , NULL , '14:35:00' , '14:45:00'),
(5 , 'Stop Go Continue' , NULL , '14:45:00' , '15:45:00'),
(5 , 'Team retrospectives' , NULL , '15:45:00' , '16:00:00'),
(5 , 'External speaker or Alumni Project presentation' , NULL , '16:00:00' , '17:00:00');


INSERT INTO suggestions_complaints (user_id, content, type) VALUES
  (1, 'fun time', 'suggestion'),
  (2, 'fix AC', 'complaint');

COMMIT;
