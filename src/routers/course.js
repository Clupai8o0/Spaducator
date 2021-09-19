const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const { resp } = require("../helper/response");

router.post("/add/course", async (req, res) => {
  const { name, img, points, players } = req.body;
  try {
    const course = new Course({
      name, 
      img,
      points,
      players
    });
    await course.save();

    //? 201 stands for created
    res.status(201).send(resp(true, "Created successfully"));
  } catch (error) {
    res.status(500).send(resp(false, error.message));
  }
});

//? question
router.put("/course/add/question/:id", async (req, res) => {
  const id = req.params.id;
  const { points, question, answer, explanation, hints } = req.body;
  try {
    if (!points || !question || !answer || !explanation) 
      throw new Error("Missing required parameters")
    
    await Course.findByIdAndUpdate(id, {
      $push: {
        questions: {
          question, 
          answer,
          points,
          explanation,
          hints: (!hints) ? [] : hints
        }
      }
    })
    res.status(200).send(resp(true, "Successfully added question"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  } 
})
router.delete("/course/delete/question/:courseId&:questionId", async (req, res) => {
  const courseId = req.params.courseId;
  const questionId = req.params.questionId;
  try {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Couldn't find course");

    const questions = course.questions.filter(question => {
      return question._id != questionId;
    })
    await Course.findByIdAndUpdate(courseId, {
      $set: {
        questions
      }
    })
    res.status(200).send(resp(true, "Deleted question"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
})

//? player
router.put("/course/add/player/:id", async (req, res) => {
  const courseId = req.params.id;
  const { name, id, score } = req.body;
  try {
    if (!name || !id) 
      throw new Error("Missing required parameters")
    
    await Course.findByIdAndUpdate(courseId, {
      $push: {
        players: {
          name,
          id,
          score: !score ? 0 : score,
        },
      },
    });
    res.status(200).send(resp(true, "Successfully added player"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  } 
})
router.delete("/course/delete/player/:courseId&:playerId", async (req, res) => {
  const courseId = req.params.courseId;
  const playerId = req.params.playerId;
  try {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Couldn't find course");

    const players = course.players.filter(player => {
      return player.id != playerId;
    })
    await Course.findByIdAndUpdate(courseId, {
      $set: {
        players
      }
    })
    res.status(200).send(resp(true, "Removed player"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
})

//? Scenes
router.put("/course/add/scene/:id", async (req, res) => {
  const courseId = req.params.id;
  const { name, background, sceneObjects } = req.body;
  try {
    if (!name || !background || !sceneObjects) 
      throw new Error("Missing required parameters")
    
    if (typeof sceneObjects !== "object")
      throw new Error("SceneObject must be a array");
    if (sceneObjects.length === 0)
      throw new Error("sceneObjects is empty");
    
    for (let i = 0; i < sceneObjects.length; i++) {
      if (
        !sceneObjects[0].name ||
        !sceneObjects[0].type ||
        !sceneObjects[0].information ||
        sceneObjects[0].disabled == null ||
        sceneObjects[0].contact == null
      )
        throw new Error("SceneObject is missing some parameter");
    }

      await Course.findByIdAndUpdate(courseId, {
        $push: {
          scenes: {
            name,
            background,
            sceneObjects,
          },
        },
      });
    res.status(200).send(resp(true, "Successfully added scene"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  } 
})
router.delete("/course/delete/scene/:courseId&:sceneId", async (req, res) => {
  const courseId = req.params.courseId;
  const sceneId = req.params.playerId;
  try {
    const course = await Course.findById(courseId);
    if (!course) throw new Error("Couldn't find course");

    const scenes = course.scenes.filter(scene => {
      return scene._id != sceneId;
    })
    await Course.findByIdAndUpdate(courseId, {
      $set: {
        scenes
      }
    })
    res.status(200).send(resp(true, "Removed scene"));
  } catch (e) {
    res.status(500).send(resp(false, e.message));
  }
})

router.get("/courses", async (req ,res) => {
  try {
    const courses = await Course.find({});
    if (!courses) throw new Error("No courses came from the database");

    res.status(200).send(resp(true, courses));
  } catch (err) {
    res.status(500).send(resp(false, err.message));
  }
})

//todo add auth
router.delete("/delete/course/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send(resp(true, "Deleted course"));
  } catch (err) {
    res.status(500).send(resp(false, err.message));
  }
})

module.exports = router;
