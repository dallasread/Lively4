import Ember from 'ember';
import config from '../config/environment';
var fff = "aHR0cHM6Ly9sY3M0LmZpcmViYXNlaW8uY29t";

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window.LCSDB = new window.Firebase(window.atob(fff));
		window.FastClick.attach(document.body);
		//window.LCSDB.unauth();
		
		window.LCSDB.onAuth(function(auth) {
			var token = Ember.$('[data-lcs]').data('lcs');
			var store = container.lookup('store:main');
			var session = null;
			var loader = ['styles', 'user'];
			var loadComplete = function(loaded) {
				var index = loader.indexOf(loaded);
				loader.splice(index, 1);
				if (!loader.length) {
					app.advanceReadiness();
				}
			};

			var session_vars = {
				auth: auth,
				url: config.url,
				back: null,
				created: null,
				current: 'prompter',
				ding: new window.Howl({
				  urls: [
						config.url + '/assets/audio/bell.mp3',
						config.url + '/assets/audio/bell.ogg'
					]
				})
			};
			
			if (!window.LCSInjected) {
				window.LCSInjected = true;
				session = Ember.Object.create(session_vars);
				app.register('session:main', session, { instantiate: false, singleton: true });
				app.inject('route', 'session', 'session:main');
				app.inject('controller', 'session', 'session:main');
				app.inject('component', 'session', 'session:main');
				app.inject('view', 'session', 'session:main');
				app.inject('model', 'session', 'session:main');
				container.injection('component', 'store', 'store:main');
				container.injection('view', 'store', 'store:main');
				session = container.lookup('session:main');
				
				var head = document.getElementsByTagName( 'head' )[0];
				var link = document.createElement( 'link' );
				link.setAttribute( 'href', config.url + '/assets/lcs.css' );
				link.setAttribute( 'rel', 'stylesheet' );
				link.setAttribute( 'type', 'text/css' );
				link.onload = function() {
					loadComplete( 'styles' );
				};
				head.appendChild(link);
			} else {
				session = container.lookup('session:main');
				session.setProperties(session_vars);
			}
			
			var setContact = function(store, auth, session, chatbox) {
				store.find('contact', auth.uid).then(function(contact) {
					session.set('created', null);
					
					contact.get('agent').then(function(agent) {
						if (!agent) {
							contact.set('agent', session.get("chatbox.next_available_agent"));
						}
					
						contact.set('online', true).save().then(function() {
							session.set('contact', contact);
							window.LCSDB.child('contacts/' + chatbox.id + '/' + auth.uid + '/online').onDisconnect().set(false);
							window.LCSDB.child('contacts/' + chatbox.id + '/' + auth.uid + '/contact_last_seen').onDisconnect().set(new Date().toJSON());
							loadComplete('user');
						});
					});
				}, function() {
					window.LCSDB.unauth();
				});							
			};
			
      
			store.find('chatbox', token).then(function(chatbox) {
				session.set('chatbox', chatbox);
				
				if (auth) {
					
					store.find('agent', auth.uid).then(function(agent) {
						if (!agent.get('active')) {
							agent.set('active', true);
						}
						
						if (agent.get('ding')) {
							session.get('ding').play();
							agent.set('ding', false);
						}
						
						session.chatbox.save();
						session.set('agent', agent);
						window.LCSDB.child('chatboxes/' + chatbox.id + '/agents/' + auth.uid + '/online').onDisconnect().set(false);
						loadComplete('user');
						
					}, function() {
						
						setContact(store, auth, session, chatbox);
						
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
								}).save().then(function() {
									setContact(store, auth, session, chatbox);
								});
						  }
						});
					}
				}
			}, function() {
				session.set('token', token);
				loadComplete('user');
			});
		});
		
		app.deferReadiness();
	}
};
