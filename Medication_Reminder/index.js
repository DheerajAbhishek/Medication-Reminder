const express = require("express");
const app = express();
const path = require("path")

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "FrontEnd")));
app.use(express.static('public'));


const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { isNull } = require("util");
mongoose.connect('mongodb://127.0.0.1:27017/medicalDB')
    .then(() => {
        console.log("GOT CONNECTION")
    })
    .catch((error) => console.log("oh on falied", error));

let userid = "";
const userschema = {
    userid: String,
    userName: String,
    contactNum: Number,
    email: String,
    password: String,
    category: String
}
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const User = mongoose.model("User", userschema);
app.post("/signUp", (req, res) => {
    const { name, phone, email, password, category } = req.body;
    const user = new User({ userName: name, contactNum: phone, email: email, password: password, category: category, });
    userid = user._id
    console.log("this is user id", userid)
    user.save()
        .then((data) => {
            const userUpdate = User.updateOne({ _id: userid }, { $set: { userid: userid } }).then((data) => { console.log("Upadted/Added Userid ", data) })
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    res.redirect("/login.html");

});
app.post("/login", async (req, res) => {
    console.log("in login")
    const { email } = req.body;
    try {
        const find = await User.findOne({ email: email })
        const uid = find.userid
        userid = find.userid
        console.log(find);
        if (!find) {
            res.send("Data not found")

        } else {
            res.render("home", { uid: uid })
        }
    }
    catch (error) {
        res.status(500).send("Inter issue please try later")
    }

})
const infantschema = {
    userid: String,
    vaccineDate: String,
    vaccineName: String,
    medicineName: String,
    slots: Number,
    days: Number,
    time1: String,
    time2: String,
    time3: String,
    time4: String,

}

const Infant = mongoose.model("Infant", infantschema);
app.post("/infant", (req, res) => {
    const { vaccineDate, vaccineName, medicineName, days, slots } = req.body;
    var user, id, Time1, hrs1, mins1, Time2, hrs2, mins2, Time3, hrs3, mins3, Time4, hrs4, mins4

    let formvalues = req.body;
    let olen = Object.keys(req.body).length
    console.log(req.body)
    console.log(olen)
    if (olen === 6) {
        const t1 = formvalues.slot1
        console.log(t1)
        user = new Infant({ userid: userid, vaccineName: vaccineName, vaccineDate: vaccineDate, medicineName: medicineName, days: days, slots: slots, time1: t1 });
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`)
    }
    if (olen === 7) {
        const t1 = formvalues.slot1
        const t2 = formvalues.slot2
        console.log(t1)
        user = new Infant({ userid: userid, vaccineName: vaccineName, vaccineDate: vaccineDate, medicineName: medicineName, days: days, slots: slots, time1: t1, time2: t2 });
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`);
        Time2 = user.time2;
        console.log(Time2);
        hrs2 = Time2.slice(0, 2);
        mins2 = Time2.slice(3);
        console.log(`notification 2 at time ${hrs2} hours and ${mins2} minutes`);



    }
    if (olen === 8) {
        const t1 = formvalues.slot1
        const t2 = formvalues.slot2
        const t3 = formvalues.slot3
        console.log(t1)
        user = new Infant({ userid: userid, vaccineName: vaccineName, vaccineDate: vaccineDate, medicineName: medicineName, days: days, slots: slots, time1: t1, time2: t2, time3: t3 });
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`);
        Time2 = user.time2;
        console.log(Time2);
        hrs2 = Time2.slice(0, 2);
        mins2 = Time2.slice(3);
        console.log(`notification 2 at time ${hrs2} hours and ${mins2} minutes`);
        Time3 = user.time3;
        console.log(Time3);
        hrs3 = Time3.slice(0, 2);
        mins3 = Time3.slice(3);
        console.log(`notification 3 at time ${hrs3} hours and ${mins3} minutes`);
    }
    if (olen === 9) {
        const t1 = formvalues.slot1
        const t2 = formvalues.slot2
        const t3 = formvalues.slot3
        const t4 = formvalues.slot4
        console.log(t1)
        user = new Infant({ userid: userid, vaccineName: vaccineName, vaccineDate: vaccineDate, medicineName: medicineName, days: days, slots: slots, time1: t1, time2: t2, time3: t3, time4: t4 });
        id = user.userid;
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`);
        Time2 = user.time2;
        console.log(Time2);
        hrs2 = Time2.slice(0, 2);
        mins2 = Time2.slice(3);
        console.log(`notification 2 at time ${hrs2} hours and ${mins2} minutes`);
        Time3 = user.time3;
        console.log(Time3);
        hrs3 = Time3.slice(0, 2);
        mins3 = Time3.slice(3);
        console.log(`notification 3 at time ${hrs3} hours and ${mins3} minutes`);

        Time4 = user.time4;
        console.log(Time4);
        hrs4 = Time4.slice(0, 2);
        mins4 = Time4.slice(3);
        console.log(`notification 4 at time ${hrs4} hours and ${mins4} minutes`);
    }

    user.save()
        .then((data) => {
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    let email = "";
    async function mail(slots) {
        const find = await User.findOne({ userid: id })
        email = find.email;
        console.log("this is email", email)

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "medicationreminder.notification@gmail.com",
                pass: "vqlm kfxy wpsi czue" // App Password
            }
        });

        // Function to schedule email
        function scheduleEmail(email, time) {
            schedule.scheduleJob(time, function () {
                const mailOptions = {
                    from: "medicationreminder.notification@gmail.com",
                    to: email,
                    subject: "Medication Reminder 💊",
                    text: "Hey! Don't forget to take your medication today. Stay healthy! "
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error:", error);
                    } else {
                        console.log(`Email sent to ${email} at ${time}:`, info.response);
                    }
                });
            });
        }
        if (slots === 6) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
        if (slots === 7) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins2} ${hrs2}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
        if (slots === 8) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins2} ${hrs2}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins3} ${hrs3}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
        if (slots === 9) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins2} ${hrs2}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins3} ${hrs3}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins4} ${hrs4}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
    }
    mail(olen);
    res.render("home", { uid: id });

});

