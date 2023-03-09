const { User, Thought } = require("../models");

module.exports = {
    getThought (req, res) {
        Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    getSingleThought (req, res) {
        Thought.findOne({ _id: req.params.id })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    createThought (req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    updateThought (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.status(400).json(err));
    },

    deleteThought (req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    createReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought frind with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },

    deleteReaction (req, res) { Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought find with this ID!" })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    };
