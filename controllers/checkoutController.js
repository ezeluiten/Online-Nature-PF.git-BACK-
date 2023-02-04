const checkoutItems = require("../models/checkoutModel")
const { mercadopago } = require("../utils/mercadoPago")

exports.payItemsCart = async( req, res ) => {
    const itemsCart = req.body
    const {items, totalAmount, payer} = itemsCart

    items.forEach(element => {
        element.description = element.description.substr(0,200)
    });

    const normalizedItems = items.map(element=>{
        return{
            id:element._id,
            title: element.title,
            picture_url:element.image,
            description: element.description,
            currency_id: "COP",
            quantity: element.quantity,
            unit_price: parseInt(element.amount * 500)
        }
    })

    let preference = {
        total_amount: totalAmount * 1.15,
        items:normalizedItems,
        back_urls:{
            success: "http://localhost:3001/success",
            failure: "http://localhost:3000/campaign",
            pending: "http://localhost:3000/campaign",
            
        },
        auto_return:"approved",
        notification_url:"http://localhost:3001/api/v1/paymentNotificationRoutes"
    }

    const mercadopagoResponse = await mercadopago.preferences.create(preference)
    
    try{

        res.status(200).json(mercadopagoResponse.body.id)

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}