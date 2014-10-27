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
		"user_id":int,
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

####POST
A Post request with a JSON Object of all the details to update a specific user in the DB.

<hr>
##
## Messages
### /api/messages/

####GET
A Get Request to this url will return all the messages in the DB.

####POST
A Post request with a JSON Object of all the details for a user will create a user in the DB.

```javascript
{
		"room_id":int,
		"user_id":int,
		"message":string
}
```
##Specific Message
### /api/messages/:m_id
####GET
A Get Request to this url will return the specific message in the DB.

##All Messages Specific Chatroom
### /api/messages/room_id/:room_id
####GET
A Get Request to this url will return the specific message in the DB.
