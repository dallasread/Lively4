import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.route('install');
	this.route('prompter');
  
	this.route('chatbox', function() {
  	this.route('signin');
		this.route('chatting');
		this.route('register');
  });
	
	this.route('admin', function() {
		this.route('agents');
		this.route('activate');
		this.route('setup');
		this.resource('visitors');

		this.route('settings', function() {
			this.route('triggers');
			this.route('canned');
			this.route('introducers');
			this.route('me');
		});
	});
});

export default Router;
