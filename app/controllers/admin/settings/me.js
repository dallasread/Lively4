import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
	change_password: false,
	new_password: null,
	current_password: null,
	actions: {
		saveChatbox: function() {
			var e = this;
			if (this.get('change_password')) {
				if (this.get('current_password.length') && this.get('new_password.length')) {
					window.LCSDB.changePassword({
					  email: this.session.agent.get('email'),
					  oldPassword: this.get('current_password'),
					  newPassword: this.get('new_password')
					}, function(error) {
					  if (error) {
							e.set('current_password', '');
					    alert("Your CURRENT password is incorrect.");
					  }
					});	
				} else {
					alert('Please supply a NEW and CURRENT password.');
				}
			}
			
			this.get('controllers.application').send('saveChatbox');
		}
	}
});
