import {body, validationResult} from 'express-validator';
export const validateUser = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];