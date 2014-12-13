import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	//chatbox: DS.belongsTo('chatbox', { async: true }),
	name: DS.attr('string'),
	permalink: DS.attr('string'),
	required: DS.attr('boolean'),
	type: DS.attr('string'),
	validator: DS.attr('string'),
	ordinal: DS.attr('number'),
	dom_id: function() {
		return "lcs_field_" + this.get('permalink');
	}.property('permalink'),
	placeholder: function() {
		var p = this.get('name');
		if (this.get('required')) { p += " (required)"; }
		return p;
	}.property('name', 'required'),
	active: function() {
		return !!Ember.$.trim(this.get('name')).length && !!Ember.$.trim(this.get('permalink')).length;
	}.property('name', 'permalink')
});