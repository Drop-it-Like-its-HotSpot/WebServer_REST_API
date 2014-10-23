//Creating a Model for the Chat_Room_Users Table	
module.export = 
{
		"tableName":'Chat_Room_Users',
		"Room_id": function(){
			return this.hasOne(ChatRoom,["chat_id"])
		},
		"User_id": function(){
			return this.hasOne(Users,["User_id"])
		}
}