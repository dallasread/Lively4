import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	//chatbox: DS.belongsTo('chatbox', { async: true }),
	details: DS.attr('object', { defaultValue: {
		name: "Visitor",
		email: ""
	}}),
	anonymous: DS.attr('boolean', { defaultValue: true }),
	ding: DS.attr('boolean', { defaultValue: false }),
	online: DS.attr('boolean', { defaultValue: false }),
	introduced: DS.attr('boolean', { defaultValue: false }),
	triggered_by: DS.attr('string'),
	agent: DS.belongsTo('agent', { async: true }),
	messages: DS.hasMany('message', { embedded: true }),
	contact_typing: DS.attr('boolean', { defaultValue: false }),
	agent_typing: DS.attr('boolean', { defaultValue: false }),
	agent_last_seen: DS.attr('date'),
	contact_last_seen: DS.attr('date', { defaultValue: function() { return new Date(); }}),
	status: function() {
		return this.get('online') ? 'Online' : 'Offline';
	}.property('online'),
	details_array: function() {
		var details_array = [];
		Ember.$.each(this.get('details'), function(label, value) { 
	    details_array.push({
	    	label: label,
				value: value
	    });
		}); 
		return details_array;
	}.property('details'),
	unread_from_agent: function() {
		var messages = this.get('messages');
		return messages.filterBy('read', false).filterBy('from_agent', true);
	}.property('messages.@each.read'),
	latest_agent_message: function() {
		return this.get('unread_from_agent').objectAt( this.get('contact_unread_count') - 1 );
	}.property('unread_from_agent'),
	contact_unread_count: function() {
	  return this.get('unread_from_agent').get('length');
	}.property('unread_from_agent'),
	contact_has_unread: function() {
		return this.get('contact_unread_count') !== 0;
	}.property('unread_from_agent'),
	unread_from_contact: function() {
		var messages = this.get('messages');
		return messages.filterBy('read', false).filterBy('from_agent', false);
	}.property('messages.@each.read'),
	agent_unread_count: function() {
	  return this.get('unread_from_contact').get('length');
	}.property('unread_from_contact'),
	agent_has_unread: function() {
		return this.get('agent_unread_count') !== 0;
	}.property('unread_from_contact')
});