class userDtos {
  id;
  phoneNo;
  name;
  avatar;
  activated;
  createdAt;

  constructor(user) {
    this.id = user._id;
    this.phoneNo = user.phone;
    this.name = user.name;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : "";
    this.createdAt = user.createdAt;
    this.activated = user.activated;
  }
}

module.exports = userDtos;
