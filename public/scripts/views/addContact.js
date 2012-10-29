define(['backbone'], function(){
	var View = Backbone.View.extend({
		className: "contact-container",
		template: _.template($("#contactAddTemplate").html()),
		events: {
			"submit form#newContact": "saveContact",
		},

		initialize: function () {
			this.render();
		},
		render: function () {
			 if (this.model === undefined) {
                this.$el.html(this.template({contact: {}}));
            } else {
                this.$el.html(this.template({contact: this.model.toJSON()}));
            }
            //this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        saveContact: function(e) {
        	e.preventDefault();
        	if (this.model === undefined) {
        		var max_id = this.collection.max(function(i){return i.id}).id;
        		this.collection.add({
	        		id: max_id+1,
	        		name: $("[name='name']", this.$el).val(),
	        		address: $("[name='address']", this.$el).val(),
	        		tel: $("[name='tel']", this.$el).val(),
	        		email: $("[name='email']", this.$el).val(),
	        		type: $("[name='type']", this.$el).val() || "family"
	        	}, {silent: true});
        	} else {
        		this.model.set({
        			name: $("[name='name']", this.$el).val(),
	        		address: $("[name='address']", this.$el).val(),
	        		tel: $("[name='tel']", this.$el).val(),
	        		email: $("[name='email']", this.$el).val(),
	        		type: $("[name='type']", this.$el).val(),
        		})
        	}
        	this.undelegateEvents();
        	this.options.router.navigate("",{trigger: true});
        	//return false;
        }
	});
	return View;
});