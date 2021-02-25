import UserController from "./controllers/UserController";
import SurveyController from "./controllers/SurveyController";
import { Router } from "express";
import SendMailController from "./controllers/SendMailController";

const router = Router()

router.post('/users', UserController.create)
router.post('/surveys', SurveyController.create)
router.get('/surveys', SurveyController.show)
router.post('/sendmail', SendMailController.execute)

export default router