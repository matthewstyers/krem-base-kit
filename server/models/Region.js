var keystone = require('keystone');
var Types = keystone.Field.Types;

var Region = new keystone.List('Region', {
  path: 'regions',
  singular: 'region',
  plural: 'regions',
  label: 'Regions'
});

Region.add({
  name: {
    type: Types.Text,
    required: true,
    index: true
  },
  suites: {
    type: Types.Relationship,
    filters: {
      region: ':_id'
    },
    many: true,
    ref: 'Suite',
    index: true
  }
});

Region.defaultColumns = 'name';
Region.register();
