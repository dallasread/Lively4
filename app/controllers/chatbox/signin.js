import Ember from 'ember';

export default Ember.ObjectController.extend({
	email: null,
	password: null,
	resetting: false,
	actions: {
		resetPassword: function() {
			this.set('resetting', !this.get('resetting'));
		},
		signIn: function() {
			var e = this;
			
			if (!this.get('resetting')) {
				
				window.LCSDB.authWithPassword({
				  email: this.get('email'),
				  password: this.get('password')
				}, function(error, auth) {
				  if (error) {
				    alert("Incorrect email or password.");
				  } else {
						e.set('email', null);
						e.set('password', null);
					
						e.store.find('agent', auth.uid).then(function() {
							e.get('session.contact').set('online', false).save().then(function() {
								e.get('session').set('contact', null);
								e.transitionToRoute('admin');
							});
						}, function() {
					    alert("You are not authorized as an agent.");
							window.LCSDB.unauth();
						});
				  }
				});
				
			} else {
				
				window.LCSDB.resetPassword({
			    email: e.get('email')
			  }, function(error) {
					if (error) {
						alert(error);
					} else {
						alert("We are sending you an email with a temporary password. Please login and change your password within 24 hours. Thanks!");
					}
			  });
				
			}
		}
	}
});