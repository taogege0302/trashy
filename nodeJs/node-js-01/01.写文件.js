var fs = require('fs');

fs.writeFile('./a.txt','ABC',function(err){
    console.log(err);
});