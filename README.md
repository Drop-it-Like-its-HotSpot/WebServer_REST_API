WebServer_REST_API
==================

A repository for the webserver and restful api code

## User
### /api/users

####GET
A Get Request to this url will return all the users in the DB.

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

####PUT
A Put request with a JSON Object of all the details to update a specific user in the DB.
```javascript
{
		"email_id":string,
		"latitude":number,
		"longitude":number,
		"displayname":string,
		"radius":number
}
```

####DELETE
A Delete request to delete a specific user


## chatroom
### /api/chatroom

####GET
A Get Request to this url will return all the chatrooms in the DB.

####POST
A Post request with a JSON Object of all the details for a chatroom will create a chatroom in the DB.

```javascript
{
		"room_admin":integer,
		"latitude":number,
		"longitude":number,
		"chat_title":string,
		"chat_dscrpn":string
}
```

##Specific chatroom
### /api/chatroom/:chatroom_id
####GET
A Get Request to this url will return the specific chatroom in the DB.

####PUT
A Put request with a JSON Object of all the details to update a specific chatroom in the DB.
```javascript
{
		"room_admin":integer,
		"latitude":number,
		"longitude":number,
		"chat_title":string,
		"chat_dscrpn":string
}
```

####DELETE
A Delete request to delete a specific chatroom


## chatroomusers
### /api/chatroomusers

####GET
A Get Request to this url will return all the chatroomusers in the DB.

####POST
A Post request with a JSON Object of all the details for a chatroomuser will create a chatroomuser in the DB.

```javascript
{
		"room_id":integer,
		"user_id":integer
}
```