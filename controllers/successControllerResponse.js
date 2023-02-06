exports.successView = async( req, res ) => {
    const paymentInfo = req.params
    console.log("🚀 ~ file: successControllerResponse.js:3 ~ exports.successController=async ~ paymentInfo", paymentInfo)

    try{

        res.status(200).send("exitoso")

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}