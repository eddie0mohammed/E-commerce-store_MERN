

const braintree = require('braintree');


//braintree setup
const gateway = braintree.connect({

    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY

});



const getToken = async (req, res, next) => {
    
    try{
        const paymentToken = await gateway.clientToken.generate({});
        res.send(paymentToken);



    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}

const processPayment =  async (req, res, next) => {

    let nonceFromClient = req.body.paymentData.paymentMethodNonce;
    let amountFromClient = req.body.paymentData.amount;

    // console.log(nonceFromClient);
    // console.log(amountFromClient);

    try{

        //charge
        let newTransaction = await gateway.transaction.sale({
            amount: amountFromClient,
            paymentMethodNonce: nonceFromClient,
            options:{
                submitForSettlement: true
            }
        });
        // console.log(newTransaction);

        res.status(200).json({
            status: 'success',
            data: newTransaction
            
        });


    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}



module.exports = {

    getToken: getToken, 
    processPayment: processPayment,

}