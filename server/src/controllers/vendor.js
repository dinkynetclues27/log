
var fs = require("fs");

const getvendorlist = ()=>{
    // var dirPath = 'vendors/';
    // var result = [];

    fs.readdir('vendors/', function(err, files) {
        if (err)
            console.log(err);
        else
            files.map(function(f) {
                return 'vendors/'+f;
            });
            return files;
    })
}

module.exports = getvendorlist;