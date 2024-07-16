import { Router } from "express";
import {
  createTODO,
  updateTODO,
  deleteTODO,
  getAllTODOS,
  getTODOById,
} from "../controller/TodoController";

const router = Router();

router.post("/", createTODO);
router.put("/:id", updateTODO);
router.get("/:id", getTODOById);
router.get("/", getAllTODOS);
router.delete("/:id", deleteTODO);

export default router;
