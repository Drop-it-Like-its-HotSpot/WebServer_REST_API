//Creating a Model for the Session Table
module.exports = function(bookshelf,Users)
{
    return bookshelf.Model.extend({
        tableName:'session',
        idAttribute: null,
        "hasTimestamps":["timestamp"],
        "User_id": function(){
            return this.hasOne(Users,["User_id"])
        }
    });
};