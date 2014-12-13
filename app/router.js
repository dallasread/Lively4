import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('prompter');
	
	this.route('install', function() {
		this.route('success');
	});
  
	this.route('chatbox', function() {
  	this.route('signin');
		this.route('chatting');
		this.route('register');
  });
	
	this.route('admin', function() {
		this.route('agents');
		this.route('activate');
		this.route('setup');
		this.route('contacts', function() {
			this.route('contact', { path: '/:contact_id' });
		});

		this.route('settings', function() {
			this.route('triggers');
			this.route('canned');
			this.route('introducers');
			this.route('me');
		});
	});
});

export default Router;
