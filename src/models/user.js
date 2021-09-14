const mongoose = require("mongoose");
const Filter = require("bad-words");
const filter = new Filter();
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: (value) => {
        if (filter.isProfane(value)) throw new Error("Name contains profane language");
      },
      minLength: 3,
      maxLength: 60,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      minLength: 5,
      maxLength: 100,
      validate: (value) => {
        if (!validator.isEmail(value)) throw new Error("Something is wrong about the email")
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 7,
      validate: (value) => {
        if (!validator.isStrongPassword(value)) throw new Error();
      },
    },
    id: {
      type: String,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      validate: (value) => {
        if (filter.isProfane(value)) throw new Error("Description contains profane language");
      },
      default: "",
      maxLength: 200,
    },
    age: {
      type: Number,
      validate: (value) => {
        if (value < 0) throw new Error("Age cannot be negative");
      },
      required: true,
      min: 3,
      max: 100,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
})

const user = mongoose.model("User", userSchema);

module.exports = user;
