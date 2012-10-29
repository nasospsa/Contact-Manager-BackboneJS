define(['backbone'], function(){
	//define individual contact view
    var View = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: _.template($("#contactTemplate").html()),
        editTemplate: _.template($("#contactEditTemplate").html()),
        events: {
            "click button.delete": "deleteContact",
            "click button.edit": "editContact",
            "change select.type": "addType",
            "click button.save": "saveEdits",
            "click button.cancel": "cancelEdit"
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        editContact: function () {
            this.$el.html(this.editTemplate(this.model.toJSON()));

            //add select to set type
            var newOpt = $("<option/>", {
                html: "<em>Add new...</em>",
                value: "addType"
            });

            this.select = directory.createSelect().addClass("type").val(this.$el.find("#type").val()).append(newOpt).insertAfter(this.$el.find(".name"));
            this.$el.find("input[type='hidden']").remove();
        },
        addType: function () {
            if (this.select.val() === "addType") {

                this.select.remove();

                $("<input />", {
                    "class": "type"
                }).insertAfter(this.$el.find(".name")).focus();
            }
        },
        saveEdits: function (e) {
            e.preventDefault();

            var formData = {},
                prev = this.model.previousAttributes();

            //get form data
            $(e.target).closest("form").find(":input").not("button").each(function () {
                var el = $(this);
                formData[el.attr("class")] = el.val();
            });

            //use default photo if none supplied
            if (formData.photo === "") {
                delete formData.photo;
            }

            //update model
            this.model.set(formData);

            //render view
            this.render();

            //if model acquired default photo property, remove it
            if (prev.photo === "/img/placeholder.png") {
                delete prev.photo;
            }

            //update contacts array
            _.each(contacts, function (contact) {
                if (_.isEqual(contact, prev)) {
                    contacts.splice(_.indexOf(contacts, contact), 1, formData);
                }
            });
        },

        cancelEdit: function () {
            this.render();
        },
        deleteContact: function () {
            var removedType = this.model.get("type").toLowerCase();

            //remove model
            this.model.destroy();

            //remove view from page
            this.remove();

            //re-render select if no more of deleted type
            if (_.indexOf(directory.getTypes(), removedType) === -1) {
                directory.$el.find("#filter select").children("[value='" + removedType + "']").remove();
            }
        },
    });
    return View;
});