# BITS-SRCD

## Root Path

`https://srcd-temp.herokuapp.com`

Optional data fields enclosed in [  ]

## User Endpoints

### Make new user (first login)

`<root>/user/new`

Expected request type: `POST`

Expected data type: `JSON / key-value pair`

Expected data fields: `name :String , email :String`

Success return code: `HTTP status code 201`

Error return code: `HTTP status code 400`

### Get user (along with their subs)

`<root>/user/me`

Expected request type: `GET`

Expected data type: `JSON / key-value pair`

Expected data fields: `email :String`

Success return code: `HTTP status code 200`

Success return data: `Array of all Submission objects of user`

Error return code: `HTTP status code 400`

## Submission Endpoints

### Make new submission

`<root>/sub/submit`

Expected request type: `POST`

Expected data type: `Encrypted form data`

Expected data fields: `title :String , funding :String , prinInvest :String , email: String , projProp :Single pdf file , endoCert :Single pdf file , revComments :Single pdf file, [coInvest :Array of strings]`

Success return code: `HTTP status code 200`

Error return code: `HTTP status code 500`

### Get documents of a submission

`<root>/sub/:id/:num`

Expected request type: `GET`

Expected data type: `Url parameters`

Expected data fields: `id of Submission, num -> 0 for projProp, 1 for revComments, 2 for endoCert`

Success return code: `HTTP status code 200`

Success return data: `PDF data`

Error return code: `HTTP status code 404/500`