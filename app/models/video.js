import DS from 'ember-data';

var Video = DS.Model.extend({
	name: DS.attr('string'),
	token: DS.attr('string'),
	url: function() {
		return '//www.youtube.com/embed/' + this.get('token');
	}.property('token')
});

Video.reopenClass({
	FIXTURES: [{
		id: 'agents',
		name: 'How to use Agents',
		token: 'a1MxG6Uq4m4'
	}, {
		id: 'contacts',
		name: 'How to Connect Effectively',
		token: 'a1MxG6Uq4m4'
	}, {
		id: 'general',
		name: 'Setting up your Chatbox Effectively',
		token: 'a1MxG6Uq4m4'
	}, {
		id: 'triggers',
		name: 'How to use Triggers Effectively',
		token: 'a1MxG6Uq4m4'
	}, {
		id: 'canned',
		name: 'How to use Introducers Effectively',
		token: 'a1MxG6Uq4m4'
	}, {
		id: 'introducers',
		name: 'How to use Agents',
		token: 'a1MxG6Uq4m4'
	}]
});

export default Video;