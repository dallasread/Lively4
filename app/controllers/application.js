import Ember from 'ember';

export default Ember.Controller.extend({
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
		console.log(this.get('session.agent.ding'));
		if (this.get('agent_ding')) {
			this.get('session.ding').play();
			this.set('agent_ding', false);
			this.session.chatbox.save();
			//window.LCSDB.child('chatboxes/' + this.get('session.chatbox.id') + '/agents/' + this.get('session.agent.id') + '/ding').set(false);
		}
	}.observes('session.agent.ding')
});
