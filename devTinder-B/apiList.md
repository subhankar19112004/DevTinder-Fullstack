## User/auth Router
- POST /signup
- POST /signin
- POST /logout


## Profile Router
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId


## Connection request router
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## Feed Router
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed/ - Gets you the profiles of other users on platform


Status: ignore, interested, accepted, rejected


pagination: 
- /feed?page=1&limit=10 => 1 - 10 => .skip(0).limit(10)

- /feed?page=1&limit=10 => 11 - 20 => .skip(0).limit(10)

- /feed?page=1&limit=10 => 21 - 30 => .skip(0).limit(10)

- /feed?page=1&limit=10 => 31 - 40 => .skip(0).limit(10)

- skip = (page -1) * limit
