var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;

var Suite = new keystone.List('Suite', {
  path: 'suites',
  singular: 'suite',
  plural: 'suites',
  label: 'Suites',
  defaultColumns: 'title, address',
  map: {
    name: 'title'
  }
});

Suite.add({
  title: {
    type: Types.Text
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
  property: {
    type: Types.Relationship,
    ref: 'Property'
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  availableDate: {
    type: Date,
    dependsOn: {
      isAvailable: false
    }
  },
  featureImage: {
    type: Types.LocalFile,
    dest: 'public/space-images',
    prefix: '/space-images/',
    filename: function(item, file) {
      return item.id + '.' + file.extension;
    }
  },
  images: {
    type: Types.LocalFiles,
    dest: 'public/space-images',
    prefix: '/space-images/',
    default: null,
    urls: {
      type: Types.TextArray
    }
  },
  description: {
    type: Types.Textarea
  },
  squareFeet: {
    type: Types.Number
  },
  listPrice: {
    type: Types.Number,
    note: 'Price per sq. ft. annually'
  },
  keyFeatures: {
    type: Types.TextArray
  }
});


Suite.schema.pre('save', function(next) {
  var self = this;
  console.log(self);
  if (!self.title && !self.address.street2) {
    next(new Error('Your suite will look better online if you give it a title and/or Address Line 2.'));
  } else if (!self.title && self.address.street2) {
    self.title = self.address.street2;
  }
  next(self);
});
Suite.schema.pre('save', function(next) {
  var self = this;
  self.address.geo = self._.address.googleLookup('', true, next);
});

Suite.schema.pre('save', function(next) {
  var self = this;
  if (self.images.length) {
    var urls = [];
    async.each(self.images, function(image, cb) {
      console.log(image);
      console.log(urls);
      var basePath = '/space-images/';
      urls.push(basePath.concat(image.filename));
      cb();
    }, function(err) {
      if (err) {
        next(err);
      }
      self.images.urls = urls;
    });
  }
  next();
});

Suite.register();
