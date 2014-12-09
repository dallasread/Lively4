import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	activated: DS.attr('boolean', { defaultValue: false }),
	color: DS.attr('string', { defaultValue: '#004154' }),
	texturize: DS.attr('boolean', { defaultValue: true }),
	exclude: DS.attr('string', { defaultValue: '' }),
	include: DS.attr('string', { defaultValue: '*' }),
	canned: DS.hasMany('canned', { embedded: true }),
	agents: DS.hasMany('agent', { embedded: true }),
	triggers: DS.hasMany('trigger', { embedded: true }),
	introducers: DS.hasMany('introducer', { embedded: true }),
	introducersSorted: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['ordinal'],
      content: this.get('introducers')
    });
  }).property('introducers.@each.ordinal'),
	activeAgents: function() {
		return this.get('agents').filterBy('active', true);
	}.property('agents.@each.name', 'agents.@each.email'),
	chatbox_style: function() {
		var styles = ['background-color: ' + this.get('color')];
		if (this.get('texturize')) { styles.push('background-image: url(/imgs/header_bg2.png)'); }
		return styles.join("; ");
	}.property('color', 'texturize')
});
