import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		if (this.session.get('chatbox')) {
			this.transitionToRoute( 'prompter' );
		} else {
			this.transitionToRoute( 'install' );
		}
	}
});
