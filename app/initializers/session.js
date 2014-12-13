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
			var session = Ember.Object.create({
				auth: auth,
				url: 'http://localhost:4200',
				ding: new window.Howl({
				  urls: [
						'/audio/bell.mp3',
						'/audio/bell.ogg'
					]
				})
			});
			
			if (!window.LCSInjected) {
				window.LCSInjected = true;
				app.register('session:main', session, { instantiate: false, singleton: true });
				app.inject('route', 'session', 'session:main');
				app.inject('controller', 'session', 'session:main');
				app.inject('view', 'session', 'session:main');
				app.inject('model', 'session', 'session:main');
				container.injection('component', 'store', 'store:main');
				container.injection('view', 'store', 'store:main');
				session = container.lookup('session:main');
			}
			
			store.find('chatbox', token).then(function(chatbox) {
				session.set('chatbox', chatbox);
				
				if (auth) {
					store.find('agent', auth.uid).then(function(agent) {
						if (!agent.get('online')) {
							agent.set('online', true);
							chatbox.save();
						}
						
						session.set('agent', agent);
						
						window.LCSDB.child('.info/connected').once("value", function() {
							window.LCSDB.child('chatboxes/' + chatbox.id + '/agents/' + auth.uid + '/online').onDisconnect().set(false);
							app.advanceReadiness();
						});
					}, function() {
						window.LCSDB.child('contacts/' + chatbox.id + '/' + auth.uid + '/online').set(true);
						window.LCSDB.child('contacts/' + chatbox.id + '/' + auth.uid).onDisconnect().update({
							online: false,
							contact_last_seen: new Date()
						});
						
						store.find('contact', auth.uid).then(function(contact) {
							contact.get('agent').then(function(agent) {
								if (!agent) {
									contact.set('agent', session.get("chatbox.next_available_agent"));
								}
								
								session.set('contact', contact);
								app.advanceReadiness();
							});
						});
					});
				} else {
					if (session.get('chatbox')) {
						window.LCSDB.authAnonymously(function(error, auth) {
						  if (error) {
								console.log("Lively Chat Support could not connect.", error);
						  } else {
								store.unloadAll('message');
								store.unloadAll('contact');
								session.set('auth', null);
								session.set('contact', null);
								session.set('agent', null);

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
