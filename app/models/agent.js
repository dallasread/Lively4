import DS from 'ember-data';

export default DS.Model.extend({
	//chatbox: DS.belongsTo('chatbox', { async: true }),
	active: DS.attr('boolean', { defaultValue: false }),
	creator: DS.attr('boolean', { defaultValue: false }),
	admin: DS.attr('boolean', { defaultValue: false }),
	online: DS.attr('boolean', { defaultValue: false }),
	registered: DS.attr('boolean', { defaultValue: false }),
	ding: DS.attr('boolean', { defaultValue: false }),
	name: DS.attr('string'),
	email: DS.attr('string'),
	avatar: DS.attr('string', { defaultValue: function() {
		//var n = Math.floor(Math.random() * 10) + 1;
		var n = 1;
		return '/imgs/faces/lady/' + n + '.png';
	}}),
	offline: function() {
		return !this.get('online');
	}.property('online'),
	is_current_user: function() {
		return this.get('session.agent.id') === this.get('id');
	}.property('id'),
	//contacts: DS.hasMany('contact', { async: true }),
});
