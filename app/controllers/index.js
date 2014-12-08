import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		if (this.get('session.registered')) {
			this.transitionToRoute( this.session.root_path );
		} else {
			this.transitionToRoute( 'prompter' );
		}
	}
});
