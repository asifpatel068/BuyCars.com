const express=require("express")
const {connection}=require("./config/db")

var cors = require('cors');
const { uesrRouter } = require("./routes/userRouter");
const { inventoryRouter } = require("./routes/inventoryRoutes");
const { OEMSpecRouter } = require("./routes/OEMSpecsRoute");
const app=express()

app.use(cors());
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user",uesrRouter)
app.use("/inventory",inventoryRouter)
app.use("/oem",OEMSpecRouter)

app.listen(7575,async()=>{
    try{
        await connection
        console.log("Conneted to db")
    }catch(err){
        console.log("Not Connected to DB")
        console.log(err)
    }
    console.log("Server is Running")
})