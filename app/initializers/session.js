import Ember from 'ember';

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window.LCSDB = new window.Firebase("https://lcs4.firebaseio.com");
		window.FastClick.attach(document.body);
		//window.LCSDB.unauth();
		
		window.LCSDB.onAuth(function(auth) {
			var token = Ember.$('[data-lcs]').data('lcs');
			var store = container.lookup('store:main');
			var session = null;
			var session_vars = {
				auth: auth,
				url: 'http://localhost:4200',
				back: null,
				current: 'prompter',
				ding: new window.Howl({
				  urls: [
						'/audio/bell.mp3',
						'/audio/bell.ogg'
					]
				})
			};
			
			if (!window.LCSInjected) {
				window.LCSInjected = true;
				session = Ember.Object.create(session_vars);
				app.register('session:main', session, { instantiate: false, singleton: true });
				app.inject('route', 'session', 'session:main');
				app.inject('controller', 'session', 'session:main');
				app.inject('view', 'session', 'session:main');
				app.inject('model', 'session', 'session:main');
				container.injection('component', 'store', 'store:main');
				container.injection('view', 'store', 'store:main');
				session = container.lookup('session:main');
			} else {
				session = container.lookup('session:main');
				session.setProperties(session_vars);
			}
			
			store.find('chatbox', token).then(function(chatbox) {
				session.set('chatbox', chatbox);
				
				if (auth) {
					store.find('agent', auth.uid).then(function(agent) {
						if (!agent.get('active')) {
							agent.set('active', true);
							session.chatbox.save();
						}
						
						session.set('agent', agent);
						window.LCSDB.child('chatboxes/' + chatbox.id + '/agents/' + auth.uid + '/online').onDisconnect().set(false);
						app.advanceReadiness();
					}, function() {
						store.find('contact', auth.uid).then(function(contact) {
							contact.get('agent').then(function(agent) {
								if (!agent) {
									contact.set('agent', session.get("chatbox.next_available_agent"));
								}
								
								contact.set('online', true).save().then(function() {
									session.set('contact', contact);
									window.LCSDB.child('contacts/' + chatbox.id + '/' + auth.uid + '/online').onDisconnect().set(false);
									window.LCSDB.child('contacts/' + chatbox.id + '/' + auth.uid + '/contact_last_seen').onDisconnect().set(new Date().toJSON());
									app.advanceReadiness();
								});
							});
						}, function() {
							window.LCSDB.unauth();
						});
					});
				} else {
					if (session.get('chatbox')) {
						store.unloadAll('message');
						store.unloadAll('contact');
						session.set('auth', null);
						session.set('contact', null);
						session.set('agent', null);
						
						window.LCSDB.authAnonymously(function(error, auth) {
						  if (error) {
								console.log("Lively Chat Support could not connect.", error);
						  } else {
								store.createRecord('contact', {
									id: auth.uid,
									anonymous: true
								}).save();
						  }
						});
					}
				}
			}, function() {
				session.set('token', token);
				app.advanceReadiness();
			});
		});
		
		app.deferReadiness();
	}
};
