BEGIN;

DROP TABLE IF EXISTS workshops CASCADE;

CREATE TABLE workshops(
  id SERIAL PRIMARY KEY,
  day_id INT NOT NULL REFERENCES days(id) ON DELETE CASCADE ON UPDATE CASCADE,
  title VARCHAR(50),
  link VARCHAR,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);



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
(5 , 'External speaker or Alumni Project presentation' , NULL , '16:00:00' , '17:00:00'),
(6, 'Intro to NPM', 'https://github.com/foundersandcoders/npm-introduction', '09:00:00', '09:30:00'),
(6, 'Intro to testing and TDD', 'https://github.com/foundersandcoders/testing-tdd-intro', '09:20:00', '10:00:00'),
(6, 'Tape (TDD) workshop', 'https://github.com/foundersandcoders/fizzbuzz', '10:00:00', '12:00:00'),
(6, 'Roman numerals TDD code-along', 'https://github.com/foundersandcoders/roman-numeral-tdd-codealong', '13:00:00', '15:00:00'),
(6, 'Business development/ community engagement', NULL, '15:00:00', '17:00:00'),
(7, 'Morning challenge - DOM manipulation', 'https://github.com/foundersandcoders/DOM-manipulation-Challenge', '09:00:00', '10:00:00'),
(7, 'Pure functions workshop as introduction to writing testable code :D', 'https://github.com/foundersandcoders/ws-pure-functions-easy-testing', '10:00:00', '12:00:00'),
(7, 'Introduce Project', 'https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-2/project', '13:00:00', '13:30:00'),
(7, 'Research', 'https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-2/research-afternoon.md', '13:30:00', '15:30:00'),
(7, 'Review and Present research topics', NULL, '15:30:00', '16:30:00'),
(7, 'Video: what the heck is the event loop anyway?', 'https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=5s', '16:30:00', '17:00:00'),
(8, 'Morning challenge- traffic light callbacks', 'https://github.com/foundersandcoders/morning-challenge-traffic-lights', '09:00:00', '10:00:00'),
(8, 'Start projects', NULL, '10:00:00', '12:00:00'),
(8, 'Projects', NULL, '13:00:00', '16:00:00'),
(8, 'External speaker', NULL, '16:00:00', '17:00:00'),
(9, 'Projects', NULL, '09:00:00', '12:00:00'),
(9, 'Projects', NULL, '13:00:00', '17:00:00'),
(10, 'Code review', 'https://github.com/foundersandcoders/master-reference/blob/master/coursebook/general/code-review.md', '09:00:00', '10:00:00'),
(10, 'Respond to issues', NULL, '10:00:00', '12:00:00'),
(10, 'Respond to issues', NULL, '10:00:00', '12:00:00'),
(10, 'Cohort Stop Go Continue (retrospective)', NULL, '13:00:00', '14:00:00'),
(10, 'Team retrospectives', NULL, '14:00:00', '14:40:00'),
(10, 'Presentations (20 mins per group)', NULL, '14:40:00', '16:00:00'),
(10, 'External Speaker or Alumni Project Presentation', NULL, '16:00:00', '17:00:00'),
(11, 'Introduction and learning outcomes with week-3 mentors', NULL, '09:00:00', '09:15:00'),
(11, 'Introductory workshop: API basics, HTTP, XMLHttp requests, request-response pattern', 'https://github.com/foundersandcoders/api-workshop', '09:15:00', '11:00:00'),
(11, 'XHR workshop', 'https://github.com/foundersandcoders/xhr-workshop', '11:00:00', '12:00:00'),
(11, 'Afternoon workshop: making API requests in the browser, callbacks, working with JSON, chaining API requests', 'https://github.com/emilyb7/workshop-APIs', '13:00:00', '15:00:00'),
(11, 'Biz Dev / Community Engagement', NULL, '15:00:00', '17:00:00'),
(12, 'Flexbox Froggy', 'http://flexboxfroggy.com/', '09:00:00', '09:45:00'),
(12, 'Flexbox Dice Morning Challenge', 'https://github.com/smarthutza/flexbox-workshop', '09:45:00', '10:45:00'),
(12, 'Software Architecture Workshop', 'https://github.com/foundersandcoders/Workshop-Software-Architecture-Design', '10:45:00', '12:00:00'),
(12, 'Software Design Workshop', 'https://github.com/foundersandcoders/ws-software-design-js', '13:00:00', '16:00:00'),
(12, 'Introduce Projects & Start Planning Architecture', 'https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-3/project.md', '16:15:00', '17:00:00'),
(13, 'Waterfall morning challenge', 'https://github.com/foundersandcoders/mc-waterfall-chaser', '09:00:00', '10:00:00'),
(13, 'Project Planning', NULL, '10:00:00', '12:00:00'),
(13, 'Work on Projects', NULL, '13:00:00', '17:00:00'),
(14, 'Projects', NULL, '09:00:00', '12:00:00'),
(14, 'Projects (stop work at 18:00!)', NULL, '12:00:00', '17:00:00'),
(15, 'Project code review', NULL, '09:00:00', '10:00:00'),
(15, 'Respond to issues', NULL, '10:00:00', '12:00:00'),
(15, 'Cohort Stop Go Continue (retrospective)', 'https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-3/retrospectives.md#cohort-retrospective', '13:00:00', '14:00:00'),
(15, 'Team retrospectives', 'https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-3/retrospectives.md#team-retrospective', '14:00:00', '14:40:00'),
(15, 'Presentations (20 mins per group)', NULL, '14:40:00', '16:00:00'),
(15, 'External Speaker or Alumni Project Presentation', NULL, '16:00:00', '17:00:00'),

-- students (1-4)
-- mentors (8-9)
-- admin (11)
-- cf (10)
-- cohort1 weeks (1-18)
-- cohort2 weeks (19-35)
-- cohort1 days (1-89)
-- cohort2 days (90-119)
INSERT INTO suggestions_complaints (user_id, content, type) VALUES
  (1, 'fun time', 'suggestion'),
  (2, 'fix AC', 'complaint');

COMMIT;
