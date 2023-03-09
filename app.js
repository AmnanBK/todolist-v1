const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const logic = require(__dirname + "/logic.js")

mongoose.connect("mongodb://127.0.0.1:27017/toDoDB")
const app = express()

const Activities = mongoose.model("Activities", {name: String})

let workItems = []
let pathNow = ["/", "/work"]
let date = logic.getDate()
let titleList = [date, "Work"]

function getName(data) {
    return data.name
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", function (req, res) {
    let items = []
    Activities.find({}).then((names) => {
        for(i=0; i<names.length; i++) {
            items.push(names[i].name)
        }
        res.render("list", { titleList: titleList[0], items: items, actionValue: pathNow[0] })
    })
})

app.post("/", function(req, res) {
    let action = req.body.action


    if(action == "submit") {
        let item = req.body.newItem
        const activity = new Activities ({ name: item})
        activity.save().then(() => console.log(item))

        // Activities.find().then((obj) => {
        //     items.push(obj[obj.length-1].name)
        // })
    }

    if(action == "reset") {
        Activities.deleteMany({__v: 0}).then(() => {
            console.log("Deleted");
            items = []
        })
    }
    res.redirect("/")
})

app.get("/work", function(req, res) {
    res.render("list", { titleList: titleList[1], items: workItems, actionValue: pathNow[1] })
})

app.post("/work", function(req, res) {
    let action = req.body.action

    if(action == "submit") {
        let item = req.body.newItem
        workItems.push(item)
    }

    if(action == "reset") {
        workItems = []
    }
    res.redirect("/work")
})

app.listen(3000, function () {
    console.log("Server running on port 3000")
})