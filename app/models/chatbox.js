import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	domain: DS.attr('string', { defaultValue: function() {
		return window.location.host;
	}}),
	activated: DS.attr('boolean', { defaultValue: false }),
	color: DS.attr('string', { defaultValue: '#004154' }),
	texturize: DS.attr('boolean', { defaultValue: true }),
	exclude: DS.attr('string', { defaultValue: '' }),
	include: DS.attr('string', { defaultValue: '*' }),
	canned: DS.hasMany('canned', { embedded: true }),
	agents: DS.hasMany('agent', { embedded: true }),
	triggers: DS.hasMany('trigger', { embedded: true }),
	introducers: DS.hasMany('introducer', { embedded: true }),
	offline_message: DS.attr('string', { defaultValue: "We're not available right now, but feel free to leave us a message!" }),
	triggersSorted: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['delay'],
      content: this.get('triggers').filterBy('active', true)
    });
  }).property('triggers.@each.delay'),
	introducersSorted: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['ordinal'],
      content: this.get('introducers')
    });
  }).property('introducers.@each.ordinal'),
	online_agents: function() {
		return this.get('agents').filterBy('active', true).filterBy('online', true);
	}.property('agents.@each.active', 'agents.@each.online'),
	next_available_agent: function() {
		var agents = this.get('agents');
		return agents.objectAt(Math.floor(Math.random() * agents.get('length')));
	}.property('agents'),
	chatbox_style: function() {
		var styles = ['background-color: ' + this.get('color')];
		if (this.get('texturize')) { styles.push('background-image: url(/imgs/header_bg2.png)'); }
		return styles.join("; ");
	}.property('color', 'texturize')
});
