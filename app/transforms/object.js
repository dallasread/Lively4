import Ember from 'ember';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    if (!Ember.$.isPlainObject(serialized)) {
      return {};
    } else {
      return serialized;
    }
  },

  serialize: function(deserialized) {
    if (!Ember.$.isPlainObject(deserialized)) {
      return {};
    } else {
      return deserialized;
    }
  }
});