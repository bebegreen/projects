
var currentRate = $('.currency option:selected').text();

var symbols = {
    'USD': '$', // US Dollar
    'EUR': '&euro;', // Euro
    'GBP': '&pound;', // British Pound Sterling
    'ILS': '&#8362;' // Israeli New Sheqel
}
var rateKey;
var cartContainer = '#myCart';

function onload() {

    var data = [];
    var socket;
    socket = io.connect();

    if ($('body').attr('id') === 'index') {
        socket.emit('ctgrsPage');
        socket.on('recieveCtgrs', function (cat_arr) {
            cat_arr.forEach((elem) => {
                $('<a>', { class: 'ctgr', href: `${elem.categorie}` }).text(elem.categorie).appendTo('nav');
            })
            $('#myShop').shopcart(cartContainer, data, socket);

            socket.emit('pageLoaded')
        })
    } else {

        socket.on('connected', function () {
            socket.emit('prodsPage', catID);

        });
    }

    socket.on('recieveProds', function (products) {
        //build my page with these prods
        data = products;

        $('#myShop').shopcart(cartContainer, data, socket);
        socket.emit('pageLoaded');
    })

    $('.currency').change(() => {
        socket.emit('currency');
        socket.on('recieveRates', (key) => {
            key.USD = 1;
            rateKey = key;
            var changeTo = $('.currency option:selected').text();

            $('.price').each(function (i, elem) {
                var current = parseFloat(elem.textContent.replace(/^\D+/g, '')) / key[currentRate];
                elem.innerHTML = symbols[changeTo] + (current * key[changeTo]).toFixed(2);
            });

            currentRate = changeTo;
        })

    })
};

