var ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = {
    secret: 'mucuxita',
    database: 'mongodb://dbuser:123mudar#@ds139428.mlab.com:39428/driveondb',
    jwtSecret: 'socorrammesubinoonibusemmarrocos',
    jwtSession: {session: false}
    //jwtFromRequest: ExtractJwt.fromAuthHeader()
}
//