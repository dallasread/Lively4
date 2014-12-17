import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.Model.extend({
	domain: DS.attr('string', { defaultValue: function() {
		return window.location.host;
	}}),
	activated: DS.attr('boolean', { defaultValue: false }),
	activated_at: DS.attr('date'),
	color: DS.attr('string', { defaultValue: '#004154' }),
	texturize: DS.attr('boolean', { defaultValue: false }),
	exclude: DS.attr('string', { defaultValue: '' }),
	include: DS.attr('string', { defaultValue: '*' }),
	canned: DS.hasMany('canned', { embedded: true }),
	agents: DS.hasMany('agent', { embedded: true }),
	triggers: DS.hasMany('trigger', { embedded: true }),
	introducers: DS.hasMany('introducer', { embedded: true }),
	initial_offline_message: DS.attr('string', { defaultValue: "We're not available right now, but feel free to leave us a message!" }),
	initial_online_message: DS.attr('string', { defaultValue: "How can I help you?" }),
	triggersSorted: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['delay'],
      content: this.get('triggers').filterBy('active', true).filterBy('state', this.get('online') ? 'online' : 'offline')
    });
  }).property('triggers.@each.delay', 'online'),
	introducersSorted: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['ordinal'],
      content: this.get('introducers')
    });
  }).property('introducers.@each.ordinal'),
	online_agents: function() {
		return this.get('agents').filterBy('online', true).filterBy('active', true);
	}.property('agents.@each.active', 'agents.@each.online'),
	online: function() {
		return !!this.get('online_agents').get('length');
	}.property('online_agents'),
	status: function() {
		return this.get('online') ? 'online' : 'offline';
	}.property('online'),
	next_available_agent: function() {
		var agents = this.get('agents');
		return agents.objectAt(Math.floor(Math.random() * agents.get('length')));
	}.property('agents'),
	chatbox_style: function() {
		var styles = ['background-color: ' + this.get('color')];
		if (this.get('texturize')) { styles.push('background-image: url(' + config.url + '/assets/imgs/header_bg2.png)'); }
		return styles.join("; ");
	}.property('color', 'texturize'),
	paypal_monthly: function() {
		return 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GAN283WMZSTDU&custom=' + this.get('id')
	}.property('id'),
	paypal_annually: function() {
		return 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BH9QXAHRFWA2Y&custom=' + this.get('id')
	}.property('id')
});
