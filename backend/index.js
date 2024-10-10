const express = require("express")
require('dotenv').config();
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const zod = require('zod')
const PORT = 3000
const jwtPass = "123esw345yjnhsyshhsrtvawwetavtw54675"
const cors = require('cors')

async function verify(req, res, next) {
    let token = req.headers.authorization
    try{
        jwt.verify(token.split(" ")[1], jwtPass)
        let decoded = JSON.parse(atob((token.split(".")[1])))
        req.byUser = decoded
        next()
    }
    catch{
        res.status(401).json({"message":"invalid token"})
    }
}

mongoose.connect(process.env.ConnString)

const User = mongoose.model("user",{
    name: String,
    email: String,
    password: String,
    gender: String,
    age: Number,
    address: String,
    DOB: String,
    is_doctor: Boolean,
    registration_number: BigInt,
})

const Report = mongoose.model("report", {
    doctor: String,
    user: String,
    date: String,
    Heading: String,
    description: String,
    assets: Array
})

let signUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    name: zod.string(),
    gender: zod.string(),
    address: zod.string(),
    DOB: zod.string(),
    is_doctor: zod.boolean(),
    registration_number: zod.bigint().optional(),
})

let signInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    is_doctor: zod.boolean()
})

let requestUserSchema = zod.object({
    "email":zod.string().email()
})

const reportSchema = zod.object({
    user: zod.string().email(),
    date: zod.string(),
    Heading: zod.string(),
    description: zod.string(),
    assets: zod.array(zod.string())
})

const SchemaChecker = (schema, req, res, next) => {
    let data = schema.safeParse(req.body)

    if(data.success){
        req.body = data.data
        next()
    }
    else{
        res.status(400).json(data.error.issues)
    }
}

async function userExists(req, res, next) {
    let body = req.body

    let email = body.email
    let password = body.password
    let is_doctor = body.is_doctor

    user = await User.findOne({email: email, password: password, is_doctor: is_doctor})

    if(user) {
        req.exist = true
        req.dbUser = user
        req.body = body
        next()
        return
    }

    req.exist = false
    next()
}

async function exists(email) {
    let user = await User.findOne({email: email})

    if(user) {
        return true
    }

    return false
}

const app = express()
app.use(express.json({limit: "10mb"}))
app.use(cors())

app.post("/user/create", (res, req, next) => {
    SchemaChecker(signUpSchema, res, req, next)
    }
    , async (req, res) => {
        let data = req.body

        if(await exists(data.email)){
            res.status(400).json({
                "success":false,
                "detail": "user already exists"
            })
            return 0
        } 

    const user = new User(data)
    await user.save()
    res.json({"message":"user created"})
})

app.post("/user/login", (req, res, next) => {
    SchemaChecker(signInSchema, req, res, next)
}, userExists, (req, res) => {
    if(! req.exist){
        res.status(400).json({
            "detail": "invalid Credentials"
        })
        return 0
    }
    let user = req.dbUser
    let body = req.body

    let token = jwt.sign({
        "email": user.email,
        "is_doctor": user.is_doctor 
    }, jwtPass, {algorithm:"HS256"})

    res.json({
        "success":true,
        "token": token
    })
})


app.post("/report/create", verify, (req, res, next) => {
    SchemaChecker(reportSchema, req, res, next)
}, async (req, res) => {
    try{
        let body = req.body
        let byUser = req.byUser

        if(! byUser.is_doctor){
            res.status(401).json({
                "success": false,
                "detail":"Only doctors can create reports!"
            })
        }

        if(!await exists(body.user)){
            res.status(404).json({
                "success" : false,
                "detail": "cannot create reports for non existing users"
            })
            return 0
        }
        console.log(byUser)
        let report = new Report({...body, doctor: byUser.email})
        await report.save()

        res.json({
            "success": true,
            "detail": "Report created"
        })

    }
    catch{
        res.status(400).json({"detail": "Invalid headers"})
    }
})


app.get("/reports", verify, 
    async (req, res) => {
        let user = req.byUser

        if(user.is_doctor){
            const reports = await Report.find({doctor: user.email})
            res.json(reports)
            return
        }
        else{
            const reports = await Report.find({user: user.email})
            res.json(reports)
        }
})

app.get("/user",  (req, res, next) => {SchemaChecker(requestUserSchema, req, res, next)},
                async (req, res) => {
                    let email = req.body.email

                    let user = await User.findOne({"email": email})
                    let newUser =  {"name": user.name,
                        "email": user.email,
                        "gender":user.gender, 
                        "address":user.address,
                        "DOB": user.DOB,
                        "is_doctor": user.is_doctor
                    }
                    res.json(newUser)
                 })

app.use((err, req, res) => {
    console.log(err)
    res.json({'detail': 'internal server error'})
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})    
