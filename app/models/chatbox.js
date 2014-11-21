import {Model, attr, hasMany} from 'fireplace';

export default Model.extend({
	name: attr('string'),
	exclude: attr('string'),
	include: attr('string'),
	triggers: hasMany(),
	created_at: attr('date', { default: function() { return new Date(); } })
});
