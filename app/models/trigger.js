import DS from 'ember-data';

export default DS.Model.extend({
	//chatbox: DS.belongsTo('chatbox', { async: true }),
	active: DS.attr('boolean', { defaultValue: true }),
	delay: DS.attr('number', { defaultValue: 7 }),
	include: DS.attr('string', { defaultValue: '*' }),
	exclude: DS.attr('string', { defaultValue: '' }),
	message: DS.attr('string', { defaultValue: "Do you have any questions? I'm here to help!" }),
	state: DS.attr('string', { defaultValue: 'online' })
});