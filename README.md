WebServer_REST_API
==================
##54.172.35.180:8080

A repository for the webserver and restful api code

##Errors
codes are located in: app/routes/error/ErrorList.json

####Error format:
```json
{
		"success":false,
		"error_code":string,
		"info":string
}
```


## Logging

### Login
#####/api/login

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
		"user_id":int,
		"session_id":uuid
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### Logout
#####/api/logout

####POST
A Post request with user's email to delete the user's session.

```javascript
{
		"email_id":string,
}
```

**Response Object:**

On successful logout:
```javascript
{
		"success":true,
		"message":string
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

## Users
### /api/users

####GET
A Get Request to this url will return the user's information from the DB.
Add '/:session_id' to url

**Response Object:**

On successful get:
```javascript
{
		"success":true,
		"Email_id":string,
		"Latitude":number,
		"Longitude":number,
		"Displayname":string,
		"User_id":number,
		"Radius":number
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

####POST
A Post request with form urlencoded data for all the details for a user will create a new user in the DB.

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

On successful post:
```javascript
{
		"Email_id":string,
		"Latitude":number,
		"Longitude":number,
		"DisplayName":string,
		"Radius":number,
		"User_id":number,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##Specific User
### /api/users/:user_id
####GET
A Get Request to this url will return the specific user in the DB.
Add '/:session_id' to url

**Response Object:**

On successful get:
```javascript
{
		"Email_id":string,
		"Latitude":number,
		"Longitude":number,
		"DisplayName":string,
		"Radius":number,
		"User_id":number,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/users/put/:user_id
####PUT
A Post request with form urlencoded data for all the details to update a specific user in the DB.
```javascript
{
		"email_id":string, 		<-- not required
		"latitude":number, 		<-- not required
		"longitude":number, 	<-- not required
		"displayname":string, 	<-- not required
		"radius":number, 		<-- not required
		"session_id":uuid
}
```

**Response Object:**

On successful put:
```javascript
{
		"Email_id":string, 		<-- if in input
		"Latitude":number,		<-- if in input
		"Longitude":number,		<-- if in input
		"DisplayName":string,	<-- if in input
		"Radius":number,		<-- if in input
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/users/delete/:user_id
####DELETE
A Post request to delete a specific user from the DB.
```javascript
{
		"session_id":uuid
}
```

**Response Object:**

On successful delete:
```javascript
{
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```


##Update Location
### /api/updatelocation
####POST
A Post request with form urlencoded data for session_id, latitude, and longitude to update a the user in the DB.
```javascript
{
		"latitude":number,
		"longitude":number,
		"session_id":uuid
}
```

**Response Object:**

On successful put:
```javascript
{
		"Latitude":number,
		"Longitude":number,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

## chatroom
### /api/chatroom

####GET
A Get Request to this url will return all the chatrooms in the DB in the radius of the user.
Add '/:session_id' to url

**Response Object:**

On successful get:
```javascript
[
	{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

####POST
Post request with form urlencoded data for all the details for a chatroom will create a chatroom in the DB.

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

**Response Object:**

On successful post:
```javascript
{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##Specific chatroom
### /api/chatroom/:chatroom_id
####GET
A Get Request to this url will return the specific chatroom in the DB.
Add '/:session_id' to url

**Response Object:**

On successful get:
```javascript
{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/chatroom/put/:chatroom_id
####PUT
A Post request with form urlencoded data for all the details to update a specific chatroom in the DB.

```javascript
{
		"room_admin":integer,	<-- not required
		"latitude":number,		<-- not required
		"longitude":number,		<-- not required
		"chat_title":string,	<-- not required
		"chat_dscrpn":string,	<-- not required
		"session_id":uuid
}
```

**Response Object:**

On successful put:
```javascript
{
		"Room_Admin": integer,	<-- if in input
		"Longitude": number,	<-- if in input
		"Latitude": number,		<-- if in input
		"Chat_title": string,	<-- if in input
		"Chat_Dscrpn": string,	<-- if in input
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/chatroom/delete/:chatroom_id
####DELETE
A Post request to delete a specific chatroom

```javascript
{
		"session_id":uuid
}
```

**Response Object:**

On successful delete:
```javascript
{
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##Chatrooms in a specific radius
### /api/chatroom/radius/:radius
####GET
A Get Request to this url will return the Chatrooms in a specific radius in the DB.
Add '/:session_id' to url

**Response Object:**

On successful get:
```javascript
[
	{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##Chatrooms with specific admin
### /api/chatroom/admin/
####GET
A Get Request to this url will return the Chatrooms that the user is admin of.
Add '/:session_id' to url

**Response Object:**

On successful get:
```javascript
[
	{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

## chatroomusers
### /api/chatroomusers

####GET
A Get Request to this url will return all the chatroomusers in the DB.
Add '/:session_id' to url

**Response Object**

On successful get:
```javascript
[
	{
		"User_id": integer,
		"Room_id": integer,
		"joined": timestamp
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

####POST
A Post request with form urlencoded data for all the details for a chatroomuser will create a chatroomuser in the DB.

```javascript
{
		"room_id":integer,
		"session_id":uuid
}
```

**Response Object**

On successful post:
```javascript
{
		"User_id": integer,
		"Room_id": integer,
		"joined": timestamp,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/chatroomusers/delete/
####DELETE
A Post request with form urlencoded data for all the details for the chatroomuser that will be deleted.

```javascript
{
		"room_id":integer,
		"session_id":uuid
}
```

**Response Object**

On successful delete:
```javascript
{
	"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

## chatroomusers
### /api/chatroomusers/room_id/:roomid

####GET
A Get Request to this url will return all the chatroomusers with specific room_id in the DB.
Add '/:session_id' to url

**Response Object**

On successful get:
```javascript
[
	{
		"Room_id": integer,
		"User_id": integer,
		"joined": timestamp
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

# chatroomusers
## /api/chatroomusers/user_id/:session_id
###JOINED CHATROOMS OF A USER
####GET
A Get Request to this url will return all the chatroomusers with specific user_id in the DB.
Add '/:session_id' to url

**Response Object**

On successful get:(returns the chatrooms that a user is in)
```javascript
[
	{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##
## Messages
### /api/messages/

####POST
A Post request with form urlencoded data for all the details to create a message in the DB.

```javascript
{
		"room_id":int,
		"user_id":int,
		"message":string,
		"session_id":uuid
}
```

**Response Object**

On successful post:
```javascript
{
		"Room_id": integer,
		"User_id": integer,
		"Message": string,
		"TimeStamp": timestamp,
		"m_id": integer,
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##Specific Message
### /api/messages/:m_id
####GET
A Get Request to this url will return the specific message in the DB.
Add '/:session_id' to url

**Response Object**

On successful get:
```javascript
{
		"m_id": integer,
		"DisplayName": String,
		"Room_id": integer,
		"User_id": integer,
		"TimeStamp": timestamp,
		"Message": String,
		"session":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/messages/put/:m_id
####PUT
A Post request with form urlencoded data for all the details to update a specific message in the DB.

```javascript
{
		"room_id":int,		<-- not required
		"user_id":int,		<-- not required
		"message":string,	<-- not required
		"session_id":uuid
}
```

**Response Object**

On successful put:
```javascript
{
		"Room_id": integer, <-- if in input
		"User_id": integer,	<-- if in input
		"Message": string,	<-- if in input
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

### /api/messages/delete/:m_id
####DELETE
A Post request with form urlencoded data for all the details to delete a specific message in the DB.

```javascript
{
		"session_id":uuid
}
```

**Response Object**

On successful delete:
```javascript
{
		"success":true
}
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```


##All Messages Specific Chatroom
### /api/messages/room_id/:room_id
####GET
A Get Request to this url will return the messages posted in the specific chatroom in the DB since the user has entered the chat.
Add '/:session_id' to url

**Response Object**

On successful get:
```javascript
[
	{
		"m_id": integer,
		"Room_id": integer,
		"User_id": integer,
		"TimeStamp": timestamp,
		"Message": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```


### /api/messages/room_id/:room_id/:timestamp
####GET
A Get Request to this url will return the messages after a specified timestamp from the specific chatroom in the DB.
Add '/:session_id' to url

**Response Object**

On successful get:
```javascript
[
	{
		"m_id": integer,
		"Room_id": integer,
		"User_id": integer,
		"TimeStamp": timestamp,
		"Message": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##All Messages Specific User
### /api/messages/user_id/:user_id
####GET
A Get Request to this url will return the messages from specific user in the DB.
Add '/:session_id' to url

**Response Object**

On successful get:
```javascript
[
	{
		"m_id": integer,
		"Room_id": integer,
		"User_id": integer,
		"TimeStamp": timestamp,
		"Message": string
	},
	...
]
```
On failure:
```javascript
{
		"error_code":int,
		"info":string,
		"success":false
}
```

##
## Session
### /api/session
### Not public

####check_session
A method which takes a Session object, a session_id, and a timestamp and returns if the session has expired and if so, deletes the session.
