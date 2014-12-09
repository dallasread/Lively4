import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		var $ = Ember.$;
		var controller = this.get('controller');
		$(".introducers tbody").sortable({
			items: ".introducer",
			update: function() {
				var ordinals = {};
				$(this).find('.introducer').each(function(ordinal) {
					ordinals[$(this).data('id')] = ordinal;
				});
				controller.updateOrdinals(ordinals);
			}
		});
	}
});
