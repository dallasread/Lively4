import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox', { async: true }),
	online: DS.attr('boolean'),
	name: DS.attr('string'),
	email: DS.attr('string'),
	avatar: DS.attr('string'),
	visitors: DS.hasMany('visitor', { async: true }),
	active: function() {
		return !!Ember.$.trim(this.get('name')).length && !!Ember.$.trim(this.get('email')).length;
	}.property('name', 'email')
});
