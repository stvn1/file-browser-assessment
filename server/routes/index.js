const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')


/**File sender */
router.get('/file/:filepath/:filename', (req,res,next) =>{
    console.log(req.params)
    // let filepath =req.params.filepath.replaceAll('.','/')
    let filepath = req.params.filepath.split('.').join('/')
    let fileToGet = '../'+ filepath +'/'+ req.params.filename;
    console.log(fileToGet)
    res.sendFile(path.join(__dirname, fileToGet));

})



/* Get All */
router.get('/home/:path?(*)', (req,res,next)=>{
    let dir;
    let dirPath = req.params.path;
    if (!dirPath) {
        dir='./home'
    }
    else{
        console.log(req.originalUrl);
        dir='.' + req.originalUrl
    }

    const files = [];
    const folders = []
    let getPath = '';
    if(getPath =='') getPath=req.originalUrl.substring(1)

    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();
      const isDir = stat.isDirectory();
      //localhost:
      // getPath = filepath.split('server')[1].split('/').slice(0, -1).join('/').substring(1)
      //heroku:
      getPath = filepath.split('app')[1].split('/').slice(0, -1).join('/').substring(1)
      if (isFile) files.push(name + ext);
      if (isDir) folders.push(name)
    });
    
    res.json({dir:folders, files:files, path:getPath})
})



module.exports = router; 