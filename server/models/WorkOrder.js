var keystone = require('keystone');
var Types = keystone.Field.Types;

var WorkOrder = new keystone.List('WorkOrder', {
  map: {
    name: 'summary'
  },
  autokey: {
    path: 'key',
    from: 'name'
  },
  label: 'Work Orders',
  path: 'work-orders',
  singular: 'work order',
  plural: 'work orders',
  sortable: 'true',
  track: true
});


WorkOrder.add({
  name: {
    type: Types.Text,
    required: true,
    initial: true,
    index: true
  },
  tenet: {
    type: Types.Relationship,
    ref: 'WorkOrder',
    required: true,
    initial: true
  },
  suite: {
    type: Types.Relationship,
    ref: 'Suite'
  },
  status: {
    type: Types.Select,
    options: [
      {
        label: 'Not Started',
        value: 'not-started'
      },
      {
        label: 'In Progress',
        value: 'in-progress'
      },
      {
        label: 'Finished',
        value: 'finished'
      }
    ],
    default: 'not-started'
  },
  description: {
    type: Types.Text
  }
});

WorkOrder.defaultColumns = 'name, tenet, suite';
WorkOrder.register();
