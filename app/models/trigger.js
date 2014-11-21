import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.attr('string'),
	active: DS.attr('boolean'),
	delay: DS.attr('integer'),
	include: DS.attr('string'),
	exclude: DS.attr('string'),
	message: DS.attr()
});