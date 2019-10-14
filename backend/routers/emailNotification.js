const express = require('express')

const { sendEmail } = require('../emails/requestInfo')

const router = express.Router()

/*
    Request info route
    param contains user e-mail
    pre-made email containing additional info
    about the company will be sent to user email.
*/
router.get('/request-info/:email', async (req, res) => {
    sendEmail(req.params.email)
    res.status(200).send('SENT')
} )

module.exports = router