import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox'),
	name: DS.attr('string'),
	permalink: DS.attr('string'),
	required: DS.attr('boolean'),
	active: DS.attr('boolean'),
	type: DS.attr('string'),
	validator: DS.attr('string'),
	priority: DS.attr('string')
});