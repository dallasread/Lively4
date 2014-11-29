import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	exclude: DS.attr('string'),
	include: DS.attr('string'),
	triggers: DS.hasMany('triggers', { embedded: true }),
	canned: DS.hasMany('canned', { embedded: true }),
	introducers: DS.hasMany('introducers', { embedded: true })
});
