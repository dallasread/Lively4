import Ember from 'ember';

export default Ember.Controller.extend({
	watchHistory: function(){
		this.get('session').set( 'back', this.get('session.current') );
		this.get('session').set( 'current', this.get('currentPath') );
  }.observes('currentPath')
});
