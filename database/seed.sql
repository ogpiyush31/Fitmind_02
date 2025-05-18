-- You may want to insert a sample user first to satisfy the foreign key constraint
INSERT INTO users (username, email, password) VALUES
('demo_user', 'demo@example.com', 'hashedpassword123'); -- Replace with actual hashed password

-- Insert mood entries for user_id = 1
INSERT INTO moods (user_id, date, mood, notes, sentiment, subjectivity) VALUES
(1, '2023-10-01 00:00:00', 'Happy', 'Had a great day at work!', 3, 0.5),
(1, '2023-10-02 00:00:00', 'Sad', 'Feeling a bit down today.', -2, -0.3),
(1, '2023-10-03 00:00:00', 'Anxious', 'A lot on my mind.', -1, 0.1),
(1, '2023-10-04 00:00:00', 'Content', 'Enjoyed a nice evening walk.', 2, 0.4),
(1, '2023-10-05 00:00:00', 'Excited', 'Looking forward to the weekend!', 4, 0.6),
(1, '2023-10-06 00:00:00', 'Stressed', 'Work deadlines are approaching.', -3, -0.5),
(1, '2023-10-07 00:00:00', 'Relaxed', 'Spent the day reading and unwinding.', 3, 0.7);

