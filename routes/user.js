const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../model/user");
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// const axios = require("axios");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // const result = axios ({
    //   URL : "https://api.cloudinary.com/v1_1/biswa90900/image/upload",
    //   method : 'POST',
    //   header : {
    //     'Content-Type' : 'application/x-www-form-urlencoded',
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Headers' : 'Origin',
    //     'Access-Control-Allow-Credentials' : true,
    //   },
    //   data: req.file.path,
    //   onUploadProgress : ProgressEvent => {
    //     console.log('Upload Progress : ' + Math.round(ProgressEvent.loaded/ProgressEvent.total * 100) + '%')

    //   }
    // })

    // const result = axios.post('https://api.cloudinary.com/v1_1/biswa90900/image/upload', req.file.path, {
    //   onUploadProgress: ProgressEvent => {
    //     console.log('Upload Progress : ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%')
    //   }
    // })

    // Create new user
    let user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
