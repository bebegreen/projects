paypal.Button.render({

            env: 'sandbox', // sandbox | production

            // PayPal Client IDs - replace with your own
            // Create a PayPal app: https://developer.paypal.com/developer/applications/create
            client: {
                sandbox: 'AdVXAABsYRBjGyaexRWk6uUdI4-SR8TkcxPPPgnA_HweTp1P-O6sdyCeyrF3HDWWFj0H4r7uhmSvXUQd',
                production: 'AdVXAABsYRBjGyaexRWk6uUdI4-SR8TkcxPPPgnA_HweTp1P-O6sdyCeyrF3HDWWFj0H4r7uhmSvXUQd'
            },

            // Show the buyer a 'Pay Now' button in the checkout flow
            commit: true,

            // payment() is called when the button is clicked
            payment: function (data, actions) {
                var sum = $('#sum').text().replace(/^\D+/g, '');
                var prods = $('tr');
                var sku = 0

                var myItems = [];
                for (var i = 0; i < prods.length-1; ++i) {
                    var current = {
                        'name': prods.find('td.name')[i].innerText,
                        "description": "",
                        "quantity": prods.find('td.qty')[i].childNodes[0].value + '',
                        "price": prods.find('td.price:first')[i].innerText.replace(/^\D+/g, ''),
                        "tax": "0.00",
                        "sku": ++sku + '',
                        "currency": currentRate

                    }
                    myItems.push(current);
                }

                // Make a call to the REST api to create the payment
                return actions.payment.create({
                    payment: {
                        "transactions": [
                            {
                                "amount": {
                                    "total": sum,
                                    "currency": currentRate,
                                    "details": {
                                        "subtotal": sum,
                                        "tax": "0.00",
                                        "shipping": "0.00",
                                        "handling_fee": "0.00",
                                        "shipping_discount": "0.00",
                                        "insurance": "0.00"
                                    }
                                },
                                "description": "The payment transaction description.",
                                "custom": "EBAY_EMS_90048630024435",
                                "invoice_number": "48787589673",
                                "payment_options": {
                                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                                },
                                "soft_descriptor": "ECHI5786786",
                                "item_list": {
                                    "items": myItems,
                                    "shipping_address": {
                                        "recipient_name": "Brian Robinson",
                                        "line1": "4th Floor",
                                        "line2": "Unit #34",
                                        "city": "San Jose",
                                        "country_code": "US",
                                        "postal_code": "95131",
                                        "phone": "011862212345678",
                                        "state": "CA"
                                    }
                                }
                            }
                        ]
                    }
                });
            },

            // onAuthorize() is called when the buyer approves the payment
            onAuthorize: function (data, actions) {

                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function () {
                    window.alert('Payment Complete!');
                });
            }

        }, 'paypalBtn');