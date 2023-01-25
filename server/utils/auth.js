const jwt = require('jsonwebtoken')

const secret = 'myawesomesecret'

module.exports = {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id }
    return jwt.sign({ data: payload }, secret, { expiresIn: '2h' })
  }
}