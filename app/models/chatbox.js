import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	exclude: DS.attr('string'),
	include: DS.attr('string'),
	admins: DS.attr()
});
