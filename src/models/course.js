const mongoose = require("mongoose");
const Filter = require("bad-words");
const filter = new Filter();

const Player = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
    lowercase: true,
    unique: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  score: {
    type: Number,
    default: 0,
  },
});

const Hint = new mongoose.Schema({
  hint: {
    type: String,
    trim: true,
    unique: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error("Hint contains profane language");
    },
  },
});

const Question = new mongoose.Schema({
  points: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error("Question contains profane language");
    },
  },
  answer: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error("Answer contains profane language");
    },
  },
  explanation: {
    type: String,
    trim: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error("Explanation contains profane language");
    },
  },
  hints: [
    {
      type: Hint
    }
  ],
});

const SceneObject = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      const types = ["hover", "click", "drag", "collide"];
      for (let i = 0; i < types.length; i++) {
        if (value.toLowerCase() === types) {
          return;
        }
      }
      throw new Error(
        `SceneObject must be of type Hover, Click, Drag or Collide`
      );
    },
  },
  information: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (filter.isProfane(value))
        throw new Error("SceneObject information contains profane language");
    },
  },
  disabled: {
    type: Boolean,
    default: false
  },
  contact : {
    type: String,
    default: null
  },
  transform: {
    x: {
      type: Number,
    },
    y: {
      type: Number
    }
  },
  img: {
    type: String,
    required: true
  }
});

const Scene = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  background: {
    type: String,
    required: true,
  },
  sceneObjects: [
    {
      type: SceneObject
    }
  ],
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  img: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  players: [
    {
      type: Player,
      required: true,
    },
  ],
  questions: [
    {
      type: Question,
      required: true,
    },
  ],
  scenes: [
    {
      type: Scene,
      required: true
    }
  ],
});

const course = mongoose.model("Course", CourseSchema);

module.exports = course;
