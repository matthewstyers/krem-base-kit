var keystone = require('keystone');
var WorkOrder = keystone.list('WorkOrder');


exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;
  locals.workOrders = req.session.workOrders || [];
  var form = locals.formData = req.body || {};
  locals.validationErrors = {};

  var getWorkOrders = function(done) {
    WorkOrder.model
      .find()
      .where({
        tenet: locals.tenet._id
      })
      .exec(function(err, workOrders) {
        if (err) throw new Error(err);
        req.session.workOrders = locals.workOrders = workOrders;
        done();
      });
  };

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'work-orders';
  view.on('get', function(next) {
    getWorkOrders(next);
  });
  view.on('post', {
    action: 'newWorkOrder'
  }, function(next) {
    var newWorkOrder = new WorkOrder.model(),
			updater = newWorkOrder.getUpdateHandler(req);

		updater.process(form, {
			flashErrors: true,
			fields: 'name, tenet, space, description',
			errorMessage: 'There was a problem submitting your WorkOrder:'
		}, function(err, result) {
      console.log(result);
			if (err) {
				locals.validationErrors = err.errors;
        next();
			} else {
        getWorkOrders(next);
			}
		});
  });
  // Render the view
  view.render('tenets/work-orders');
};
