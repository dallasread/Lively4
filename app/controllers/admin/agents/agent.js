import Ember from 'ember';

export default Ember.ObjectController.extend({
	registering: false,
	watchActive: function() {
		this.session.chatbox.save();
	}.observes('admin'),
	actions: {
		register: function(agent) {
			var e = this;
			var register = function(auth) {
				agent.set('registered', true);

				e.session.chatbox.save().then(function() {
					window.LCSDB.resetPassword({
				    email: agent.get('email')
				  }, function() {
						e.set('registering', false);
						Ember.$.jGrowl('Agent has been activated. They will receive an email with instructions to log in.', {
							position: 'bottom-right'
						});
				  });
				});
			}
			
			e.set('registering', true);
			
			window.LCSDB.createUser({
			  email: agent.get('email'),
			  password: md5(agent.get('email'))
			}, function(error) {
				if (error) {
			    switch (error.code) {
			      case "EMAIL_TAKEN":
			        register();
			        break;
			      case "INVALID_EMAIL":
							e.set('registering', false);
			        alert('Please enter a valid email address.');
			        break;
			      default:
							e.set('registering', false);
			        alert(error);
			    }
			  } else {
					register();
				}
			});
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
