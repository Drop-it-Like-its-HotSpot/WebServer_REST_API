WebServer_REST_API
==================

A repository for the webserver and restful api code

## User
### /api/users

####GET
A Get Request to this url will return all the users in the DB.
Add '/:session_id' to url

####POST
A Post request with a JSON Object of all the details for a user will create a user in the DB.

```javascript
{
		"email_id":string,
		"latitude":number,
		"longitude":number,
		"displayname":string,
		"radius":number
}
```

##Specific User
### /api/users/:user_id
####GET
A Get Request to this url will return the specific user in the DB.
Add '/:session_id' to url

####PUT
A Put request with a JSON Object of all the details to update a specific user in the DB.
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

## chatroom
### /api/chatroom

####GET
A Get Request to this url will return all the chatrooms in the DB.
Add '/:session_id' to url

####POST
de Post request with a JSON Object of all the details for a chatroom will create a chatroom in the DB.

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
A Put request with a JSON Object of all the details to update a specific chatroom in the DB.

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
A Post request with a JSON Object of all the details for a chatroomuser will create a chatroomuser in the DB.

```javascript
{
		"room_id":integer,
		"user_id":integer,
		"session_id":uuid
}
```


##
## Messages
### /api/messages/

####GET
A Get Request to this url will return all the messages in the DB.
Add '/:session_id' to url

####POST
A Post request with a JSON Object of all the details for a user will create a user in the DB.

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
A Get Request to this url will return the specific message in the DB.
Add '/:session_id' to url


##
## Login
### /api/login

####POST
A Post request with a JSON Object of user's email and password to create a new session for the user.

```javascript
{
		"email_id":string,
		"password":string
}
```

##
## Session
### /api/session
### Not public

####check_session
A method which takes a Session object, a session_id, and a timestamp and returns if the session has expired and if so, deletes the session.