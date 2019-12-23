const Data = require('../Model/data')

module.exports = {
    insertData: data => {
        return new Promise((resolve, reject) => {
            Data.insertMany(data, function (err, res) {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        }) 
       
    }
}