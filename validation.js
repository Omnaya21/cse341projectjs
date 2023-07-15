const {check, validationResult} = require('express-validator');

const appointmentValidationRules = () => {
  return  [
    check('memberName', 'Member Name is required').not().isEmpty(),
    check('leaderName', 'Leader Name is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('email', "Invalid email").isEmail().not().isEmpty(),
    check('date', 'Invalid  date').not().isEmpty(),
    check('time', 'Invalid time').isTime().not().isEmpty(),
    check('status','Status is required').not().isEmpty()
  ]
}

const userValidationRules = () => {
  return  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password should have a minimum length of 6').isLength({'min': 6}),
    check('fullname', 'Fullname is required').not().isEmpty(),
    check('email', "Invalid email").isEmail().not().isEmpty(),
    check('type','Type is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty()
  ]
}

const idValidationRules = () => {
  return [
    check('id', 'Invalid or missing ID!.').not().isEmpty()
  ]
}

const validateCollection = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    console.log({err});
    extractedErrors.push({[err.path]: err.msg});
  });

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  appointmentValidationRules,
  userValidationRules,
  idValidationRules,
  validateCollection
};
