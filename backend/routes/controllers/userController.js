//for controlling routes :ie taking the request and response as variables to make it easy

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const otpModel = require("../../model/otpModel");

const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  secure: true,
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

//for registering new users
//path: POST/user/signup
const registerUser = asyncHandler(async (req, res) => {
  const { name, dob, phone, email, location, password } = req.body;
  if (!name || !dob || !phone || !email || !location || !password) {
    console.log(req.body);
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  //check if user already exists
  const userExists =
    (await User.findOne({ email })) || (await User.findOne({ phone }));

  if (userExists) {
    res.status(400).json("user already exists");
    throw new Error("User already exists");
  }

  //password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating the user
  const user = await User.create({
    name,
    dob,
    phone,
    email,
    location,
    password: hashedPassword,
    type: "user",
    job: "none",
    price: "0",
    rating: "0",
    verify: false,
  });
  user.save().then((result) => {
    getOtp(result, res);
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      dob: user.dob,
      phone: user.phone,
      email: user.email,
      location: user.location,
      wlocation: user.location,
      token: generateToken(user._id),
      type: user.type,
      job: user.job,
      verify: user.verify,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }

  //post request for putting value into db
});

//updating for employee
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ updatedUser });
});

//for Loging in
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      location: user.location,
      wlocation: user.wlocation,
      wduration: user.wduration,
      job: user.job,
      price: user.price,
      sjob: user.sjob,
      sprice: user.sprice,
      type: user.type,
      rating: user.rating,
      image: user.image,
      verify: user.verify,
      token: generateToken(user._id),
    });
    if (user.verify === false) {
      user.save().then((result) => {
        getOtp(result, res);
      });
    }
  } else {
    res.status(400);
    throw new Error("invailid credentials");
  }

  //get request for getting values
});

//To recive workers data
const getWorkers = asyncHandler(async (req, res) => {
  const workers = await User.find(
    { type: { $eq: "employee" } },
    {
      _id: 1,
      image: 1,
      type: 1,
      id: 1,
      name: 1,
      phone: 1,
      price: 1,
      sprice: 1,
      sjob: 1,
      rating: 1,
      location: 1,
      wlocation: 1,
      job: 1,
      wduration: 1,
      ratedUsers: 1,
    }
  );
  res.json(workers);
});

//To recive the profile
const profile = asyncHandler(async (req, res) => {
  const {
    _id,
    name,
    email,
    dob,
    phone,
    type,
    job,
    sjob,
    price,
    sprice,
    rating,
    wlocation,
    location,
    wduration,
    image,
  } = await User.findById(req.user.id);
  console.log(price);
  res.json({
    id: _id,
    name,
    email,
    dob,
    phone,
    type,
    job,
    price,
    sjob,
    sprice,
    location,
    wlocation,
    rating,
    wduration,
    image,
  }); //get request for getting values
});

// const updateUser= asyncHandler(async (req, res) => {
//     res.status(200).json({message: 'update testing'});//put request for updation
// })

// const deleteUser= asyncHandler(async (req, res) => {
//     res.status(200).json({message: 'delete testing'});// delete request for deletion
// })

//Generating Tokens(JWT)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//for updating profile

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const data = req.body;

  if (
    req.body.oldPassword &&
    (await bcrypt.compare(req.body.oldPassword, user.password))
  ) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    data.password = hashedPassword;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({ updatedUser });
  } else if (!req.body.oldPassword && req.body.newPassword) {
    res.json("invalid password");
  } else {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({ updatedUser });
    res.status(200);
    throw new Error("Invalid password");
  }
  res.status(200).json({ updatedUser });
});

//image upload test
const imageUpload = async (req, res) => {
  // console.log("Image upload",req.files.image.path);
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("Image upload", result);
    const value = { url: result.secure_url, public_id: result.public_id };

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (e) {
    console.log(e);
  }
};

