import Ember from 'ember';

export default Ember.View.extend({
	pathRegex: function(fragment) {
		fragment = Ember.$.trim(fragment);
		fragment = fragment.replace(/\*/g, "(.*?)");
		fragment = new RegExp("(" + fragment + "|" + fragment + "/)$", "i");
		return fragment;
	},
	currentUrl: function() {
		return window.location.protocol + "//" + window.location.host + window.location.pathname;
	},
	isIncluded: function(included) {
		var e = this;
		var include = false;
		var included = included.split(',');
		
		included.forEach(function(path) {
			if (path.length && e.pathRegex(path).test(e.currentUrl())) {
				include = true;
				return;
			}
		});

		return include;
	},
	didInsertElement: function() {
		var e = this;
		var found = false;

		if (this.session.visitor && !this.session.visitor.get('messages').get('length')) {
			this.session.chatbox.get('triggersSorted').forEach(function(trigger) {
				if (e.isIncluded(trigger.get('include')) && !e.isIncluded(trigger.get('exclude'))) {
					if (!found) {
						found = true;
						setTimeout(function() {
							if (!e.session.visitor.get('messages').get('length')) {
								var message = e.store.createRecord('message', {
									body: trigger.get('message'),
									agent: e.session.visitor.agent,
									from_agent: true
								});
    
								e.session.visitor.get('messages').addObject(message);
								e.session.visitor.set('triggered_by', trigger.get('message'));
								e.session.visitor.save();
							}
						}, parseFloat(trigger.get('delay')) * 1000);
					}
				}
			});
		}
	}
});
