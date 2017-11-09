INSERT INTO USERS 
(email, auth_id)
VALUES
($1, $2)
RETURNING *;
