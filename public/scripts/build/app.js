(function(e){var t=[{name:"Contact 1",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"family"},{name:"Contact 2",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"family"},{name:"Contact 3",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"friend"},{name:"Contact 4",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"colleague"},{name:"Contact 5",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"family"},{name:"Contact 6",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"colleague"},{name:"Contact 7",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"friend"},{name:"Contact 8",address:"1, a street, a town, a city, AB12 3CD",tel:"0123456789",email:"anemail@me.com",type:"family"}],n=Backbone.Model.extend({defaults:{photo:"img/placeholder.png"}}),r=Backbone.Collection.extend({model:n}),i=Backbone.View.extend({tagName:"article",className:"contact-container",template:_.template(e("#contactTemplate").html()),render:function(){return this.$el.html(this.template(this.model.toJSON())),this}}),s=Backbone.View.extend({el:e("#contacts"),initialize:function(){this.collection=new r(t),this.render(),this.$el.find("#filter").append(this.createSelect()),this.on("change:filterType",this.filterByType,this),this.collection.on("reset",this.render,this)},render:function(){this.$el.find("article").remove(),_.each(this.collection.models,function(e){this.renderContact(e)},this)},renderContact:function(e){var t=new i({model:e});this.$el.append(t.render().el)},getTypes:function(){return _.uniq(this.collection.pluck("type"))},createSelect:function(){var t=e("<select/>",{html:"<option value='all'>All</option>"});return _.each(this.getTypes(),function(n){var r=e("<option/>",{value:n,text:n}).appendTo(t)}),t},events:{"change #filter select":"setFilter"},setFilter:function(e){this.filterType=e.currentTarget.value,this.trigger("change:filterType")},filterByType:function(){if(this.filterType==="all")this.collection.reset(t),a.navigate("filter/all");else{this.collection.reset(t,{silent:!0});var e=this.filterType,n=_.filter(this.collection.models,function(t){return t.get("type")===e});this.collection.reset(n),a.navigate("filter/"+e)}}}),o=Backbone.Router.extend({routes:{"filter/:type":"urlFilter"},urlFilter:function(e){u.filterType=e,u.trigger("change:filterType")}}),u=new s,a=new o;Backbone.history.start()})(jQuery)