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
    days: Number,
    time: String,
    slots: Number
}
const Infant = mongoose.model("Infant", infantschema);
app.post("/infant", (req, res) => {
    const { vaccineDate, vaccineName, medicineName, days, slots, time } = req.body;
    const user = new Infant({ userid: userid, vaccineName: vaccineName, vaccineDate: vaccineDate, medicineName: medicineName, days: days, time: time, slots: slots });
    const id = user.userid;
    let Time = user.time;
    console.log(Time)
    let hrs = Time.slice(0, 2)
    let mins = Time.slice(3)
    console.log(`at time ${hrs}hours and ${mins}minutes`)
    user.save()
        .then((data) => {
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    let email = "";
    async function mail() {
        const find = await User.findOne({ userid: id })
        email = find.email;
        console.log("this is email", email)

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "medicationreminder.notify@gmail.com",
                pass: "jeoi mqni tvea bphe" // App Password
            }
        });

        // Function to schedule email
        function scheduleEmail(email, time) {
            schedule.scheduleJob(time, function () {
                const mailOptions = {
                    from: "medicationreminder.notify@gmail.com",
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

        scheduleEmail(email, `${mins} ${hrs}  * * *`); // CRON format (minute hour day month dayOfWeek)
    }
    mail();
    res.render("home", { uid: id });

});
app.get('/profile/:id', async (req, res) => {
    const { id } = req.params
    console.log("Extraccted from the url", id)
    const details = await User.findOne({ userid: id });
    const { userName, contactNum, email, category } = details
    const idetails = await Infant.findOne({ userid: id });
    if (idetails === null) {
        res.render("profile", { idetails: idetails, userName: userName, contactNum: contactNum, email: email, category: category })
    } else {
        const { vaccineDate, vaccineName, medicineName, days, slots } = idetails
        console.log(details);
        res.render("profile", { idetails: idetails, userName: userName, contactNum: contactNum, email: email, category: category, vaccineDate: vaccineDate, vaccineName: vaccineName, medicineName: medicineName, days: days, slots: slots })
    }
});
const oldschema = {
    visitDate: String,
    doctorName: String,
    medicineName: String,
    days: Number,
    slots: Number
}
const Old = mongoose.model("Old", oldschema);
app.post("/old", (req, res) => {
    const { visitDate, doctorName, medicineName, days, slots } = req.body;
    const user = new Old({ userid: userid, visitDate: visitDate, doctorName: doctorName, medicineName: medicineName, days: days, slots: slots });
    user.save()
        .then((data) => {
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    res.redirect("/home.html");
});
const pregschema = {
    visitDate: String,
    doctorName: String,
    medicineName: String,
    days: Number,
    slots: Number
}
const Preg = mongoose.model("Preg", oldschema);
app.post("/preg", (req, res) => {
    const { visitDate, doctorName, medicineName, days, slots } = req.body;

    const user = new Old({ userid: userid, visitDate: visitDate, doctorName: doctorName, medicineName: medicineName, days: days, slots: slots });
    user.save()
        .then((data) => {
            console.log("inserted");
            console.log(data)
        })
        .catch((e) => {
            console.log("OOPS ERROR!! ", e)
        })
    res.redirect("/home.html");
})
app.listen("3000", console.log("Listening to port 3000"));