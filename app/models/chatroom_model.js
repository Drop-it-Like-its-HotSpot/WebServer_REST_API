//Creating a Model for the ChatRoom Table
module.exports = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'chat_room',
		idAttribute: 'chat_id'
	});
};