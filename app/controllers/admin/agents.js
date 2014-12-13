import Ember from 'ember';

export default Ember.ArrayController.extend({
	actions: {
		createAgent: function() {
			var agent = this.store.createRecord('agent', {
				name: "",
				email: ""
			});
			this.session.chatbox.get('agents').addObject(agent);
			this.session.chatbox.save();
		},
		deleteAgent: function(agent) {
			if (confirm("Are you sure you want to delete this agent?")) {
				this.session.chatbox.get('agents').removeObject(agent);
				this.session.chatbox.save();
			}
		},
		chooseAvatar: function(agent) {
			var e = this;
			
			filepicker.pick(
			  {
			    mimetypes: ['image/*'],
			    services:['BOX', 'COMPUTER', 'DROPBOX', 'FACEBOOK', 'GOOGLE_DRIVE', 'FLICKR', 'INSTAGRAM', 'IMAGE_SEARCH', 'URL', 'WEBCAM'],
					openTo: 'COMPUTER'
			  },
			  function(blob){
					agent.set('avatar', blob.url);
					e.session.chatbox.save();
					
					//filepicker.convert(
					//  blob,
					//  {
					//    width: 75,
					//    height: 75,
					//		fit: 'clip'
					//  },
					//  function(new_blob){
					//    console.log(new_blob.url);
					//  }
					//)
			  }
			);
		}
	}
});
