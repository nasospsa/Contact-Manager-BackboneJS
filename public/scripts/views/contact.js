define(['backbone'], function(){
	//define individual contact view
    var View = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: _.template($("#contactTemplate").html()),
        events: {
            "click [name='remove']": 'remove'
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        remove: function() {
            if  (confirm('Are you sure?')) {
                console.log(this.model);
                this.collection.remove(this.model.id);
            }
        }
    });
    return View;
});