WebServer_REST_API
==================
##54.172.35.180:8080

A repository for the webserver and restful api code

Error codes are located in: ./ErrorList.txt

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
	"user_id":number,
	"session_id":uuid
}
```
On failure:
```javascript
{
	"error_code":number,
	"success":false
}
```

### Logout
#####/api/logout

####POST
A Post request with form with user's email to delete the user's session.

```javascript
{
		"email_id":string,
}
```

**Response Object:**

On successful logout:
```javascript
	Logged out
```

## Users

## Chatrooms

## Location



## User
### /api/users

####GET
A Get Request to this url will return all the users in the DB.
Add '/:session_id' to url

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

## chatroom
### /api/chatroom

####GET
A Get Request to this url will return all the chatrooms in the DB in the radius of the user.
Add '/:session_id' to url

```javascript
{
		"chat_id": integer,
		"Room_Admin": integer,
		"Longitude": number,
		"Latitude": number,
		"Chat_title": string,
		"Chat_Dscrpn": string
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

**Response Object:**

On successful deletion:
```javascript
{}
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
			"Room_id": integer,
			"joined": timestamp
	},
	...
]
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
		"joined": timestamp
}
```

####DELETE
A Delete request with form urlencoded data for all the details for the chatroomuser that will be deleted.

```javascript
{
		"room_id":integer,
		"session_id":uuid
}
```

**Response Object**

On successful delete:
```javascript
{}
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

## chatroomusers
### /api/chatroomusers/user_id/:session_id

####GET
A Get Request to this url will return all the chatroomusers with specific user_id in the DB.
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

##
## Messages
### /api/messages/

####GET
A Get Request to this url will return all the messages in the DB.
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

**Response Object**

On successful post:
```javascript
{
		"Room_id": integer,
		"User_id": integer,
		"Message": string,
		"TimeStamp": timestamp,
		"m_id": integer
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
		"Room_id": integer,
		"User_id": integer,
		"TimeStamp": timestamp,
		"Message": string
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

### /api/messages/room_id/:room_id/:timestamp
####GET
A Get Request to this url will return the messages after a specified timestamp from the specific chatroom in the DB.
Add '/:session_id' to url


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

##
## Session
### /api/session
### Not public

####check_session
A method which takes a Session object, a session_id, and a timestamp and returns if the session has expired and if so, deletes the session.