//update rating
const updateRating = asyncHandler(async (req, res) => {
  const { rating, employeeId, userId } = req.body;
  const employee = await User.findById(employeeId);
  console.log(employee.ratedUsers);

  const check = employee.ratedUsers.some((user) => user.ratedUser === userId);
  console.log("check" + check);
  if (!check) {
    const { ratedUsers } = await User.findById(employeeId);

    let rate = 0;
    ratedUsers.map((ratedusers, i) => {
      rate += Number(ratedusers.value);
    });
    rate = rate / (ratedUsers.length + 1);
    const update = await User.findByIdAndUpdate(
      employeeId,
      { $push: { ratedUsers: { ratedUser: userId, value: ratedUsers.value } } },
      { new: true }
    );
    //updating rating values

    const test = await User.findByIdAndUpdate(employeeId, {
      $set: { rating: rating },
    });
    res.json("hello" + update);
  } else {
    const data = await User.findById(employeeId);

    const update = await User.updateOne(
      { _id: employeeId, "ratedUsers.ratedUser": userId },
      { $set: { "ratedUsers.$.value": rating } }
    );

    const { ratedUsers } = await User.findById(employeeId);
    //updating rating values
    let rate = 0;
    ratedUsers.map((ratedusers, i) => {
      rate += Number(ratedusers.value);
    });
    rate = rate / ratedUsers.length;
    console.log(rate);
    const test = await User.findByIdAndUpdate(employeeId, {
      $set: { rating: rate },
    });

    // console.log(update,test)

    res.json("user already rated " + update);
  }
});

//for getting users rating data
const getUserRating = asyncHandler(async (req, res) => {
  const { employeeId, userId } = req.body;
  console.log(employeeId, userId);
  const { ratedUsers } = await User.findById(employeeId);

  // const update
  const value = ratedUsers.filter((ratedValue) => {
    return ratedValue.ratedUser === userId;
  });

  res.status(200).json({ value: value[0].value });
});

//to get get otp
const getOtp = async ({ id, email }, res) => {
  try {
    console.log(email);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: "WORXA<devilsok8@gmail.com>",
      to: email,
      subject: "Verify you Email",
      html: `<p>Your otp is ${otp}</p>`,
    };

    //hashing otp
    const salt = 10;
    const hashedOtp = await bcrypt.hash(otp, salt);
    const otpVerification = await new otpModel({
      userId: id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await otpVerification.save();
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

//verify otp
const verifyOtp = asyncHandler(async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error("empty otp details");
    } else {
      const verify = await otpModel.find({ userId });
      if (verify.length <= 0) {
        throw new Error("Account is invalid or verified already");
      } else {
        const { expiresAt } = verify[0];
        const hashedOtp = verify[0].otp;
        if (expiresAt < Date.now()) {
          await otpModel.deleteMany({ userId });
          throw new Error("Otp expired");
        } else {
          const validateOtp = await bcrypt.compare(otp, hashedOtp);

          if (!validateOtp) {
            throw new Error("The otp is invalid");
          } else {
            await User.updateOne({ _id: userId }, { verify: true });
            await otpModel.deleteMany({ userId });
            res.status(200).json({ status: "verified" });
          }
        }
      }
    }
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
//sending otp through route
const sendOtp = asyncHandler(async (req, res) => {
  try {
    const { userId, email } = await req.body;
    console.log(email);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: "WORXA<devilsok8@gmail.com>",
      to: email,
      subject: "Verify you Email",
      html: `<p>Your otp is ${otp}</p>`,
    };

    //hashing otp
    const salt = 10;
    const hashedOtp = await bcrypt.hash(otp, salt);
    const otpVerification = await new otpModel({
      userId: userId,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await otpVerification.save();
    await transporter.sendMail(mailOptions);
    res.json(otpVerification);
  } catch (err) {
    res.json(err);
  }
});

//for reseting oldPassword

const resetPassword = asyncHandler(async (req, res) => {
  try {
    let { userId, email, otp, password } = req.body;
    if (!userId || !otp) {
      throw Error("empty otp details");
    } else {
      const verify = await otpModel.find({ userId });
      if (verify.length <= 0) {
        throw new Error("Account is invalid or verified already");
      } else {
        const { expiresAt } = verify[0];
        const hashedOtp = verify[0].otp;
        if (expiresAt < Date.now()) {
          await otpModel.deleteMany({ userId });
          throw new Error("Otp expired");
        } else {
          const validateOtp = await bcrypt.compare(otp, hashedOtp);

          if (!validateOtp) {
            throw new Error("The otp is invalid");
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.updateOne(
              { email: email },
              { password: hashedPassword }
            );
            await otpModel.deleteMany({ userId });
            res.status(200).json({ status: "success" });
          }
        }
      }
    }
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
const test = asyncHandler(async (req, res) => {
  res.json({ message: "success" });

  console.log("test successful");
});

module.exports = {
  loginUser,
  registerUser,
  profile,
  updateUser,
  getWorkers,
  updateProfile,
  imageUpload,
  updateRating,
  getUserRating,
  getOtp,
  verifyOtp,
  sendOtp,
  resetPassword,
  test,

  // deleteUser,
};
