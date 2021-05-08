const express = require('express')
const router = express.Router();
const fs = require('fs')
const fsp = require('fs').promises;
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

/** Get all Async version */
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
  getFiles(dir).then(data => {

    if(data.path==''){data.path = req.originalUrl.substring(1)}
    res.json(data)

  }
   ).catch(next);
})


async function getFiles(dir, results={
  dir:[],
  files:[],
  path:''
}) {
  let files = await fsp.readdir(dir, {withFileTypes: true});
  for (let f of files) {
      let fullPath = path.join(dir, f.name);
      results.path =fullPath.split('/').slice(0,-1).join('/');
      if (f.isDirectory()) {
        results.dir.push(f.name)
      } else {
        results.files.push(f.name)
      }
  }
  return results;
}










/* Get All */
// router.get('/home/:path?(*)', (req,res,next)=>{
//     let dir;
//     let dirPath = req.params.path;
//     if (!dirPath) {
//         dir='./home'
//     }
//     else{
//         console.log(req.originalUrl);
//         dir='.' + req.originalUrl
//     }

//     const files = [];
//     const folders = []
//     let getPath = '';
//     if(getPath =='') getPath=req.originalUrl.substring(1)

//     fs.readdirSync(dir).forEach(filename => {
//       const name = path.parse(filename).name;
//       const ext = path.parse(filename).ext;
//       const filepath = path.resolve(dir, filename);
//       const stat = fs.statSync(filepath);
//       const isFile = stat.isFile();
//       const isDir = stat.isDirectory();
//       //localhost:
//       getPath = filepath.split('server')[1].split('/').slice(0, -1).join('/').substring(1)
//       //heroku:
//       // getPath = filepath.split('app')[1].split('/').slice(0, -1).join('/').substring(1)
//       if (isFile) files.push(name + ext);
//       if (isDir) folders.push(name)
//     });
    
//     res.json({dir:folders, files:files, path:getPath})
// })



module.exports = router; 