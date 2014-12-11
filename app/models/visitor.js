import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox', { async: true }),
	details: DS.attr('object', { defaultValue: {
		name: "",
		email: ""
	}}),
	anonymous: DS.attr('boolean', { defaultValue: true }),
	online: DS.attr('boolean', { defaultValue: false }),
	agent: DS.belongsTo('agent', { async: true }),
	messages: DS.hasMany('message', { embedded: true }),
	visitor_typing: DS.attr('boolean', { defaultValue: false }),
	agent_typing: DS.attr('boolean', { defaultValue: false }),
	updated_at: DS.attr('number', { defaultValue: new Date().getTime() }),
	details_array: function() {
		var details_array = [];
		$.each(this.get('details'), function(label, value) { 
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
		return this.get('unread_from_agent').objectAt( this.get('visitor_unread_count') - 1 );
	}.property('unread_from_agent'),
	visitor_unread_count: function() {
	  return this.get('unread_from_agent').get('length');
	}.property('unread_from_agent'),
	has_unread: function() {
		return this.get('visitor_unread_count') !== 0;
	}.property('unread_from_agent')
});