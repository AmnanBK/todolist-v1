const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let items = []
let workItems = []
let pathNow = ["/", "/work"]

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", function (req, res) {
    let today = new Date()

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let titleList = today.toLocaleDateString("en-US", options)

    res.render("list", { titleList: titleList, items: items, actionValue: pathNow[0] })
})

app.post("/", function(req, res) {
    let action = req.body.action

    if(action == "submit") {
        let item = req.body.newItem
        items.push(item)
    }

    if(action == "reset") {
        items = []
    }
    res.redirect("/")
})

app.get("/work", function(req, res) {
    let titleList = "Work"

    res.render("list", { titleList: titleList, items: workItems, actionValue: pathNow[1] })
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