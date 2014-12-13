import DS from 'ember-data';

export default DS.Model.extend({
	visitor: DS.belongsTo('visitor', { async: true }),
	body: DS.attr('string'),
	from_agent: DS.attr('boolean'),
	agent: DS.belongsTo('agent', { async: true }),
	read: DS.attr('boolean', { defaultValue: false }),
	created_at: DS.attr('date', { defaultValue: function() { return new Date(); }})
});