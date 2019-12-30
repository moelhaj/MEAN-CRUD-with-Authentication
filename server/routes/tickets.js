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

// Get All Tickets
router.get('/', (req, res) => {
    Ticket.find()
        .populate('user', '_id')
        .populate('user', 'name')
        .populate('project', 'title')
        .exec((err, tickets) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(tickets);
        });
});

// Get one tickets
router.get('/:id', (req, res) => {
    Ticket.findOne({ _id: req.params.id })
        .populate('user', '_id')
        .populate('user', 'name')
        .populate('project', 'title').exec((err, ticket) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(ticket);
        });
});

// Create new Tickets
router.post('/', (req, res) => {
    const newTicket = new Ticket({
        title: req.body.title,
        severity: req.body.severity,
        status: req.body.status,
        details: req.body.details,
        user: req.body.user,
        project: req.body.project
    });

    newTicket.save((err, ticket) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(ticket);
    });
});

// Update Ticket
router.put('/:id', (req, res) => {
    let id = req.params.id.trim();
    Ticket.findOneAndUpdate({ "_id": id }, {
        "$set": {
            "title": req.body.title,
            "severity": req.body.severity,
            "status": req.body.status,
            "details": req.body.details,
            "user": req.body.user
        }
    })
        .exec((err) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json('Ticket updated');
        });
});

// Delete Ticket
router.delete('/:id', (req, res) => {
    let id = req.params.id.trim();
    Ticket.findOneAndDelete({ "_id": id }, (err) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json('Ticket Deleted');
    });
});

module.exports = router;