const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createJob = async (req, res) => {
  const { company, position, type, location } = req.body
  try {
    const job = await Job.create({
      company,
      position,
      type,
      location,
      createdBy: req.user.id
    })
    res.status(201).json(job)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateJob = async (req, res) => {
  const { company, position, type, location } = req.body
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    job.company = company || job.company
    job.position = position || job.position
    job.type = type || job.type
    job.location = location || job.location
    const updated = await job.save()
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' })
    }
    await job.deleteOne()
    res.json({ message: 'Job deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already applied' })
    }
    job.applicants.push(req.user.id)
    await job.save()
    res.json({ message: 'Applied successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ applicants: req.user.id })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getAllJobs, createJob, updateJob, deleteJob, applyJob, getAppliedJobs }