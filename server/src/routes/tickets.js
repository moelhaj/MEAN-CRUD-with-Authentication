const router = require("express").Router();
const Ticket = require("../models/Ticket");
const { auth } = require("../middleware/auth");

// Get All Tickets
router.get("/", auth, (req, res) => {
    Ticket.find()
        .populate("user", "_id")
        .populate("user", "name")
        .populate("project", "title")
        .exec((err, tickets) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(tickets);
        });
});

// Get one tickets
router.get("/:id", auth, (req, res) => {
    Ticket.findOne({ _id: req.params.id })
        .populate("user", "_id")
        .populate("user", "name")
        .populate("project", "title")
        .exec((err, ticket) => {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(ticket);
        });
});

// Create new Tickets
router.post("/", auth, (req, res) => {
    const newTicket = new Ticket({
        title: req.body.title,
        severity: req.body.severity,
        status: req.body.status,
        details: req.body.details,
        user: req.body.user,
        project: req.body.project,
    });

    newTicket.save((err, ticket) => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(ticket);
    });
});

// Update Ticket
router.put("/:id", auth, (req, res) => {
    let id = req.params.id.trim();
    Ticket.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                title: req.body.title,
                severity: req.body.severity,
                status: req.body.status,
                details: req.body.details,
                user: req.body.user,
            },
        }
    ).exec(err => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json("Ticket updated");
    });
});

// Delete Ticket
router.delete("/:id", auth, (req, res) => {
    let id = req.params.id.trim();
    Ticket.findOneAndDelete({ _id: id }, err => {
        if (err) return res.status(500).send(err.message);
        res.status(200).json("Ticket Deleted");
    });
});

module.exports = router;
