require('dotenv').config();
const express = require("express");
const zod=require("zod");
const {User, Account}=require("../db");
const JWT_SECRET = process.env.JWT_SECRET;
const {authMiddleware}=require("../middleware");
const {connect}=require("../db");
const router = express.Router(); // Initialize router
const jwt = require('jsonwebtoken');



const signupBody=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
});


router.post("/signup", async (req, res) => { 
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    let connection=await connect();
    console.log(connection);
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Already exist"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id; 

    await Account.create({
        userId: userId,
        balance: 1+Math.random()*10000
    })

    const token =jwt.sign({
        userId
    },JWT_SECRET);

  return  res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    console.log(req.body)
    const { success } = signinBody.safeParse(req.body)
    console.log(success)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    let connection=await connect();
    console.log(connection);

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
  
       return res.json
        ({
            message: "Signed in successfully",
            token: token
        })
    }

    
   return res.status(411).json({
        message: "Wrong Password or Username"
    })
})
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    // Use the entire req.body object or create an object with specific fields
    const updateFields = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };

    // Update based on username
    await User.updateOne({ username: req.body.username }, updateFields);

    return res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

   return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/balance",authMiddleware,async(res,req)=>{
    const account=await account.findOne({
        userId:req.userId
    })
   return res.json({
        balance:account.balance
    })
})



module.exports = router;