import DS from 'ember-data';

var Plan = DS.Model.extend({
	name: DS.attr('string'),
	token: DS.attr('string'),
	price: DS.attr('number'),
	conversations: DS.attr('number')
});

Plan.reopenClass({
	FIXTURES: [{
		id: 'Basic',
		name: 'Basic',
		token: 'GAN283WMZSTDU',
		price: 19,
		conversations: 75
	}, {
		id: 'Pro',
		name: 'Pro',
		token: 'GAN283WMZSTDU',
		price: 49,
		conversations: 250
	}, {
		id: 'Enterprise',
		name: 'Enterprise',
		token: 'GAN283WMZSTDU',
		price: 99,
		conversations: 750
	}]
});

export default Plan;