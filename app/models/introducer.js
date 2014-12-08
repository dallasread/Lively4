import DS from 'ember-data';

export default DS.Model.extend({
	chatbox: DS.belongsTo('chatbox'),
	name: DS.attr('string'),
	permalink: DS.attr('string'),
	required: DS.attr('boolean'),
	active: DS.attr('boolean'),
	type: DS.attr('string'),
	validator: DS.attr('string'),
	priority: DS.attr('string'),
	dom_id: function() {
		return "lcs_field_" + this.get('permalink');
	}.property('permalink'),
	placeholder: function() {
		var p = this.get('name');
		if (this.get('required')) { p += "*"; }
		return p;
	}.property('name', 'required')
});