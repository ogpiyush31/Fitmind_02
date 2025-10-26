-- You may want to insert a sample user first to satisfy the foreign key constraint
-- Insert a secure demo user (password = 'demo1234')
INSERT INTO users (username, email, password) VALUES
('demo_user', 'demo@example.com', '$2a$10$ZpVFOJUtF4IjvHJxK8OncOEd8LU8ACcTgHFAvQqFxvCuvMB4W5XLu');

-- ✅ Insert mood entries for user_id = 1 (now includes journal)
INSERT INTO moods (user_id, date, mood, notes, journal, sentiment, subjectivity) VALUES
(1, '2023-10-01 00:00:00', 'Happy', 'Had a great day at work!', 'I feel grateful for how things are going.', 3, 0.5),
(1, '2023-10-02 00:00:00', 'Sad', 'Feeling a bit down today.', 'I’m trying to stay hopeful.', -2, -0.3),
(1, '2023-10-03 00:00:00', 'Anxious', 'A lot on my mind.', 'I need to organize my thoughts better.', -1, 0.1),
(1, '2023-10-04 00:00:00', 'Content', 'Enjoyed a nice evening walk.', 'The fresh air helped clear my head.', 2, 0.4),
(1, '2023-10-05 00:00:00', 'Excited', 'Looking forward to the weekend!', 'Can’t wait to explore new places.', 4, 0.6),
(1, '2023-10-06 00:00:00', 'Stressed', 'Work deadlines are approaching.', 'I should plan my time better.', -3, -0.5),
(1, '2023-10-07 00:00:00', 'Relaxed', 'Spent the day reading and unwinding.', 'Reading gives me peace.', 3, 0.7);


