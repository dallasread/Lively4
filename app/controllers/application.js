import Ember from 'ember';

export default Ember.Controller.extend({
	watchHistory: function(){
		if (this.get('currentPath').indexOf('loading') === -1) {
			this.get('session').set( 'back', this.get('session.current') );
			this.get('session').set( 'current', this.get('currentPath') );
		}
  }.observes('currentPath'),
	contactDinger: function() {
		if (this.session.contact.get('ding')) {
			this.get('session.ding').play();
			this.session.contact.set('ding', false).save();
		}
	}.observes('session.contact.ding'),
	agentDinger: function() {
		if (this.get('session.agent.ding')) {
			this.get('session.ding').play();
			this.session.get('agent').set('ding', false);
			this.session.get('chatbox').save();
			//window.LCSDB.child('chatboxes/' + this.get('session.chatbox.id') + '/agents/' + this.get('session.agent.id') + '/ding').set(false);
		}
	}.observes('session.agent.ding')
});
