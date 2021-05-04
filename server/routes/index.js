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



/* Root directory */
router.get('/home', (req,res,next)=>{
    res.json({dir:['myname'], files:[], path:'home'})
})
/* myName directory */
router.get('/myname', (req,res,next)=>{
    res.json({
        files:['filea.txt', 'fileb.txt'],
        dir:["projects"],
        path:'home/myname'
    
    })
})

/* Projects directory */
router.get('/projects', (req,res,next)=>{
    res.json({
        dir:['mysupersecretproject'],
        files:[],
        path:'home/myname/projects'
    
    })
})
/* mysupersecretproject directory */
router.get('/mysupersecretproject', (req,res,next)=>{
    res.json({
        files:['mysupersecretfile.txt'],
        dir:[],
        path:'home/myname/projects/mysupersecretproject'
    
    })
})



module.exports = router; 