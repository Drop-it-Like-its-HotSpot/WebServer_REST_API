//Creating a Model for the Chat_Room_Users Table	
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		"tableName":'Chat_Room_Users',
		"Room_id": function(){
			return this.hasOne(ChatRoom,["chat_id"])
		},
		"User_id": function(){
			return this.hasOne(Users,["User_id"])
		}
	});
}