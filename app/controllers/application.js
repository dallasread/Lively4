import Ember from 'ember';

export default Ember.Controller.extend({
	dinging: false,
	watchHistory: function(){
		if (this.get('currentPath').indexOf('loading') === -1) {
			this.get('session').set( 'back', this.get('session.current') );
			this.get('session').set( 'current', this.get('currentPath') );
		}
  }.observes('currentPath'),
	contactDinger: function() {
		if (this.get('session.contact.ding')) {
			this.get('session.ding').play();
			this.get('session.contact').set('ding', false).save();
		}
	}.observes('session.contact.ding'),
	agentDinger: function() {
		if (!this.get('dinging')) {
			var e = this;
			this.set('dinging', true);
			this.get('session.ding').play();
			this.set('session.agent.ding', false);
			this.session.chatbox.save().then(function() {
				e.set('dinging', false);
			});
		}
	}.observes('session.agent.ding')
});
