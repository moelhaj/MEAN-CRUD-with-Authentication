const router = require('express').Router();
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const checkJwt = require('express-jwt');

router.use(checkJwt({ secret: process.env.JWT_SECRET }));
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json(err.message);
    }
});

// Get all projects
router.get('/', (req, res) => {
    Project.find()
        .populate({
            path: 'tickets',
            populate: {
                path:'user',
                model: 'User',
                select: 'name'
            }
        })
        .exec((err, projects) => {
            if (err) return res.status(500).json(err.message);
            res.status(200).json(projects);
        });
});

// Get one project
router.get('/:id', (req, res) => {
    Project.findOne({ _id: req.params.id })
        .populate('ticket', '_id')
        .populate('ticket', 'title')
        .populate('ticket', 'status')
        .populate('ticket', 'severity')
        .populate('ticket', 'user')
        .exec((err, project) => {
            if (err) return res.status(500).json(err.message);
            res.status(200).json(project);
        });
});

// Create project
router.post('/', (req, res) => {
    const newProject = new Project({
        title: req.body.title,
        status: req.body.status,
        details: req.body.details,
    });

    newProject.save((err, project) => {
        if (err) return res.status(500).json(err.message);
        res.status(200).json(project);
    });
});

// addTicket
router.put('/new/ticket/:id', (req, res) => {
    let id = req.params.id.trim();
    let ticket = req.body.ticket;
    Project.findOneAndUpdate(
        { _id: id },
        { "$push": { "tickets": ticket } })
        .exec((err, data) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(data);
        });
});

// removeTicket
router.put('/remove/ticket/:id', (req, res) => {
    let id = req.params.id.trim();
    let ticket = req.body.ticket;
    Project.findOneAndUpdate(
        { _id: id },
        { "$pull": { "tickets": ticket } })
        .exec((err, data) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(data);
        });
});

router.put('/:id', (req, res) => {
    let id = req.params.id.trim();
    Project.findOneAndUpdate({ "_id": id }, {
        "$set": {
            "title": req.body.title,
            "status": req.body.status,
            "details": req.body.details
        }
    })
        .exec((err) => {
            if (err) return res.status(500).json(err.message);
            res.status(200).json('Project updated');
        });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id.trim();
    Project.findOneAndDelete({ "_id": id }, (err) => {
        if (err) return res.status(500).json(err.message);
        res.status(200).json('project Deleted');
    });
});


module.exports = router;