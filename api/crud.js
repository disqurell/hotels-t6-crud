const router = require("express").Router();

const e = require("express");
const { db } = require("../db/mock_db.js");

/**
 * @route   POST /user
 * @desc    Register a new user
 */
router.post("/", async (req, res) => {
  data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({
      message: "Incorrect data",
    });
  }

  if (db.getUserByEmail(data.email)) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  if (db.createUser(data.email, data.password)) {
    res.status(201).send({
      message: "User created successfully",
    });
  } else {
    res.status(400).json({ message: "Something went wrong..." });
  }
});

/**
 * @route   GET /user
 * @desc    Return user by id
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Incorrect id",
    });
  }
  let user = db.getUser(id);

  if (user) {
    res.status(201).send({ user });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

/**
 * @route   DELETE /user
 * @desc    Delete a user
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  data = req.body;

  if (Object.keys(data).length === 0 && data.constructor === Object) {
    return res.status(400).json({
      message: "Incorrect data",
    });
  }

  if (db.getUser(id)) {
    db.updateUser(id, data);

    res.status(201).send({ message: "User updated successfully" });
  } else {
    res.status(403).send({ message: "User not found" });
  }
});

/**
 * @route   DELETE /user
 * @desc    Delete a user
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "No id found",
    });
  }

  let user = db.getUser(id);

  if (user) {
    db.deleteUser(id);

    res.status(201).send({ message: "User deleted successfully" });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
