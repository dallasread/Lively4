import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createChatbox: function() {
			var e = this;
			// VALIDATE INFO
			
			window.LCSDB.createUser({
			  email: e.get('email'),
			  password: e.get('password')
			}, function(error) {
			  if (error) {
			    switch (error.code) {
			      case "EMAIL_TAKEN":
			        // TRY TO LOG USER IN
							alert('email taken');
			        break;
			      case "INVALID_EMAIL":
			        alert('Please enter a valid email address.');
			        break;
			      default:
			        alert(error);
			    }
			  } else {
					e.store.unloadAll('chatbox');

					var chatbox = e.store.createRecord('chatbox', {
						id: e.get('session.token')
					});
					
					// ADD TRIGGERS, CANNED, INTRODUCERS
					
					chatbox.save().then(function() {
						e.session.set('chatbox', chatbox);

						window.LCSDB.authWithPassword({
						  email: e.get('email'),
						  password: e.get('password')
						}, function(error, auth) {
						  if (error) {
								alert(error);
							} else {
								var agent = e.store.createRecord('agent', {
									id: auth.uid,
									email: e.get('email'),
									name: e.get('name'),
									admin: true,
									creator: true,
									active: true
								});
					
								chatbox.get('agents').addObject(agent);
								e.session.set('agent', agent);
								e.transitionToRoute( 'admin' );
							}
						});
					});
			  }
			});
		}
	}
});
