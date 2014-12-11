import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox', { async: true }),
	active: DS.attr('boolean'),
	delay: DS.attr('string'),
	include: DS.attr('string'),
	exclude: DS.attr('string'),
	message: DS.attr('string')
});