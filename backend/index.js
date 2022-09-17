const cors=require("cors")
const express= require("express")
const stripe= require("stripe")("sk_test_51LixN0SAfwuyfgLoO8QM8LkataM0crQYBCF3XdANDdTAWYCwcFC3hy2B53PDWdRiJdPv3Ad1y8HH6zWHKyRUFS4G00Gu9hJoL2")
const uuid=require("uuid")

const app=express()

// middlewares

app.use(express.json())
app.use(cors())

// routes
app.get("/",(req,res)=>{
    res.send("Hi , i am Amit")
})

app.post('/payment',(req,res)=>{
    const{product,token}=req.body;
    console.log("PRODUCT",product)
    console.log("PRICE",product.price)
    const idempontencykey=uuid()
    return stripe.customers.create({email:token.email, source:token.id}).then(
        customer=>{
            stripe.charges.create({
                ammount:product.price*100,
                currency:"Ind",
                customer:customer.id,
                receipt_email:token.email,
                description:product.name,
                shipping:{
                    name:token.card.name,
                    address:{
                        country:token.card.address_country
                    }
                }
            },{idempontencykey})
        }
    )
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))


})

// listen
app.listen(4000,()=>console.log("your application is running on Port 4000"))