import Ember from 'ember';

export default Ember.Controller.extend({
	textareaHasContent: function() {
		this.session.contact.set('typing', !!Ember.$.trim(this.body).length);
	}.observes('body')
});
