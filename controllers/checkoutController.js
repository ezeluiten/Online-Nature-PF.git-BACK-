const checkoutItems = require("../models/checkoutModel")
const { mercadopago } = require("../utils/mercadoPago")

exports.payItemsCart = async( req, res ) => {
    const itemsCart = req.body
    const {items, totalAmount, payer} = itemsCart
    console.log("🚀 ~ file: checkoutController.js:7 ~ exports.payItemsCart=async ~ payer", payer)

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
            unit_price: parseInt(element.amount)
        }
    })

    let preference = {
        total_amount: totalAmount * 1.15,
        items:normalizedItems,
        back_urls:{
            success: "https://online-nature-pf-front-git-main-ezeluiten.vercel.app/campaign",
            failure: "http://localhost:3000/campaign",
            pending: "http://localhost:3000/campaign",
            
        },
        auto_return:"approved",
        payer:{
            phone:{
                area_code:"+57",
                number:payer.phone||0000000
            },
            name:payer.name || "none",
            email:payer.mail,
            client_id: payer._id,
        },
        metadata:{
            payer_id:payer._id
        },
        notification_url:`${"https://craven-sign-production.up.railway.app/api/v1/"}${"ticket"}`
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