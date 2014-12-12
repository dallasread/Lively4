import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox', { async: true }),
	admin: DS.attr('boolean', { defaultValue: false }),
	online: DS.attr('boolean', { defaultValue: false }),
	name: DS.attr('string'),
	email: DS.attr('string'),
	avatar: DS.attr('string'),
	visitors: DS.hasMany('visitor', { async: true }),
	typing: DS.attr('boolean', { defaultValue: false }),
	active: function() {
		return !!Ember.$.trim(this.get('name')).length && !!Ember.$.trim(this.get('email')).length;
	}.property('name', 'email')
});
