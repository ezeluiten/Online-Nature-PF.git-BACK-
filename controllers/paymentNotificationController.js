
exports.getMercadopagoNotification = async( req, res ) => {
    console.log("notificar", req )
    try{
        
        res.status(201).send({
            status:"success",
            requestedAt:req.requestedAt,
            data:"success"
        })

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}