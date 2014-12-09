import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	activated: DS.attr('boolean', { defaultValue: false }),
	agents: DS.hasMany('agent'),
	color: DS.attr('string', { defaultValue: '#004154' }),
	texturize: DS.attr('boolean', { defaultValue: true }),
	exclude: DS.attr('string', { defaultValue: '' }),
	include: DS.attr('string', { defaultValue: '*' }),
	triggers: DS.hasMany('triggers', { embedded: true }),
	canned: DS.hasMany('canned', { embedded: true }),
	introducers: DS.hasMany('introducers', { embedded: true }),
	chatbox_style: function() {
		var styles = ['background-color: ' + this.get('color')];
		if (this.get('texturize')) { styles.push('background-image: url(/imgs/header_bg2.png)'); }
		return styles.join("; ");
	}.property('color', 'texturize')
});
