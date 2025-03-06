import express from "express";
import adminModel from "../../models/Admin/Admin.js";

const router = express.Router();

// Get all admins
router.get("/getalladmins", async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get admin by ID
router.get("/getadmin/:id", async (req, res) => {
  try {
    const admin = await adminModel.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all admins
router.delete("/deleteall", async (req, res) => {
  try {
    await adminModel.deleteMany();
    res.json({ message: "All admins deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete admin by ID
router.delete("/deletebyid/:id", async (req, res) => {
  try {
    const admin = await adminModel.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit admin by ID
router.put("/editbyid/:id", async (req, res) => {
  try {
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin)
      return res.status(404).json({ message: "Admin not found" });
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
