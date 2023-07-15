const express = require("express")
const router = express.Router()

const { initiatePayment,
        verifySignature 
    } = require("../controllers/payments")

const { auth,
        isStudent, 
    } = require("../middlewares/auth")

// for initialising/capturing payments

router.post("/capturePayment", auth, isStudent, initiatePayment)

// for verification of signature

router.post("/verifySignature", verifySignature)


module.exports = router