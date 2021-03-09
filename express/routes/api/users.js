const express = require('express')
const users = require('../../Users')

const router = express.Router()

//All users
router.get('/', ((req, res) => res.json(users)))

//Single user
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No member with the id of ${req.params.id} `})
    }
})

// Create user
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({msg: 'Input a name and email'})
    }
    users.push(newUser)
    res.redirect('/')
})
//Update user
router.put('/:id', (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id))
    if (found) {
        const updUser = req.body
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name;
                user.email = updUser.email ? updUser.email : user.email;
                res.json({msg: 'User updated', member: user})
            }
        })

    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})

//Delete user
router.delete('/:id', (req, res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id !== parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})


module.exports = router