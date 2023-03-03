const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let items = []
let workItems = []

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", function (req, res) {
    let today = new Date()
    let pathNow = "root"
    let actionValue = "/"
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let titleList = today.toLocaleDateString("en-US", options)

    res.render("list", { titleList: titleList, items: items, actionValue: actionValue ,pathNow: pathNow })
})

app.post("/", function(req, res) {
    let action = req.body.action
    let pathNow = "root"

    if(action == "submit " + pathNow) {
        let item = req.body.newItem
        items.push(item)
    }

    if(action == "reset " + pathNow) {
        items = []
    }
    res.redirect("/")
})

app.get("/work", function(req, res) {
    let pathNow = "work"
    let titleList = "Work"
    let actionValue = "/work"

    res.render("list", { titleList: titleList, items: workItems, actionValue: actionValue ,pathNow: pathNow })
})

app.post("/work", function(req, res) {
    let action = req.body.action
    let pathNow = "work"

    if(action == "submit " + pathNow) {
        let item = req.body.newItem
        workItems.push(item)
    }

    if(action == "reset " + pathNow) {
        workItems = []
    }
    res.redirect("/work")
})

app.listen(3000, function () {
    console.log("Server running on port 3000")
})