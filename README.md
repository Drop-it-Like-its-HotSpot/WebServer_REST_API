WebServer_REST_API
==================
##54.172.35.180:8080
##00000000-0000-0000-0000-000000000001


A repository for the webserver and restful api code

## User
### /api/users

####GET
A Get Request to this url will return all the users in the DB.
Add '/:session_id' to url

####POST
A Post request with form urlencoded data for all the details for a user will create a user in the DB.

```javascript
{
		"email_id":string,
		"password":string,
		"latitude":number,
		"longitude":number,
		"displayname":string,
		"radius":number
}
```
**Response Object:**

On Successful User Creation:
```javascript
{
		"Email_id":string,
		"latitude":number,
		"longitude":number,
		"DisplayName":string,
		"radius":number,
		"User_id":number,
		"success":true
}
```
On Failure of  User Creation:
```javascript
{
		"success":false,
}
```

##Specific User
### /api/users/:user_id
####GET
A Get Request to this url will return the specific user in the DB.
Add '/:session_id' to url

####PUT
A Put request with form urlencoded data for all the details to update a specific user in the DB.
```javascript
{
		"email_id":string,
		"latitude":number,
		"longitude":number,
		"displayname":string,
		"radius":number,
		"session_id":uuid
}
```

####DELETE
A Delete request to delete a specific user

```javascript
{
		"session_id":uuid
}
```

##Update Location
### /api/updatelocation
####POST
A Put request with form urlencoded data for session_id, latitude, and longitude to update a the user in the DB.
```javascript
{
		"latitude":number,
		"longitude":number,
		"session_id":uuid
}
```

## Login
####POST
A Post request with form urlencoded data for with the email and password of the user that wants to login.
```javascript
{
		"email_id":string,
		"password":string
}
```
**Response Object:**

On successful login:
```javascript
{
		"success":true,
		"user_id":number,
		"session_id":uuid
}
```
On failure:
```javascript
{
		"success":false
}
```

## chatroom
### /api/chatroom

####GET
A Get Request to this url will return all the chatrooms in the DB.
Add '/:session_id' to url

####POST
de Post request with form urlencoded data for all the details for a chatroom will create a chatroom in the DB.

```javascript
{
		"room_admin":integer,
		"latitude":number,
		"longitude":number,
		"chat_title":string,
		"chat_dscrpn":string,
		"session_id":uuid
}
```

##Specific chatroom
### /api/chatroom/:chatroom_id
####GET
A Get Request to this url will return the specific chatroom in the DB.
Add '/:session_id' to url

####PUT
A Put request with form urlencoded data for all the details to update a specific chatroom in the DB.

```javascript
{
		"room_admin":integer,
		"latitude":number,
		"longitude":number,
		"chat_title":string,
		"chat_dscrpn":string,
		"session_id":uuid
}
```

####DELETE
A Delete request to delete a specific chatroom

```javascript
{
		"session_id":uuid
}
```


## chatroomusers
### /api/chatroomusers

####GET
A Get Request to this url will return all the chatroomusers in the DB.
Add '/:session_id' to url

####POST
A Post request with form urlencoded data for all the details for a chatroomuser will create a chatroomuser in the DB.

```javascript
{
		"room_id":integer,
		"user_id":integer,
		"session_id":uuid
}
```

## chatroomusers
### /api/chatroomusers/room_id/:roomid

####GET
A Get Request to this url will return all the chatroomusers with specific room_id in the DB.
Add '/:session_id' to url

## chatroomusers
### /api/chatroomusers/user_id/:session_id

####GET
A Get Request to this url will return all the chatroomusers with specific user_id in the DB.
Add '/:session_id' to url

##
## Messages
### /api/messages/

####GET
A Get Request to this url will return all the messages in the DB.
Add '/:session_id' to url

####POST
A Post request with form urlencoded data for all the details for a user will create a user in the DB.

```javascript
{
		"room_id":int,
		"user_id":int,
		"message":string,
		"session_id":uuid
}
```

##Specific Message
### /api/messages/:m_id
####GET
A Get Request to this url will return the specific message in the DB.
Add '/:session_id' to url

##All Messages Specific Chatroom
### /api/messages/room_id/:room_id
####GET
A Get Request to this url will return the messages from the specific chatroom in the DB.
Add '/:session_id' to url

##All Messages Specific User
### /api/messages/user_id/:user_id
####GET
A Get Request to this url will return the messages from specific user in the DB.
Add '/:session_id' to url

##
## Login
### /api/login

####POST
A Post request with form urlencoded data for the user's email and password to create a new session for the user.

```javascript
{
		"email_id":string,
		"password":string
}
```

##
## Logout
### /api/logout

####POST
A Post request with form with user's email to delete the user's session.

```javascript
{
		"email_id":string,
}
```

##
## Session
### /api/session
### Not public

####check_session
A method which takes a Session object, a session_id, and a timestamp and returns if the session has expired and if so, deletes the session.
