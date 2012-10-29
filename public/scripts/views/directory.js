define(['views/contact', 'models/contact'], function(ContactView, Contact){
    var View = Backbone.View.extend({
        //el: $("#contacts"),

        initialize: function () {
            this.render();
            this.contacts = this.collection.models;
            this.$el.find("#filter").append(this.createSelect());

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderContact, this);
            this.collection.on("remove", this.removeContact, this);
        },

        render: function () {
            this.$el.find("article").remove();

            _.each(this.collection.models, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item,
                collection: this.collection,
                router: this.options.router
            });
            this.$el.append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("type"), false, function (type) {
                return type.toLowerCase();
            });
        },

        createSelect: function () {
            var filter = this.$el.find("#filter"),
                select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item.toLowerCase(),
                    text: item.toLowerCase()
                }).appendTo(select);
            });

            return select;
        },

        //add ui events
        events: {
            "change #filter select": "setFilter",
            "click #add": "addContact",
            "click #showForm": "showForm"
        },

        //Set filter property and fire change event
        setFilter: function (e) {
            this.filterType = e.currentTarget.value;
            this.trigger("change:filterType");
        },

        //filter the view
        filterByType: function () {
            if (this.filterType === "all") {
                this.collection.reset(this.contacts);
                contactsRouter.navigate("filter/all");
            } else {
                this.collection.reset(this.contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type").toLowerCase() === filterType;
                    });

                this.collection.reset(filtered);

                this.options.router.navigate("filter/" + filterType);
            }
        },

        showForm: function () {
            this.$el.find("#addContact").slideToggle();
        },
        addContact: function (e) {
            e.preventDefault();

            var formData = {};
            $("#addContact").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });

            //update data store

            this.contacts.push(new Contact.Model(formData));
            //re-render select if new type is unknown
            
            if (_.indexOf(this.getTypes(), formData.type) === -1) {
                this.collection.add(new Contact.Model(formData));
                this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
            } else {
                this.collection.add(new Contact.Model(formData));
            }
        },
        removeContact: function (removedModel) {
            var removed = removedModel.attributes;

            //if model acquired default photo property, remove it
            if (removed.photo === "/img/placeholder.png") {
                delete removed.photo;
            }

            //remove from contacts array
            contacts = this.contacts;
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, removed)) {
                    contacts.splice(_.indexOf(contacts, contact), 1);
                }
            });
            this.contacts = contacts;
        }
    });
    return View;
})