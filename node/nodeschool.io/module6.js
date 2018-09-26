var fs = require('fs')
var path=require('path')
module.exports=function(folder,extension,callback){
    fs.readdir(folder,function bar(err,files){
        if(err){
            return callback(err,null)
        }
        var ext='.'+extension
        //filter更好些
        // var temp=[]
        // files.forEach(file=>{
        //     if(path.extname(file)===ext){
        //         temp.push(file)
        //     }
        // })
        //filter收割
        var filters=files.filter(file=>{
            return path.extname(file)===ext
        })
        callback(null,filters)
    })
}