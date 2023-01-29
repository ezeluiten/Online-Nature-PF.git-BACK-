const checkoutItems = require("../models/checkoutModel")
const { mercadopago } = require("../utils/mercadoPago")

exports.payItemsCart = async( req, res ) => {
    const itemsCart = req.body
    console.log("🚀 ~ file: checkoutController.js:6 ~ exports.payItemsCart=async ~ itemsCart", itemsCart)
    console.log("🚀 ~ file: checkoutController.js:6 ~ exports.payItemsCart=async ~ req.body", typeof req.body)
    const {items, totalAmount, payer} = itemsCart

    items.forEach(element => {
        console.log("🚀 ~ file: checkoutController.js:11 ~ exports.payItemsCart=async ~ element", element)
        element.description = element.description.substr(0,200)
        console.log("🚀 ~ file: checkoutController.js:13 ~ exports.payItemsCart=async ~ element", element)
    });

    const normalizedItems = items.map(element=>{
        return{
            title: element.title,
            description: element.description,
            currency_id: "$",
            quantity: element.quantity,
            unit_price: parseInt(element.amount)
        }
    })

    let preference = {
        total_amount: totalAmount * 1.15,
        items:normalizedItems,
        payer,
        back_urls:{
            "success": "http://localhost:3000/campaign",
            "failure": "http://localhost:3000/campaign",
            "pending": "http://localhost:3000/campaign",
            
        },
        auto_return:"approved"
    }

    const mercadopagoResponse = await mercadopago.preferences.create(preference)
    console.log("🚀 ~ file: checkoutController.js:25 ~ exports.payItemsCart=async ~ mercadopagoResponse", mercadopagoResponse)
    
    try{

        res.status(200).json(mercadopagoResponse)

    }catch (error){
        res.status(400).json({
            status: "failure",
            message: error
        })
    }
}