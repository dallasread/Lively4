import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
	firebase: window.LCSDB
});