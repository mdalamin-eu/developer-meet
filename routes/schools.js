const express = require("express");
const router= express.Router();
const AuthGuard= require('../middleware/authguard')
const School = require('../controller/schools')




router.post('/school', AuthGuard, School.school)
router.patch('/schooladd/:id', AuthGuard, School.schoolAddByUser)
router.get('/school/:code', School.schoolBycode)
router.delete('/school/:id', School.DeleteEdu)


module.exports = router;