var axios = require("axios").default;



exports.changePasswordAuth0 = async( req, res ) => {
    const id = req.body.id
    console.log("🚀 ~ file: changePasswordController.js:5 ~ exports.changePasswordAuth0=async ~ id", id)
    const password = req.body.password
    console.log("🚀 ~ file: changePasswordController.js:7 ~ exports.changePasswordAuth0=async ~ password", password)
    try{

        var options = {
        method: 'POST',
        url: `https://dev-xp4wmo5z0oblx157.us.auth0.com/api/v2/users/auth0|63e432a8288a0900127ae7aa`,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaXNzIjoiaHR0cHM6Ly9kZXYteHA0d21vNXowb2JseDE1Ny51cy5hdXRoMC5jb20vIn0..ldohgr_Al6mX0aZn.S8IAHBRozgU3s0GzgHq8UFh125RBI-Ce6jf8vSICkV4qK6Yh_pVqddUHDtKLOIOisshaLvMSQ4errxz0EbinyD3A1FXtIWKjeEl9u3nAWkOpggsR6WMtlHf7Cs8bmr_ZejBfM5edeADLWI0ZR8zwXbNVaD37bVexP765MsgBC8LasmPtnzx6zr9YwLeOs6ERnRx2mbdF1A4KLJUEFJZ2jvAKN0LO9SXnTGpnKZ-9z7FrgbTt4ZnDqvR6_9ilivQ-60MfUibSP_vF_fuTsiulq9iHFCmMQEuwfObMaNcayk3lLfshmT8gLu5Y7JvKGkY_Xnp3xPTbCrKMwhj884vKXYzK.HmaxWiZ8PE0k8pF8CZdBXA`
        },
        data: {password: password, connection: 'Username-Password-Authentication'}
        };

        axios.request(options).then(function (response) {
            console.log("🚀 ~ file: changePasswordController.js:19 ~ response", response)
            res.status(201).send({
                status:"success",
                requestedAt:req.requestedAt,
                data:response.data
            })
    
        }).catch(function (error) {
        console.error(error);
        });
        
    }
    catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}

exports.changePassPatch = async( req, res ) => {
    const id = req.body.id
    console.log("🚀 ~ file: changePasswordController.js:5 ~ exports.changePasswordAuth0=async ~ id", id)
    const password = req.body.password
    console.log("🚀 ~ file: changePasswordController.js:7 ~ exports.changePasswordAuth0=async ~ password", password)
    try{

        var options = {
        method: 'PATCH',
        url: `https://dev-xp4wmo5z0oblx157.us.auth0.com/api/v2/clients/${id}`,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${process.env.AUTH0_CLIENT_ID}`
        },
        data: {password: password, connection: 'Username-Password-Authentication'}
        };

        axios.request(options).then(function (response) {
            console.log("🚀 ~ file: changePasswordController.js:19 ~ response", response)
            res.status(201).send({
                status:"success",
                requestedAt:req.requestedAt,
                data:response.data
            })
    
        }).catch(function (error) {
        console.error(error);
        });
        
    }
    catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}
