const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')
const { protect, adminOnly } = require('../middleware/authMiddleware')

router.get('/applications', protect, jobController.getAppliedJobs)
router.get('/', protect, jobController.getAllJobs)
router.post('/', protect, adminOnly, jobController.createJob)
router.put('/:id', protect, adminOnly, jobController.updateJob)
router.delete('/:id', protect, adminOnly, jobController.deleteJob)
router.post('/:id/apply', protect, jobController.applyJob)

module.exports = router
