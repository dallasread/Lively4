import DS from 'ember-data';

window.LCSDB = new window.Firebase("https://lcs4.firebaseio.com");

export default DS.FirebaseAdapter.extend({
	firebase: window.LCSDB
});