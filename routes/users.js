const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    loginHandle,
    deleteUser,
    updateUser,
    getParamUserid
} = require('../controllers/users.js')

router.get('/', getUsers)
     .post('/', loginHandle)
     .delete('/', deleteUser)
     .put('/', updateUser)
     .get('/:userid', getParamUserid)



module.exports = router