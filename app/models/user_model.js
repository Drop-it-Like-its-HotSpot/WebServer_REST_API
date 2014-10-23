module.export = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'Users',
		idAttribute: 'User_id'
	});
}