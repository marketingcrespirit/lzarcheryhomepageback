const Guest = require("../models/guest");
const HomepageUser = require('../models/homepageUser')
const sgMail = require("@sendgrid/mail");
require('dotenv').config()
sgMail.setApiKey(process.env.SG);

exports.getUsers = (req, res, next) => {
  Guest.getGuests()
    .then(guests => {
      console.log(guests);
      return res.render("admin/index", {
        pageTitle: "Guests",
        guests: guests
      });
    })
    .catch(err => console.log(err));
};

exports.postUser = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const period = req.body.period;
  const hour = req.body.hour;
  const email = req.body.email;
  const kidName = req.body.kidName;
  const kidAge = req.body.kidAge;
  const kidGender = req.body.kidGender;
  const home = req.body.home;
  const guest = new Guest(name, phone, period, hour ,email, kidName, kidAge, kidGender, home);
  guest
    .save()
    .then(result => {
      console.log("1 user inserted");
      return res.status(200).send("one user added");
    })
    .then(result => {
      const msg = {
        to: "lzarchery@crespirit.com",
        from: "jim@crespirit.com",
        subject: "聯絡我需求-兒童班網站",
        html: `<strong>請聯絡我</strong> <p>姓名: ${name}</p><p>電話: ${phone}</p><p>平日or假日: ${period}</p><p>方便聯絡時間: ${hour}</p><p>Email: ${email}</p><p>學童姓名: ${kidName}</p><p>學童年齡: ${kidAge}</p><p>學童性別: ${kidGender}</p><p>居住地: ${home}</p>`
      };
      return sgMail.send(msg);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postHomepageUser = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const period = req.body.period;
  const hour = req.body.hour;
  const email = req.body.email;
  const guest = new HomepageUser(name, phone, period, hour ,email);
  guest
    .save()
    .then(result => {
      console.log("1 user inserted");
      return res.status(200).send("one user added");
    })
    .then(result => {
      const msg = {
        to: "lzarchery@crespirit.com",
        from: "jim@crespirit.com",
        subject: "聯絡我需求-官網",
        html: `<strong>請聯絡我</strong> <p>姓名: ${name}</p><p>電話: ${phone}</p><p>平日or假日: ${period}</p><p>方便聯絡時間: ${hour}</p><p>Email: ${email}</p>`
      };
      return sgMail.send(msg);
    })
    .catch(err => {
      console.log(err);
    });
};
