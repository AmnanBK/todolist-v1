const express = require("express")
const bodyParser = require("body-parser")

const app = express()
var items = []

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", function (req, res) {
    var today = new Date()
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options)

    res.render("list", { day: day, newItems: items })
})

app.post("/", function(req, res) {
    var action = req.body.action
    if(action == "submit") {
        var item = req.body.newItem
        items.push(item)
    }

    if(action == "reset") {
        items = []
    }
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Server running on port 3000")
})