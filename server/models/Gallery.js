
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
});

Gallery.add({
  name: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  featureImage: {
    type: Types.LocalFile,
    dest: 'public/gallery-images',
    prefix: '/gallery-images/',
    filename: function(item, file) {
      return file.originalname;
    }
  },
  images: {
    type: Types.LocalFiles,
    dest: 'public/gallery-images',
    prefix: '/gallery-images/',
    filename: function(item, file) {
      return file.originalname;
    },
    urls: {
      type: Types.TextArray
    }
  }
});

Gallery.register();
