define(['backbone'], function(){
	//define product model
    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "img/placeholder.png"
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact,
    });
    return {
    	Model: Contact,
    	Collection: Directory
    };
});