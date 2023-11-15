const express = require('express')
const router = express.Router()
var cmd = require('node-cmd');
var enrollAdmin = require('../enrollAdmin')
var invoke = require('../invoke')
var registerUser = require('../registerUser')

// Route 1 enrolladmin get
router.get('/enrolladmin', async(req, res) => {
    try { 
        console.log('from enroll admin api')
        console.log(req.header('usertype'))
        enrollAdmin(req.header('usertype'))
        // cmd.run(`wsl -e sh -c "cd ../.././fabric-samples/DDA/javascript && node enrollAdmin.js ${req.header('usertype')}"`, function(err, data, stderr) {
        //     console.log(data)
        //     if(err) {
        //         console.log(err)
        //     }
        // })
    } catch(error) {
        console.log(error);
    }
})

// Route 2 registeruser get
router.get('/registeruser', async(req, res) => {
    try {
        console.log('from register user api')
        registerUser(req.header('user'),req.header('usertype'))

        // cmd.run(`wsl -e sh -c "cd \"../.././fabric-samples/DDA/javascript\" && node registerUser.js ${req.header('user')} ${req.header('usertype')}"`, function(err, data, stderr) {
        //     console.log(data)
        //     if(err) {
        //         console.log(err)
        //     }
        // })
    } catch(error) {
        console.log(error);
    }
})

router.get('/invoke', async(req, res) => {
    try {
        console.log('from invoke api')
        // (func,productId,user,obj,usertype,channel,cc)
        invoke(req.header('func'), req.header('transactionId'), req.header('user'), req.header('obj'),req.header('usertype'), req.header('channel'),  req.header('cc'))
        // cmd.run(`wsl -e sh -c "cd \"../.././fabric-samples/DDA/javascript\" && node invoke.js ${req.header('obj')} ${req.header('usertype')} ${req.header('channel')} ${req.header('func')} ${req.header('transactionId')} ${req.header('user')} ${req.header('cc')}"`, function(err, data, stderr) {
            // console.log(data)
            // if(err) {
                // console.log(err)
            // }
        // })
    } catch(error) {
        console.log(error);
    }
})

module.exports = router