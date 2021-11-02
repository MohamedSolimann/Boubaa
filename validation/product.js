const { check, body, validationResult } = require("express-validator");
module.exports = {
  productValidation: [
    check("name").not().isEmpty(),
    check("price").not().isEmpty(),
    check("status").not().isEmpty(),
    check("image").not().isEmpty(),
    check("category").not().isEmpty(),
    body("name").trim(),
    body("category").trim(),
    body("image").trim(),
  ],
  catchValidationErrors: (req, res, next) => {
    let errorObject = validationResult(req);
    if (errorObject.errors.length > 0) {
      res.json({
        message: "Invalid Value, Please try again",
        data: errorObject.errors,
      });
    } else {
      next();
    }
  },
};
