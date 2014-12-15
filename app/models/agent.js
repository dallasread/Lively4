import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	//chatbox: DS.belongsTo('chatbox', { async: true }),
	creator: DS.attr('boolean', { defaultValue: false }),
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
	is_current_user: function() {
		return this.get('session.agent.id') === this.get('id');
	}.property('id'),
	//contacts: DS.hasMany('contact', { async: true }),
	active: function() {
		return true; //!!Ember.$.trim(this.get('name')).length && !!Ember.$.trim(this.get('email')).length;
	}.property('name', 'email')
});
