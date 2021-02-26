import UserController from "./controllers/UserController";
import SurveyController from "./controllers/SurveyController";
import { Router } from "express";
import SendMailController from "./controllers/SendMailController";
import AnswerController from "./controllers/AnswerController";
import NPSController from "./controllers/NPSController";

const router = Router()

router.post('/users', UserController.create)
router.post('/surveys', SurveyController.create)
router.get('/surveys', SurveyController.show)
router.post('/sendmail', SendMailController.execute)
router.get('/answers/:value', AnswerController.execute)
router.get('/nps/:survey_id', NPSController.execute)

export default router