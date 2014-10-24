//Creating a Model for the Messages Table
module.exports = function(bookshelf)
{
		return bookshelf.Model.extend({
			"tableName":'Messages',
			"idAttribute": 'm_id',
			"hasTimestamps":["TimeStamp"],
			"Room_id": function(){
				return this.hasOne(ChatRoom,["chat_id"])
			},
			"User_id": function(){
				return this.hasOne(Users,["User_id"])
			}
		});
};