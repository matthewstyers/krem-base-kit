const PORT = process.env.PORT || 5000;

module.exports = {
  'brand': process.env.BRAND || 'brand not set',
  'cluster': false,
  'hostname': process.env.DOCKER_MACHINE_IP || `http://localhost:${PORT}`,
  'maxClusterThreads': 2,
  'mongo': process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017',
  'port': PORT,
  'projectName': process.env.PROJECT_NAME || 'untitled project'
}
