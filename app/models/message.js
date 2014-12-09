import DS from 'ember-data';

export default DS.Model.extend({
	visitor: DS.belongsTo('visitor'),
	body: DS.attr('string'),
	from_agent: DS.attr('boolean'),
	read: DS.attr('boolean', { defaultValue: false })
});