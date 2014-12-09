import DS from 'ember-data';

export default DS.Model.extend({
	online: DS.attr('boolean'),
	name: DS.attr('string'),
	email: DS.attr('string'),
	avatar: DS.attr('string'),
	visitors: DS.hasMany('visitor', { async: true })
});
