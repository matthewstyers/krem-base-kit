var keystone = require('keystone');
var Types = keystone.Field.Types;

var Property = new keystone.List('Property', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  },
  map: {
    publicId: 'key'
  },
  path: 'properties',
  singular: 'property',
  plural: 'properties',
  label: 'Properties'
});

Property.add({
  name: {
    type: Types.Text,
    required: true
  },
  address: {
    type: Types.Location,
    defaults: {
      country: 'United States',
      state: 'Texas'
    }
  },
  region: {
    type: Types.Relationship,
    ref: 'Region'
  },
  featureImage: {
    type: Types.LocalFile,
    dest: 'public/property-images',
    prefix: '/property-images/',
    filename: function(item, file) {
      return item.id + '.' + file.extension;
    }
  },
  suites: {
    type: Types.Relationship,
    ref: 'Suite',
    filters: {
      property: ':_id'
    },
    many: true
  },
  images: {
    type: Types.LocalFiles,
    dest: 'public/property-images',
    prefix: '/propery-images/'
  },
  description: {
    type: Types.Textarea
  },
  squareFeet: {
    type: Types.Number
  },
  keyFeatures: {
    type: Types.TextArray
  }
});

// Property.schema.methods.pre('save', function(next) {
// 	var hostname = config.hostname;
// 	var self = this;
// 	self.imageUrls.featureImage = host.concat(self.prefix, self.filename);
// 	self.images.forEach(image, function(done) {
// 		self.imageUrls.images.push()
// 	})
// })

Property.register();
