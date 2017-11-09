UPDATE users
SET
    email = $1,
    state = $2,
    dob = $3,
    username = $4
where id = $5