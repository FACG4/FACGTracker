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
  github_username VARCHAR(30) UNIQUE,
  avatar VARCHAR
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
  ('Ahmed', 'Shatat', 'ahmed_m_sh@hotmail.com', 'SEO Master', '0599944633', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'student', 'shatat_m', 1),
  ('Farah', 'Zaqot', 'a.zaqot@hotmail.com', 'Great man', '0599944666', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'student', 'zfarah', 1),
  ('Ahmed', 'Ajour', 'a.ajour@gmail.com', 'great CF', '0599123456', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'cf', 'ahmedaj', NULL),
  ('Sultan', 'Asi', 'a.sultan@gmail.com', 'great mentor', '0599223456', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'mentor', 'sultanasi', NULL),
  ('Ghada', 'Ibrahim', 'a.ghada@gmail.com', 'great admin', '0599123556', '$2b$10$CCSi5wCZTF5bzspFKvcveeUANKhYuQDaVFXwLZEPMG7s7SH98/iK2', 'admin', 'ghadaibrahim', NULL),
  (NULL, NULL, 'abdalsamad.y.m@gamil.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  (NULL, NULL, 'anoos.hanii@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1),
  (NULL, NULL, 'blsam.2332016@gmail.com', NULL, NULL, NULL, DEFAULT, NULL, 1);

INSERT INTO weeks(week_no, name, cohort_id) VALUES
  (1, 'Toolkit', 1),
  (2, 'Testing', 1),
  (3, 'APIs', 1),
  (4, 'Node.js 1/2', 1),
  (5, 'Node.js 2/2', 1),
  (6, 'PostgreSQL', 1),
  (7, 'Authentication', 1),
  (8, 'Express', 1),
  (1, 'Toolkit', 2),
  (2, 'Testing', 2),
  (3, 'APIs', 2),
  (4, 'Node.js 1/2', 2),
  (5, 'Node.js 2/2', 2),
  (6, 'PostgreSQL', 2),
  (7, 'Authentication', 2),
  (8, 'Express', 2);

INSERT INTO days (week_id, day_no, date) VALUES
  (1, 1, '2018-05-20'),
  (1, 2, '2018-05-21'),
  (1, 3, '2018-05-22'),
  (1, 4, '2018-05-23'),
  (1, 5, '2018-05-24'),
  (2, 1, '2018-05-27'),
  (2, 2, '2018-05-28'),
  (2, 3, '2018-05-29'),
  (2, 4, '2018-05-30'),
  (2, 5, '2018-05-31'),
  (3, 1, '2018-06-03'),
  (3, 2, '2018-05-04'),
  (3, 3, '2018-05-05'),
  (3, 4, '2018-05-06'),
  (3, 5, '2018-05-07');

INSERT INTO attendance(user_id, clock_in, clock_out, day_id) VALUES
  (1, '09:00', '17:00', 1),
  (2, '09:00', '14:00', 1),
  (1, '12:00', '17:00', 2),
  (2, '11:00', '12:00', 2);

INSERT INTO flags(user_id, type) VALUES
  (1, 'attendance'),
  (1, 'being on time'),
  (1, 'attitude towards teemwork'),
  (2, 'attitude towards learning');

INSERT INTO feedbacks (user_id, content) VALUES
  (1, 'you are doing great but you should stop your bad attitude towards your teamwork, we all have different thoughts and we should bear with each other'),
  (1, 'you have been late for more than one day, please come in early');

INSERT INTO week_mentors (user_id, week_id) VALUES
  (4, 1),
  (4, 2),
  (4, 3);

-- insert into workshops

INSERT INTO suggestions_complaints (user_id, content, type) VALUES
  (1, 'fun time', 'suggestion'),
  (2, 'fix AC', 'complaint');

COMMIT;