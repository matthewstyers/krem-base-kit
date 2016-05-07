var keystone = require('keystone');
var Types = keystone.Field.Types;

var Tenet = new keystone.List('Tenet');

Tenet.add({
  name: {
    type: Types.Name,
    required: true,
    index: true
  },
  organization: {
    type: Types.Text,
    initial: true,
    required: false,
    note: 'optional'
  },
  suites: {
    type: Types.Relationship,
    ref: 'Suite',
    many: true
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    index: true
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  }
});

Tenet.defaultColumns = 'name, email';
Tenet.register();
