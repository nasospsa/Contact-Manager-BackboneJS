define(['views/contact'], function(ContactView){
    var View = Backbone.View.extend({
        //el: $("#contacts"),
        template: _.template($("#directoryTemplate").html()),

        initialize: function () {
            //this.collection = new Directory(contacts);
            this.contacts = this.collection.models;
            this.$el.html(this.template(this.createSelect()));
            this.render();
            this.$el.find("#filter").append(this.createSelect()); 

            this.on("change:filterType", this.filterByType, this);
            this.collection.on("reset", this.render, this);
            this.collection.on("add", this.renderContact, this);
            this.collection.on("remove", this.renderContact, this);
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
            el = this.$el;
            $("#contacts", el).append(contactView.render().el);
        },

        getTypes: function () {
            return _.uniq(this.collection.pluck("type"));
        },

        createSelect: function () {
            var select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item,
                    text: item
                }).appendTo(select);
            });

            return select;
        },

        //add ui events
        events: {
            "change #filter select": "setFilter",
            "click #addBtn" : "addContact",
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
                this.options.router.navigate("filter/all");
            } else {
                this.collection.reset(this.contacts, { silent: true });

                var filterType = this.filterType,
                    filtered = _.filter(this.collection.models, function (item) {
                        return item.get("type") === filterType;
                    });

                this.collection.reset(filtered);

                this.options.router.navigate("filter/" + filterType);
            }
        },
        addContact: function() {
            this.options.router.navigate("addContact",{trigger: true});
        }
        
    });
    return View;
})