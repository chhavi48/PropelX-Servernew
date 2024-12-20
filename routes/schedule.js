// routes/schedule.js

const router = require("express").Router();
const ClassSchedule = require("../models/ClassSchedule");

// POST /schedule/class - Schedule a new class (already created)
router.post("/class", async (req, res) => {
  try {
    console.log("Scheduling class with data:", req.body);

    const newClass = await ClassSchedule.create({
      batch: req.body.batch,
      semester: req.body.semester,
      subject: req.body.subject,
      date: req.body.date,
      college: req.body.college,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      createdBy: req.body.createdBy,
    });

    console.log("Class scheduled successfully with ID:", newClass._id);

    res.status(201).json({
      message: "Class scheduled successfully",
      classId: newClass._id,
    });
  } catch (error) {
    console.error("Error during scheduling:", error);
    res
      .status(500)
      .json({ error: "Failed to schedule class. Please try again later." });
  }
});

// GET /schedule/classes - Get list of all scheduled classes
router.get("/classes", async (req, res) => {
  try {
    console.log("Fetching scheduled classes list");

    // Fetch all scheduled classes from the database
    const classes = await ClassSchedule.find();

    console.log("Fetched classes:", classes);

    // Send the fetched classes as a JSON response
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching class schedule list:", error);
    res.status(500).json({
      error: "Failed to retrieve class schedules. Please try again later.",
    });
  }
});
router.delete('/class/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await ClassSchedule.findByIdAndDelete(id);
        
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
        console.error('Error deleting class:', err);
        res.status(500).json({ message: 'Failed to delete class' });
    }
})

module.exports = router;
