define(["backbone"],function(){var e=Backbone.View.extend({className:"contact-container",template:_.template($("#contactAddTemplate").html()),events:{"submit form#newContact":"saveContact"},initialize:function(){this.render()},render:function(){return this.model===undefined?this.$el.html(this.template({contact:{}})):this.$el.html(this.template({contact:this.model.toJSON()})),this},saveContact:function(e){e.preventDefault();if(this.model===undefined){var t=this.collection.max(function(e){return e.id}).id;this.collection.add({id:t+1,name:$("[name='name']",this.$el).val(),address:$("[name='address']",this.$el).val(),tel:$("[name='tel']",this.$el).val(),email:$("[name='email']",this.$el).val(),type:$("[name='type']",this.$el).val()||"family"},{silent:!0})}else this.model.set({name:$("[name='name']",this.$el).val(),address:$("[name='address']",this.$el).val(),tel:$("[name='tel']",this.$el).val(),email:$("[name='email']",this.$el).val(),type:$("[name='type']",this.$el).val()});this.undelegateEvents(),this.options.router.navigate("",{trigger:!0})}});return e})