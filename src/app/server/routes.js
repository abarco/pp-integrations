let paypal = require('paypal-rest-sdk');
const config = require('./config.json');
const credentials = config.credentials.sandbox;
const paymentRequest = config.payments.sale;
let paymentExecute = config.payments.execute;
const indexPage = require('./page');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': credentials.client_id,
    'client_secret': credentials.secret
});

console.log('CLIENT ID: ', credentials.client_id);
console.log('SECRET: ', credentials.secret);

const createPaymentEndpoint = '/api/paypal/payment/create';
const executePaymetEndpoint = '/api/paypal/payment/execute';


module.exports = function (app) {
    app.get('/', (req, res) => {

        res.send(indexPage(createPaymentEndpoint, executePaymetEndpoint));
    });
    
    
    app.post(createPaymentEndpoint, (req, res) => {
        paypal.payment.create(paymentRequest, (error, payment) => {
            if (error) {
                throw Error('PAYPAL CREATE PAYMENT ERROR: ', error);
            }

            console.log('WE GOT A PAYMENT: ', JSON.stringify(payment));
            res.send({ paymentID: payment.id });
        });
    });

    app.post(executePaymetEndpoint, (req, res) => {

        const paymentID = req.body.paymentID;
        const payerID = req.body.payerID;

        paymentExecute.payer_id = payerID;

        paypal.payment.execute(paymentID, paymentExecute, (error, payment) => {
            if (error) {
                throw Error('PAYPAL PAYMENT EXECUTE: ', error);
            }

            console.log('PAYMENT EXECUTE: ', payment);

            res.send({ status: 200 });
        });


    });
};




