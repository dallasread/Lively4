import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox'),
	hash: DS.attr('string'),
	message: DS.attr()
});