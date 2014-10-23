//Creating a Model for the Messages Table
module.exports = 
{
		"tableName":'Chat_Room_Users',
		"idAttribute": 'm_id',
		"Room_id": function(){
			return this.hasOne(ChatRoom,["chat_id"])
		},
		"User_id": function(){
			return this.hasOne(Users,["User_id"])
		}
};