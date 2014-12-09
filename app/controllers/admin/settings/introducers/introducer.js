import Ember from 'ember';

export default Ember.ObjectController.extend({
	types: [{
		label: "Text",
		value: "text"
	}, {
		label: "Email",
		value: "email"
	}],
	validators: [{
		label: "None",
		value: "none"
	}, {
		label: "Email",
		value: "email"
	}, {
		label: "Present",
		value: "presence"
	}],
	watchActive: function() {
		this.session.chatbox.save();
	}.observes('active', 'required', 'type', 'validator', 'ordinal')
});
