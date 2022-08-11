const router = require('express').Router()

const Person = require('../models/Person')

//* Create - criação de dados
router.post('/', async (req, res) => {
    //* req.body

    //* {name: "Matheus", message: "ola,tudo bem?"}
    const {
        name,
        message,
    } = req.body;

    if (!name) {
        res.status(422).json({
            error: 'O nome é obrigatorio!'
        })
        return
    }

    const person = {
        name,
        message,
    }

    try {
        //* Criando dados
        await Person.create(person)
        res.status(201).json({
            message: 'Pessoa inserida no sistema com sucesso!'
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

//* Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        console.log("people -> ", people)

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
})


module.exports = router;