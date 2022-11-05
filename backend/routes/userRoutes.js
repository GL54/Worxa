const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  profile,
  updateUser,
  updateRating,
  getWorkers,
  updateProfile,
  test,
  imageUpload,
  getUserRating,
  getOtp,
  verifyOtp,
  sendOtp,
  resetPassword,
} = require("./controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const expressFormidable = require("express-formidable");

// router.route('/').get(loginUser).post(registerUser);
// router.route('/:id').put(updateUser).delete(deleteUser);

router.put("/employee/:id", updateUser);
router.post("/signup", registerUser);
router.post("/login", loginUser);
//for getting worker data
router.get("/workers", getWorkers);
router.get("/profile", protect, profile);

router.get('/all')

//for updating users profile
router.put("/update/:id", protect, updateProfile);

//image uploading route
router.post(
  "/image",
  protect,
  expressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
  imageUpload
);

//for rating
router.put("/rating/:id", updateRating);
//for getting rating value of the user
router.post("/getUserRating", getUserRating);

//for generating otp
router.post("/sendOtp", sendOtp);
router.post("/reset", resetPassword);

//for verifying otp
router.post("/verifyOtp", verifyOtp);

//for testing
router.put("/test/:id", test);

module.exports = router;
