var keystone = require('keystone');
var Types = keystone.Field.Types;

var Inquiry = new keystone.List('Inquiry', {
  nocreate: true,
  noedit: true
});

Inquiry.add({
  name: {
    type: Types.Name,
    required: true
  },
  email: {
    type: Types.Email,
    required: true
  },
  phone: {
    type: String
  },
  inquiryType: {
    type: Types.Text,
    default: 'Contact Form - General Inquiry'
  },
  suite: {
    type: Types.Relationship,
    ref: 'Suite'
  },
  message: {
    type: Types.Text
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Inquiry.schema.pre('save', function(next) {
  this.wasNew = this.isNew;
  next();
});

Inquiry.schema.post('save', function() {
  if (this.wasNew) {
    console.log('email notifications disabled.');
  // this.sendNotificationEmail();
  }
});

Inquiry.schema.methods.sendNotificationEmail = function(callback) {

  if ('function' !== typeof callback) {
    callback = function() {};
  }

  var Inquiry = this;

  keystone.list('User')
    .model.find()
    .where('isAdmin', true)
    .exec(function(err, admins) {

      if (err) return callback(err);

      new keystone.Email('Inquiry-notification')
        .send({
          to: admins,
          from: {
            name: 'Styers.co',
            email: 'info@abstractmediaco.com'
          },
          subject: 'New inquiry from the internet',
          Inquiry: Inquiry
        }, callback);
    });
};

Inquiry.defaultSort = '-createdAt';
Inquiry.defaultColumns = 'name, email, inquiryType, suite, createdAt';
Inquiry.register();
