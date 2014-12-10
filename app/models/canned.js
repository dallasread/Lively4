import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox'),
	hash: DS.attr('string'),
	message: DS.attr(),
	active: function() {
		return !!Ember.$.trim(this.get('hash')).length && !!Ember.$.trim(this.get('message.body')).length;
	}.property('hash', 'message.body')
});