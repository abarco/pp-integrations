module.exports = (createEndpoint, executeEndpoint) => {
    return `
    <!DOCTYPE html>

    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="">
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>
    </head>

    <body>
        <div id="paypal-button-container"></div>
    
        <script>
            paypal.Button.render({
    
                env: 'sandbox', // sandbox | production
    
                // Show the buyer a 'Pay Now' button in the checkout flow
                commit: true,
    
                // payment() is called when the button is clicked
                payment: function() {
    
                    // Set up a url on your server to create the payment
                    var CREATE_URL = '${createEndpoint}/';
    
                    // Make a call to your server to set up the payment
                    return paypal.request.post(CREATE_URL)
                        .then(function(res) {
                            return res.paymentID;
                        });
                },
    
                // onAuthorize() is called when the buyer approves the payment
                onAuthorize: function(data, actions) {
    
                    // Set up a url on your server to execute the payment
                    var EXECUTE_URL = '${executeEndpoint}/';    
    
                    // Set up the data you need to pass to your server
                    var data = {
                        paymentID: data.paymentID,
                        payerID: data.payerID
                    };
    
                    // Make a call to your server to execute the payment
                    return paypal.request.post(EXECUTE_URL, data)
                        .then(function (res) {
                            window.alert('Payment Complete!');
                        });
                }
    
            }, '#paypal-button-container');
        </script>
    </body>
    `;
};