const oldschema = {
    userid: String,
    visitDate: String,
    doctorName: String,
    medicineName: String,
    days: Number,
    slots: Number,
    time1: String,
    time2: String,
    time3: String,
    time4: String,
}
const Old = mongoose.model("Old", oldschema);
app.post("/old", (req, res) => {
    const { visitDate, doctorName, medicineName, days, slots } = req.body;
    var user, id, Time1, hrs1, mins1, Time2, hrs2, mins2, Time3, hrs3, mins3, Time4, hrs4, mins4

    let formvalues = req.body;
    let olen = Object.keys(req.body).length
    console.log(req.body)
    console.log(olen)
    if (olen === 6) {
        const t1 = formvalues.slot1
        console.log(t1)
        user = new Old({ userid: userid, visitDate: visitDate, doctorName: doctorName, medicineName: medicineName, days: days, slots: slots, time1: t1 });
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`)
    }
    if (olen === 7) {
        const t1 = formvalues.slot1
        const t2 = formvalues.slot2
        console.log(t1)
        user = new Old({ userid: userid, visitDate: visitDate, doctorName: doctorName, medicineName: medicineName, days: days, slots: slots, time1: t1, time2: t2 });
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`);
        Time2 = user.time2;
        console.log(Time2);
        hrs2 = Time2.slice(0, 2);
        mins2 = Time2.slice(3);
        console.log(`notification 2 at time ${hrs2} hours and ${mins2} minutes`);



    }
    if (olen === 8) {
        const t1 = formvalues.slot1
        const t2 = formvalues.slot2
        const t3 = formvalues.slot3
        console.log(t1)
        user = new Old({ userid: userid, visitDate: visitDate, doctorName: doctorName, medicineName: medicineName, days: days, slots: slots, time1: t1, time2: t2, time3: t3 });
        id = user.userid;
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`);
        Time2 = user.time2;
        console.log(Time2);
        hrs2 = Time2.slice(0, 2);
        mins2 = Time2.slice(3);
        console.log(`notification 2 at time ${hrs2} hours and ${mins2} minutes`);
        Time3 = user.time3;
        console.log(Time3);
        hrs3 = Time3.slice(0, 2);
        mins3 = Time3.slice(3);
        console.log(`notification 3 at time ${hrs3} hours and ${mins3} minutes`);
    }
    if (olen === 9) {
        const t1 = formvalues.slot1
        const t2 = formvalues.slot2
        const t3 = formvalues.slot3
        const t4 = formvalues.slot4
        console.log(t1)
        user = new Old({ userid: userid, visitDate: visitDate, doctorName: doctorName, medicineName: medicineName, days: days, slots: slots, time1: t1, time2: t2, time3: t3, time4: t4 });
        id = user.userid;
        id = user.userid;
        Time1 = user.time1;
        console.log(Time1)
        hrs1 = Time1.slice(0, 2)
        mins1 = Time1.slice(3)
        console.log(`notification 1 at time ${hrs1}hours and ${mins1}minutes`);
        Time2 = user.time2;
        console.log(Time2);
        hrs2 = Time2.slice(0, 2);
        mins2 = Time2.slice(3);
        console.log(`notification 2 at time ${hrs2} hours and ${mins2} minutes`);
        Time3 = user.time3;
        console.log(Time3);
        hrs3 = Time3.slice(0, 2);
        mins3 = Time3.slice(3);
        console.log(`notification 3 at time ${hrs3} hours and ${mins3} minutes`);

        Time4 = user.time4;
        console.log(Time4);
        hrs4 = Time4.slice(0, 2);
        mins4 = Time4.slice(3);
        console.log(`notification 4 at time ${hrs4} hours and ${mins4} minutes`);
    }

    user.save()
        .then((data) => {
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    let email = "";
    async function mail(slots) {
        const find = await User.findOne({ userid: id })
        email = find.email;
        console.log("this is email", email)

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            auth: {
                user: "medicationreminder@proton.me",
                pass: "2856AEDFB7D141C076E4C77F5DFCFC8913AF" // App Password
            }
        });

        // Function to schedule email
        function scheduleEmail(email, time) {
            schedule.scheduleJob(time, function () {
                const mailOptions = {
                    from: "dheerajabhishek111@gmail.com",
                    to: email,
                    subject: "Medication Reminder 💊",
                    text: "Hey! Don't forget to take your medication today. Stay healthy! "
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error:", error);
                    } else {
                        console.log(`Email sent to ${email} at ${time}:`, info.response);
                    }
                });
            });
        }
        if (slots === 6) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
        if (slots === 7) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins2} ${hrs2}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
        if (slots === 8) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins2} ${hrs2}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins3} ${hrs3}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
        if (slots === 9) {
            scheduleEmail(email, `${mins1} ${hrs1}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins2} ${hrs2}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins3} ${hrs3}  * * *`); // CRON format (minute hour day month dayOfWeek)
            scheduleEmail(email, `${mins4} ${hrs4}  * * *`); // CRON format (minute hour day month dayOfWeek)
        }
    }
    mail(olen);
    res.render("home", { uid: id });
});
const pregschema = {
    userid: String,
    visitDate: String,
    doctorName: String,
    vaccineDate: String,
    vaccineName: String,
    medicineName: String,
    days: Number,
    slots: Number,
    todo: String
}
const Preg = mongoose.model("Preg", pregschema);
app.post("/preg", (req, res) => {
    const { visitDate, doctorName, vaccineDate, vaccineName, medicineName, days, slots, todo } = req.body;

    const user = new Preg({ userid: userid, visitDate: visitDate, doctorName: doctorName, vaccineDate: vaccineDate, vaccineName: vaccineName, medicineName: medicineName, days: days, slots: slots, todo: todo });
    const id = user.userid;
    console.log("pregdata in there")
    user.save()
        .then((data) => {
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    res.render("home", { uid: id });
})
const genschema = {
    userid: String,
    medicineName: String,
    days: Number,
    slots: Number
}
const General = mongoose.model("General", genschema);
app.post("/general", (req, res) => {
    const { medicineName, days, slots } = req.body;
    const user = new General({ userid: userid, medicineName: medicineName, days: days, slots: slots })
    // const id = user.userid;
    user.save().then((data) => {
        console.log(data)
    })
    res.render("home", { uid: id });
})
app.get('/profile/:id', async (req, res) => {
    const { id } = req.params
    console.log("Extraccted from the url", id)
    const details = await User.findOne({ userid: id });

    const idetails = await Infant.findOne({ userid: id });
    const odetails = await Old.findOne({ userid: id });
    const pdetails = await Preg.findOne({ userid: id });
    const gdetails = await General.findOne({ userid: id });

    res.render("profile", { idetails, details, odetails, pdetails, gdetails })



});
app.listen("3000", console.log("Listening to port 3000"));