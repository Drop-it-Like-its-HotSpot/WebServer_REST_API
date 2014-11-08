//Creating a Model for the gcm Table
module.exports = function(bookshelf, Users)
{
	return bookshelf.Model.extend({
		tableName:'gcm',
		idAttribute: 'User_id',
		"User_id": function(){
            return this.hasOne(Users,["User_id"])
        }
	});
};