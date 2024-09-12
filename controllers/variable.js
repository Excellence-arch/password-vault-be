const prisma = require("../prisma/prisma");

const postVariable = async(req, res) => {
    const variable = req.body;
    if(!checkArray(variable)) {
        const variableData = {
            name: variable.name,
            file: false,
            value: variable.value,
            userId: req.userId,
            // others: [variable]
        }
        try{
            await prisma.variable.create({
                data: variableData
            })
            res.status(201).send({status: true, message: "Saved"})
        } catch(err) {
            res.status(500).send({status: false, message: `Internal Server Error`})
        }
    } else {
        const variableData = []
        for(let i = 0; i < variable.length; i++) {
            variables = {
                name: variable[i].name,
                file: false,
                value: variable[i].value,
                userId: req.userId,
                others: [variable[i]]
            }
            variableData.push(variables)
        }
        try{
            await prisma.variable.createMany({
                data: variableData
            })
        } catch(err) {
            res.status(500).send({status: false, message: `Internal Server Error`});
        }
    }
    
}

const postFiledVariable = (req, res) => {
    res.status(200).send({status: true, message: `Coming soon...`})
}

module.exports = {postVariable, postFiledVariable}