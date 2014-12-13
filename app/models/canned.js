import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	//chatbox: DS.belongsTo('chatbox', { async: true }),
	hash: DS.attr('string'),
	message: DS.attr('string'),
	active: function() {
		return !!Ember.$.trim(this.get('hash')).length && !!Ember.$.trim(this.get('message')).length;
	}.property('hash', 'message')
});