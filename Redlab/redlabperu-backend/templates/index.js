const ST = require('stjs');

module.exports = function makeTemplate(data, pathTemplate){
    return ST.select(require('./'+pathTemplate))
               .transform(data)
               .root()
}