import {Model, attr, hasOne} from 'fireplace';

export default Model.extend({
	chatbox: hasOne(),
	active: attr('boolean'),
	delay: attr('integer'),
	include: attr('string'),
	exclude: attr('string'),
	message: attr()
});