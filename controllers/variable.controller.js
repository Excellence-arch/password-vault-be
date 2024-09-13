const prisma = require("../prisma/prisma");
const fs = require("fs");
const readline = require("readline");

const postVariable = async (req, res) => {
  const variable = req.body;
  if (!checkArray(variable)) {
    const variableData = {
      name: variable.name,
      file: false,
      value: variable.value,
      userId: req.userId,
      category: variable.category,
      // others: [variable]
    };
    try {
      await prisma.variable.create({
        data: variableData,
      });
      res.status(201).send({ status: true, message: "Saved" });
    } catch (err) {
      res.status(500).send({ status: false, message: `Internal Server Error` });
    }
  } else {
    const variableData = [];
    for (let i = 0; i < variable.length; i++) {
      variables = {
        name: variable[i].name,
        file: false,
        value: variable[i].value,
        userId: req.userId,
        category: variable.category,
        // others: [variable[i]],
      };
      variableData.push(variables);
    }
    try {
      await prisma.variable.createMany({
        data: variableData,
      });
    } catch (err) {
      res.status(500).send({ status: false, message: `Internal Server Error` });
    }
  }
};

const postFiledVariable = async (req, res) => {
  const userId = req.userId;
  const { rawFile, name } = req.body;
  const file = readline.createInterface({
    input: fs.createReadStream(rawFile),
    output: process.stdout,
    terminal: false,
  });
  const allVariables = [];
  file.on("line", (variable) => {
    console.log(variable);
    keyAndValue = variable.split("=");
    variables = {
      name: keyAndValue[0],
      file: true,
      value: keyAndValue[1],
      userId: req.userId,
      category: name,
      // others: [variable[i]],
    };
    allVariables.push(variables);
  });

  try {
    await prisma.variable.createMany({ data: allVariables });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getSavedDetails = async (req, res) => {
  const userId = req.userId;
  try {
    const savedData = await prisma.variable.findMany({ where: { userId } });
    return res
      .status(200)
      .send({ status: true, message: "Success", data: savedData });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { postVariable, postFiledVariable };
