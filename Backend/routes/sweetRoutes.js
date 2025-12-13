import express from "express";
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweetController.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

router.post("/", protect, isAdmin, addSweet);
router.get("/", getSweets);
router.get("/search", searchSweets);

router.put("/:id", protect, isAdmin, updateSweet);
router.delete("/:id", protect, isAdmin, deleteSweet);

router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, isAdmin, restockSweet);

export default router;
