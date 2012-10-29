define(['models/contact', 'views/directory'],
    function(Contact, DirectoryView){
		//add routing
    var ContactsRouter = Backbone.Router.extend({
        el: $("#contacts"),
        routes: {
            '': 'directory',
            //"filter/:type": "urlFilter"
        },
        initialize: function(){
        	var contacts = [
                { name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
                { name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
                { name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
                { name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
                { name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
                { name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
                { name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
                { name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" }
            ];
        	this.directoryCollection = new Contact.Collection(contacts);
            direcot = this.directoryCollection;
    	},
        directory: function() {
            router = this;
            this.directory = new DirectoryView({el: this.el, collection: this.directoryCollection, router: router});
        },
        urlFilter: function (type) {
            this.directory.filterType = type;
            this.directory.trigger("change:filterType");
        }
    });

    var contactsRouter = new ContactsRouter();

    //start history service
    Backbone.history.start();
	//console.log('loaded everythin');
});