exports = module.exports = function(req) {
  require('./' + req.params.slug);
};
