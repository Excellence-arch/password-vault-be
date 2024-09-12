const prisma = require("../prisma/prisma");
const { encrypt, decrypt } = require("../utils/passwordProcessing");

const register = async(req, res) => {
    const userData = {
        email: req.body.email,
        name: req.body.name,
        password: encrypt(req.body.password),
        // others: [req.body]
    };
    try{
        await prisma.user.create({
            data: userData
        });
        res.status(201).send({status: true, message: `Created`})
    } catch(err) {
        return res.send({status: false, message: `${err.message}`})
    }
    
}

const login = async(req, res) => {
    const userReq = req.body;
    try {
    const userData = await prisma.user.findUnique({where: {
        email: req.body.email
    }})
    if(!userData) {
        return res.status(404).send({status: false, message: `${req.body.email} not found`})
    }
    if(decrypt(userData.password) == userReq.password) {
        res.status(200).send({status: true, message: `Success`});
    } else {
        return res.status(404).send({status: false, message: `Incorrect Password`})
    }
} catch(err) {
    res.status(500).send({status: false, message: err.message});
}
}

module.exports = {register, login}