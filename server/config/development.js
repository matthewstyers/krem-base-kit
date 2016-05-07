module.exports = {
  gulp: {
    dumpHtml: false
  },
  hostname: process.env.DOCKER_MACHINE_IP,
  server: {
    cluster: false
  }
}
