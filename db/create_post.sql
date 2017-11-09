INSERT INTO BLOGS 
(userId, body)
values 
($1, $2)
RETURNING *;

-- Creates blog posts 