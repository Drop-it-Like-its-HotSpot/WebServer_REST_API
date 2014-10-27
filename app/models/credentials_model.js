//Creating a Model for the Credentials Table
module.exports = function(bookshelf,Users)
{
    return bookshelf.Model.extend({
        tableName:'credentials',
        idAttribute: null,
        "User_id": function(){
            return this.hasOne(Users,["User_id"])
        }
    });
};