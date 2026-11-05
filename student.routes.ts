
import { Router } from 'express';

import {getStudent, getStudentById, addStudent, updatestudent, deleteStudent} 
from './student.controllers.js';

const router = Router();

router.get('/', getStudent);
router.get('/:id', getStudentById);
router.post('/', addStudent);
router.put('/:id', updatestudent);
router.delete('/:id', deleteStudent);

export default router;