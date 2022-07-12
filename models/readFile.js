const fs  = require('fs')

/**
 * This function to read file content
 * @param {String} path file path
 * @returns {Promise} return a Promise
 */
function getFileContent(path){
    return new Promise((resolve, reject)=>{
        fs.readFile(path, (error, data)=>{
            if(error){
                reject({status: "readfile error", error: error})
            }else{
                resolve(data)
            }
        })
    })
}


module.exports = {getFileContent}