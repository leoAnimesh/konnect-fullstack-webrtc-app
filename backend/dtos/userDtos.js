class userDtos {
  id;
  phoneNo;
  activated;
  createdAt;

  constructor(user) {
    this.id = user._id;
    this.phoneNo = user.phone;
    this.createdAt = user.createdAt;
    this.activated = user.activated;
  }
}

module.exports = userDtos;
