define(['models/contact', 'views/directory', 'views/addContact'],
    function(Contact, DirectoryView, AddContactView){
		//add routing
    var ContactsRouter = Backbone.Router.extend({
        el: $("#app"),
        routes: {
            '': 'directory',
            'add': 'addContact',
            'edit/:id': 'editContact',
            "filter/:type": "urlFilter"
        },

        initialize: function(){
        	var contacts = [
		        {id:1, name: "Contact 1", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
		        {id:2, name: "Contact 2", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
		        {id:3, name: "Contact 3", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
		        {id:4, name: "Contact 4", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
		        {id:5, name: "Contact 5", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" },
		        {id:6, name: "Contact 6", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "colleague" },
		        {id:7, name: "Contact 7", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "friend" },
		        {id:8, name: "Contact 8", address: "1, a street, a town, a city, AB12 3CD", tel: "0123456789", email: "anemail@me.com", type: "family" }
		    ];
        	this.directoryCollection = new Contact.Collection(contacts);
            direcot = this.directoryCollection;
    	},
        directory: function() {
            router = this;
            this.directory = new DirectoryView({el: this.el, collection: this.directoryCollection, router: router});
        },
        addContact: function(){
            router = this;
            var addOne = new AddContactView({el: this.el, collection: this.directoryCollection, router: router});
        },
        editContact: function(id){
            router = this;
            var addOne = new AddContactView({el: this.el, collection: this.directoryCollection, model: this.directoryCollection.get(id), router: router});
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