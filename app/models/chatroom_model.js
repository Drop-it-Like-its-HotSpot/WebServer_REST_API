//Creating a Model for the ChatRoom Table
module.export = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'Chat_Room',
		idAttribute: 'chat_id'
	});
};