import paypal from 'paypal-rest-sdk';

import renderHTML from '../common/functions/renderHtml';
import Donate from '../../client/components/Donate/Donate';
import App from '../../client/components/App/App';

import config from '../common/config';

const routes = require('express').Router();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQcgtMzixJUxRdY5ktKrB9YZBZtjSLNA502KwCYZeRJxlUXLbgWMvwOfVub9485qhik_goaavf-7R_vF',
    'client_secret': 'EKcLcFJv5LwaetQKmAH-xHDXNXVasSsSk49zu4owP2e6yFSLv3TxGE4KLcTuq-LPGr-QKLohPzD6UUxO'
});

routes.post('/', (req, res) => {
    const { fiatDonate } = req.body;
    if(!fiatDonate || isNaN(fiatDonate)) {
        res.status(400).json({ errors: 'Donate something' });
        return;
    };

    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `${config.thisHost}/donate/success/${fiatDonate}`,
            "cancel_url": `${config.thisHost}/donate`
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Donate to crypto_signer",
                    "sku": "donate",
                    "price": fiatDonate.toString(),
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": fiatDonate.toString()
            },
            "description": "Donate to crypto_signer"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error)
            res.status(400).json({ errors: error.response.name || error.message})
        } else {
            const redirectLink = payment.links.find(item => item.rel === 'approval_url');
            res.json(redirectLink.href)
        }
    });
});

routes.get('/success/:fiatDonate', (req, res, next) => {
    const payerID = req.query.PayerID;
    const paymentID = req.query.paymentId;
    const fiatDonate = req.params.fiatDonate;

    const execute_payment_json = {
        "payer_id": payerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": fiatDonate.toString()
            }
        }]
    };

    paypal.payment.execute(paymentID, execute_payment_json, function (err, payment) {
        if (err) {
            console.log(err.response.name);
            next(err.response.name)
            // res.send(renderHTML(req, <App />, { globalErrors: err.response.name }))
        } else {
            next()
            // res.send(renderHTML(req, <App />, { payment }))
        }
    });

});


export default routes;