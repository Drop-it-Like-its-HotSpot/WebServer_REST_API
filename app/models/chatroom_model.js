//Creating a Model for the ChatRoom Table
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'Chat_Room',
		idAttribute: 'chat_id'
	});
};