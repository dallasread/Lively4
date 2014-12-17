import DS from 'ember-data';

export default DS.Model.extend({
	contact: DS.belongsTo('contact', { async: true }),
	body: DS.attr('string'),
	from_agent: DS.attr('boolean'),
	read: DS.attr('boolean'),
	agent: DS.belongsTo('agent', { async: true }),
	created_at: DS.attr('date', { defaultValue: function() { return new Date(); }})
});