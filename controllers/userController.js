const { User, Thought } = require("../models");

module.exports = {
    getUser(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
},

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            {runValidators: true, new: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    }
};
