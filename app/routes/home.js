module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.response('Hello world!').code(200)
  }
}
