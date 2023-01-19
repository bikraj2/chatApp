const express = require('express')

const router = express.Router()


router.get('/',(req,res)=>{
    res.status(400).json({msg:"Server is running properly."})
})

module.exports = router