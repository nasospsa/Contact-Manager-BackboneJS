define([], function(){
	//define product model
    var Contact = Backbone.Model.extend({
        defaults: {
            photo: "img/placeholder.png",
            name: "",
            address: "",
            tel: "",
            email: "",
            type: ""
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