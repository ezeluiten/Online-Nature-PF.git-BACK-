exports.successView = async( req, res ) => {
    const {
        payment_id,
        status,
        payment_type
    } = req.query



    

    try{

        res.status(200).send(
            `<div className="container-success">
                <h4>${payment_id}</h4>
                <h4>${status}</h4>
                <h4>${payment_type}</h4>
            </div>`
        )

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}