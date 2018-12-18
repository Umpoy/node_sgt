const configValues = require('./config');

module.exports = {
    getDbConnectionString: () => {
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds139334.mlab.com:39334/node_sgt'
    }
}