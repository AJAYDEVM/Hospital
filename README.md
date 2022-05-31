# how to run

step 1 : npm i
step 2 : add env file(.env)
step 3 : add variables in env for

    PORT=4000
    DB_CONNECT //db url
    TOKEN_SECRET // token secret 

step 4: npm start



# curl user register

curl --location --request POST 'localhost:4000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"hai",
    "email":"test2@gmail.com",
    "password":"111111",
    "phone":"0000000000",
    "user_type":"new",
    "status":"none"
}'

# curl loggin

curl --location --request POST 'localhost:4000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"test@gmail.com",
    "password":"111111"
}'

# curl profile

curl --location --request GET 'localhost:4000/user/profile' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk1OWQ3ZjhkOTQ3MWE1MTA1ZDJjYzMiLCJpYXQiOjE2NTM5NzM2MzZ9.uHYLs4CkqpyOUasbXESMdZb32ekdZCHMezNdm1d0gA0'

# curl register doctor

curl --location --request POST 'localhost:4000/doctor/register-doctor' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Dr sandeep",
    "fee":200,
    "status":"none"
}'

# curl doctors list 

curl --location --request GET 'localhost:4000/doctor/doctor-list'

# curl take appoinment

curl --location --request POST 'localhost:4000/appoinment/take-appoinment' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk1OWQ3ZjhkOTQ3MWE1MTA1ZDJjYzMiLCJpYXQiOjE2NTM5NzM2MzZ9.uHYLs4CkqpyOUasbXESMdZb32ekdZCHMezNdm1d0gA0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "doctor_id": "6295c53ae41cf8bdec4135e0",
    "appointment_date": "1/06/2022",
    "appointment_slot": "11 AM"
}'

# curl patients appoinment list

curl --location --request GET 'localhost:4000/user/appoinments' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk1OWQ3ZjhkOTQ3MWE1MTA1ZDJjYzMiLCJpYXQiOjE2NTM5NzM2MzZ9.uHYLs4CkqpyOUasbXESMdZb32ekdZCHMezNdm1d0gA0'

# curl doctor patients list

curl --location --request GET 'localhost:4000/doctor/patient-list/6295c53ae41cf8bdec4135e0'

# curl dr approve request

curl --location --request PUT 'localhost:4000/doctor/update-appoinment' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "6295c7d1538b254ce5f0d7ac",
    "approval_status":"approved"
}'


# curl update payment

curl --location --request PUT 'localhost:4000/user/update-payment' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk1OWQ3ZjhkOTQ3MWE1MTA1ZDJjYzMiLCJpYXQiOjE2NTM5NzM2MzZ9.uHYLs4CkqpyOUasbXESMdZb32ekdZCHMezNdm1d0gA0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id":"6295c7d1538b254ce5f0d7ac",
    "payment_status":"done"
}'
