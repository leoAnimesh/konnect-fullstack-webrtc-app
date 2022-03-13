const Jimp = require("jimp");
const path = require("path");
const userDtos = require("../dtos/userDtos");
const { findUser } = require("../services/userService");
const activateController = async (req, res) => {
  const { name, avatar } = req.body;
  if (!name || !avatar) {
    res.status(400).json({ message: "All feilds are required" });
  }

  //Image buffer
  const buffer = Buffer.from(
    avatar.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
    "base64"
  );

  const imagePath = `${Date.now()}-${Math.floor(Math.random() * 1e9)}.png`;

  //compress and write image
  try {
    const jimResp = await Jimp.read(buffer);
    jimResp
      .resize(150, 150)
      .write(path.resolve(__dirname, `../storage/${imagePath}`));
  } catch (err) {
    res.status(500).json({ message: "cannot process the image" });
  }

  let { _id } = await req.user;
  //update user
  try {
    const user = await findUser({ _id });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      console.log(userId);
    }
    user.activated = true;
    user.name = name;
    user.avatar = `/storage/${imagePath}`;
    user.save();
    res.json({ user: new userDtos(user), auth: true });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { activateController };
