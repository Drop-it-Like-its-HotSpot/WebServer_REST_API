//Creating a Model for the User Table
module.export = function(bookshelf)
{
	return bookshelf.Model.extend({
		tableName:'Users',
		idAttribute: 'User_id'
	});
};