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
			
			store.find('chatbox', token).then(function(chatbox) {
				if (!window.LCSInjected) {
					window.LCSInjected = true;
					session.set('chatbox', chatbox);
					app.register('session:main', session, { instantiate: false, singleton: true });
					app.inject('route', 'session', 'session:main');
					app.inject('controller', 'session', 'session:main');
					app.inject('view', 'session', 'session:main');
					container.injection('component', 'store', 'store:main');
					container.injection('view', 'store', 'store:main');
					session = container.lookup('session:main');
				}
				
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
						window.LCSDB.child('visitors/' + chatbox.id + '/' + auth.uid + '/online').set(true);
						window.LCSDB.child('visitors/' + chatbox.id + '/' + auth.uid + '/online').onDisconnect().set(false);
						
						store.find('visitor', auth.uid).then(function(visitor) {
							visitor.get('agent').then(function(agent) {
								if (!agent) {
									visitor.set('agent', session.get("chatbox.next_available_agent"));
								}
								
								session.set('visitor', visitor);
								app.advanceReadiness();
							});
						});
					});
				} else {
					window.LCSDB.authAnonymously(function(error, auth) {
					  if (error) {
							console.log("Lively Chat Support could not connect.", error);
					  } else {
							store.unloadAll('message');
							store.unloadAll('visitor');
							session.set('auth', null);
							session.set('visitor', null);
							session.set('agent', null);

							store.createRecord('visitor', {
								id: auth.uid,
								anonymous: true
							}).save();
					  }
					});
				}
			}, function() {
				console.log("Lively Chat Support token \"" + token + "\" does not exist.");
			});
		});
		
		app.deferReadiness();
	}
};
