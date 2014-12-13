import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox', { async: true }),
	admin: DS.attr('boolean', { defaultValue: false }),
	online: DS.attr('boolean', { defaultValue: false }),
	name: DS.attr('string'),
	email: DS.attr('string'),
	avatar: DS.attr('string', { defaultValue: function() {
		return "//lh5.googleusercontent.com/-oAV32fEdw20/AAAAAAAAAAI/AAAAAAAAAAA/AB9anrV-Gs4/s128-a/photo.jpg";
	}}),
	offline: function() {
		return !this.get('online');
	}.property('online'),
	is_creator: function() {
		return this.get('chatbox.creator') === this.get('id');
	}.property('id'),
	visitors: DS.hasMany('visitor', { async: true }),
	typing: DS.attr('boolean', { defaultValue: false }),
	active: function() {
		return !!Ember.$.trim(this.get('name')).length && !!Ember.$.trim(this.get('email')).length;
	}.property('name', 'email')
});
