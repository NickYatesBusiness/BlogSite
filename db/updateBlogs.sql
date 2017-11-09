UPDATE blogs
SET body = $3
where userId = $1 and id = $2