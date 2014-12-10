import DS from 'ember-data';

export default DS.Model.extend({
	details: DS.attr(),
	anonymous: DS.attr('boolean', { defaultValue: true }),
	online: DS.attr('boolean', { defaultValue: false }),
	agent: DS.belongsTo('agent', { async: true }),
	messages: DS.hasMany('message', { embedded: true }),
	unread_from_agent: function() {
		var messages = this.get('messages');
		return messages.filterBy('read', false).filterBy('from_agent', true);
	}.property('messages.@each.read'),
	latest_agent_message: function() {
		return this.get('unread_from_agent').objectAt( this.get('visitor_unread_count') - 1 );
	}.property('unread_from_agent'),
	visitor_unread_count: function() {
	  return this.get('unread_from_agent').get('length');
	}.property('unread_from_agent')
});