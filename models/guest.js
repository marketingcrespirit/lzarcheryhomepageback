const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Guest {
  constructor(name, phone, period, hour, email, kidName, kidAge, kidGender, home) {
    this.name = name;
    this.phone = phone;
    this.period = period;
    this.hour = hour;
    this.email = email;
    this.kidName = kidName;
    this.kidAge = kidAge;
    this.kidGender = kidGender;
    this.home = home;
    this.time = new Date();
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db.collection("guests").updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("guests").insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getGuests() {
    const db = getDb();
    return db
      .collection("guests")
      .find()
      .toArray();
  }

  static findById(guestId) {
    const db = getDb();
    return db
      .collection("guests")
      .findOne({ _id: new ObjectId(guestId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Guest;
