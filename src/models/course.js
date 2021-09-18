const mongoose = require("mongoose");
const express = require("express");
const Filter = require("bad-words");

const new_players = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const new_hints = new mongoose.Schema({
  type: String,
});

const new_questions = new mongoose.Schema({
  points: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
  hint: {
    type: [new_hints],
    required: true,
  },
});

const new_sceneObjects = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  // contact : {
  //     type:,
  //     required:,
  // },
});

const new_scenes = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    validate: (value) => {
      if (Filter.isProfane(value))
        throw new Error("Description has profane language");
    },
  },
  filename: {
    type: String,
    required: true,
  },
  sceneObjects: {
    type: [new_sceneObjects],
    required: true,
  },
});

const new_course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  players: {
    type: {
        new_players
    },
    required: true,
  },
  question: {
    type: {new_questions},
    required: true,
  },
  scenes: {
    type: {new_scenes},
    required: true,
  },
});

module.exports = mongoose.model("new_course", new_course);
