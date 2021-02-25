import UserController from "./controllers/UserController";
import SurveyController from "./controllers/SurveyController";
import { Router } from "express";

const router = Router()

router.post('/users', UserController.create)
router.post('/surveys', SurveyController.create)
router.get('/surveys', SurveyController.show)

export default router