$.fn.shopcart = function (cartContainer, data, socket) {

    var self = this;

    var addToCart = (function () {


        (function createTable() {

            var title = $('<h2>').text('Cart').css("text-align", "center");
            var img = $('<img>', { src: " http://zetouna.com/wp-content/uploads/2014/11/cart.png" });

            var header = $('<div>', { id: "cartHead" });

            header.append(img, title);

            var table = $('<table>');
            var thead = $('<thead>');
            var tbody = $('<tbody>');
            var totals = $('<tr>', { id: "totals" });
            var headers = ['', 'Products', 'Qty', 'Price', 'Total'];
            var footers = ['', 'Total', '0', '', '0.00']

            for (var i = 0; i < headers.length; ++i) {
                $('<th>').text(headers[i]).appendTo(thead);
                $('<td>').text(footers[i]).appendTo(totals);
            }

            totals.find('td:nth-child(3)').attr('id', 'total-qty');
            totals.find('td:nth-child(5)').attr('id', 'sum');
            totals.find('td:nth-child(5)').attr('class', 'price');


            tbody.append(totals);
            table.append(thead, tbody);

            $('#paypalBtn').before(header, table);

        })();


        var cartFuncs = {

            addToCart: function (obj) {

                var changeTo = $('.currency option:selected').text();
                if (changeTo !== 'USD') {
                    var current = parseFloat(obj.price / rateKey.USD);
                    obj.price = (current * rateKey[changeTo]).toFixed(2);
                }
                var exists = cartFuncs.exists(obj);

                if (exists) {
                    var row = $('table').find("[data='" + obj.sku + "']");
                    // var row = $('td.name:contains(' + obj.name + ')').parent()
                    var rowData = row.data('data');
                    ++rowData.qty;
                    cartFuncs.rowUpdate(rowData);
                    socket.emit('updateCart', obj.id, rowData.qty);
                }

                else {
                    cartFuncs.cartRowInit(obj);
                    cartFuncs.inputInit(obj);
                    cartFuncs.deleteButtonInit(obj.image);
                    socket.emit('addToCart', obj.id, obj.qty);

                }

                cartFuncs.updateCartTotal(obj);
                cartFuncs.animationAdd(obj.image, obj.class);

            },



            cartRowInit: function (obj) {

                var row = $(`<tr data=${obj.sku} id=${obj.id} >`).data('data', {
                    id: obj.id,
                    name: obj.name,
                    qty: 1,
                    price: obj.price.replace(/^\D+/g, ''),
                    total: obj.price,
                    image: obj.image,
                    sku: obj.sku
                });
                $('<td>').addClass('close').html("<b>X</b>").appendTo(row);
                $('<td>').text(obj.name).addClass('name').appendTo(row);
                $('<td>').addClass('qty').html(`<input type="number" value="${obj.qty}" min="1" class="cartInput">`).appendTo(row);
                $('<td>').addClass('price').html(symbols[currentRate] + obj.price).appendTo(row);
                $('<td>').addClass('itemTotal price').html(symbols[currentRate] + obj.price).appendTo(row);
                $(cartContainer).find('#totals').before(row.hide().fadeIn());

            },

            exists: function (obj) {
                var names = $('td.name');
                var found = 0
                names.each(function (i, elem) {
                    if (elem.innerText === obj.name) {
                        found = 1;
                    }
                });
                return found ? true : false;
            },

            rowUpdate: function (newData) {
                var row = $('table').find("[data='" + newData.sku + "']");

                currentData = row.data('data');

                currentData.total = parseFloat(newData.price) * newData.qty;

                row.find(':input').val(newData.qty);
                row.find('.itemTotal').html(symbols[currentRate] + currentData.total.toFixed(2));

                cartFuncs.updateCartTotal()

            },

            updateCartTotal: function () {
                var sumQty = 0;
                var allQty = $('tbody td.qty').find(':input');
                var len = allQty.length;
                for (var i = 0; i < len; ++i) {
                    sumQty += parseInt($(allQty[i]).val());
                }
                $('#total-qty').text(sumQty);

                var sumTotals = 0;
                var allTotals = $('tbody td.itemTotal');
                allTotals.each(function (i, elem) {
                    sumTotals += parseFloat($(elem).text().replace(/^\D+/g, ''));
                })
                $('#sum').html(symbols[currentRate] + sumTotals.toFixed(2))


            },

            inputInit: function () {

                $('.cartInput').on('input', function () {
                    if ($(this).val() === '') {
                        $(this).val(1);
                    }
                    var rowData = $(this).parent().parent().data('data');
                    var newVal = $(this).val();
                    rowData.qty = newVal;
                    if (rowData.qty < 0) {
                        alert('invalid input');
                        return;
                    }
                    cartFuncs.rowUpdate(rowData);
                    cartFuncs.updateCartTotal();
                    socket.emit('updateCart', rowData.id, parseInt(rowData.qty));
                });

            },

            deleteButtonInit: function (img) {
                $('.close').on('click', function () {
                    // var copy = $(this).parent().data('data').image.clone().appendTo($(cartContainer));

                    // copy.offset({
                    //     top: $(this).parent().parent().offset().top,
                    //     left: $(this).parent().parent().offset().left
                    // })
                    // copy.css({ 'width': '50px' });
                    // copy.fadeOut(500);

                    // setTimeout(function () {
                    //     copy.remove();
                    // }, 500);

                    $(this).parent().remove();
                    cartFuncs.updateCartTotal();

                    socket.emit('remove', $(this).parent().attr('id'));
                });
            },

            animationAdd: function (img, item) {
                var copy = $('<img>', { src: img }).appendTo('body');
                var original = $('#myShop').find(`.${item} img`);

                //     copy.addClass('imgCopy').appendTo($(this).parent().parent());
                copy.offset({
                    top: original.offset().top,
                    left: original.offset().left
                })
                    .css({
                        // 'width': '170px',
                        'opacity': 0.8,
                        'position': 'absolute',
                        'z-index': '200000'
                    })
                    .animate(
                    {
                        'top': $(cartContainer).offset().top,
                        'left': $(cartContainer).offset().left,
                        'width': '30px',
                        'height': '30px',
                        'border-radius': '50%'


                    }, 1000);

                setTimeout(function () {
                    var cartImg = $('#myCart img')
                    copy.animate({
                        'opacity': 0,
                        'left': cartImg.offset().left
                    }, 200);

                }, 1000);

                setTimeout(function () {
                    copy.remove();
                }, 1200);

            },

            listenToScroll: (function () {
                var cartTop = $(cartContainer).offset().top;

                $(window).scroll(function (event) {

                    var scroller = $(this).scrollTop();

                    if (scroller > cartTop) {
                        $(cartContainer).addClass('sticky');
                    } else {
                        $(cartContainer).removeClass('sticky')
                    }
                });

            })()

        } //cart funcs

        socket.on('cartData', (cartData, emited) => {

            for (var i = 0; i < cartData.length; ++i) {
                obj = cartData[i];
                cartFuncs.cartRowInit(obj);
                cartFuncs.inputInit(obj);
                cartFuncs.deleteButtonInit(obj.image);
                cartFuncs.updateCartTotal(obj);
            }

        })

        return cartFuncs.addToCart;

    })();

    function ProductList() {

        var from = 0;
        if (data) {
            var to = data.length;
        }

        $(cartContainer).after($('<div>', { id: 'loadMore' }));

        loadData();

        function loadData() {
            buildItemsDivs();

            for (var i = from; i < to; ++i) {

                insertData(data[i], i);

            }

        }

        function reachedBottom() {
            return $('#loadMore').offset().top < $(window).height() + $(window).scrollTop();
        };

        function buildItemsDivs() {

            for (var j = from; j < to; ++j) {
                var itemDiv = $('<div>').addClass('item ' + j).hide().appendTo(self).fadeIn();
                var loader = $('<span>', { class: 'loader' }).appendTo(itemDiv);

            }
        }

        function insertData(elem, i) {

            // if (elem.name.length > 15) { elem.name = elem.name.substring(0, 14) }
            current = ($('.item.' + i));
            $('.item.' + i + ' .loader').remove();
            $('<h3 />').text(elem.name).appendTo(current);
            image = $('<img>').attr('src', elem.image).appendTo(current);

            var price = $('<p>').addClass('price').append($('<p>').html(symbols[currentRate] + elem.price));

            var add = $('<div>', { class: 'addToCart' }).data('data', {
                id: elem.id,
                sku: elem.sku,
                name: elem.name,
                price: elem.price.replace(/^\D+/g, ''), // remove dollar sign
                image: elem.image,
                qty: this.qty + 1 || 1,
                class: i

            }).text('Add To Cart').click(function () {

                addToCart($(this).data('data'));

            });

            $('<div>').append(price, add).appendTo(current);

            return current;
        }
    };

    if ($('body').attr('id') !== 'index') {

        ProductList();

    }

    return this;
};

