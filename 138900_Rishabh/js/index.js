var isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
if (!isIE11) {


    // models
    var color = function (colorName, colorHashCode) {
        this.colorName = colorName;
        this.colorHashCode = colorHashCode;
    };

    var availableSize = function (...sizes) {
        this.availableSizes = sizes;
    }

    var itemStockModel = function (id, name, style, colors, allsizes, qty, price, imgsrc) {
        this.id = id;
        this.name = name;
        this.style = style;
        this.colors = colors;
        this.allsizes = allsizes;
        this.qty = qty;
        this.price = parseFloat(price);
        this.imgsrc = imgsrc;
    }

    var itemModel = function (id, name, style, color, size, qty, price, reducedprice, imgsrc) {
        this.id = id;
        this.name = name;
        this.style = style;
        this.color = color;
        this.size = size;
        this.qty = qty;
        var price = parseFloat(price);
        var reducedprice = parseFloat(reducedprice);
        this.imgsrc = imgsrc;
        this.reducedprice = function () {
            if (reducedprice < 0 || reducedprice > price) {
                reducedprice = price;
            }
            return reducedprice * this.qty;
        }
        this.price = function () {
            return price * this.qty;
        }
    }

    var cartModel = function (itemArr1) {
        var freeShippingThreshold = 550;
        var itemArr = itemArr1;
        return {
            shippingCost: Number(50).toFixed(2),
            totalItems: function () {
                return itemArr.length;
            },
            calculateTotal: function () {
                var total = (this.isShippingFree()) ? 0 : parseFloat(this.shippingCost);

                console.log(parseFloat(this.calculateSubTotal()));
                console.log(parseFloat(this.promoDiscount(this.promoCode)));

                total += (parseFloat(this.calculateSubTotal())) - (parseFloat(this.promoDiscount(this.promoCode)));
                console.log("discount:" + this.promoDiscount(this.promoCode));
                total = parseFloat(parseFloat(total) * (!!parseFloat(this.calculateSubTotal())));
                return Number(total).toFixed(2);
            },

            calculateSubTotal: function () {
                var subTotal = 0;

                itemArr.forEach((item) => {
                    var tmp = 0;
                    try {
                        if (item.reducedprice() < item.price() && item.reducedprice() > 0) {
                            tmp = item.reducedprice();
                        } else {
                            tmp = item.price();
                        }

                    } catch (e) {
                        tmp = 0;
                    }
                    subTotal += parseFloat(tmp);

                });

                return Number(subTotal).toFixed(2);
            },

            applyPromoCode: function (promoCode) {
                var tmp = this.promoDiscount(promoCode);
                this.promoCode = tmp > 0 ? promoCode : '';
            },

            promoDiscount: function (promoCode) {

                return Number(promoCodeMap[promoCode] ? promoCodeMap[promoCode] : 0).toFixed(2);

            },

            isShippingFree: function () {
                return (this.calculateSubTotal() - this.promoDiscount(this.promoCode)) > freeShippingThreshold;
            },

            promoCode: "NoPromoCodeApplied",

        };
    };


    // Promotional Coupons
    var promoCodeMap = {
        "TEN": 10,
        "FIFTY": 50,
    }

    //All sizes
    var size = {
        "Small": "S",
        "Large": "L",
        "XLarge": "XL",
        "XXLarge": "XXL"
    }

    // Data Sample
    var yellow = new color("yellow", "#efeb0e");
    var blue = new color("blue", "#0e6fef");
    var pink = new color("pink", "#0e6fef");
    var gray = new color("gray", "#0e6fef");
    var colors = [yellow, blue, pink, gray];


    // controllers
    var itemsController = (function () {

        var cartItemArr = [];
        var itemStock = undefined;

        var saveCartItems = function () {
            var newArr = cartItemArr.map((item) => {
                return {
                    id: item.id,
                    size: item.size,
                    color: item.color,
                    qty: item.qty,
                };
            });
            localStorage.setItem("cartitems", JSON.stringify(newArr));
        };

        var fetchItems = function () {
            var tmp = [];
            $.ajax({
                url: '/data/items.json',
                datatype: "json",
                async: false,
                success: function (items) {
                    items = Object.values(items);
                    for (i = 0; i < items.length; i++) {
                        tmp.push(new itemModel(items[i].id, items[i].name, items[i].style, colors.find((color) => color.colorName === items[i].color), items[i].size, items[i].qty, items[i].price, items[i].reducedprice, items[i].imgsrc));
                    }
                }
            });
            return tmp;
        };

        var fetchStockItems = function () {
            var tmp = [];
            $.ajax({
                url: '/data/stock-items.json',
                datatype: "json",
                async: false,
                success: function (stockitems) {
                    stockitems = Object.values(stockitems);
                    for (i = 0; i < stockitems.length; i++) {
                        tmp.push(new itemStockModel(stockitems[i].id, stockitems[i].name, stockitems[i].style, stockitems[i].colors, stockitems[i].allsizes, stockitems[i].qty, stockitems[i].price, stockitems[i].reducedprice, stockitems[i].imgsrc));
                    }
                }
            });
            return tmp;
        };


        return {

            getItemStockById: function (itemId) {
                var stockitems = fetchStockItems();
                return stockitems.find((item2) => itemId == item2.id);
            },

            getItemById: function (itemId) {

                //dummy items
                var items = fetchItems();
                return items.find((item2) => itemId == item2.id);
            },

            getItemFromCart: function (itemId) {
                return cartItemArr.find((item) => item.id == itemId);
            },

            getDummyItems: function () {
                if (!localStorage.getItem("cartitems")) {
                    //   var item1 = itemMap.get('1');
                    //    var item2 = itemMap.get('2');
                    var items = fetchItems();
                    cartItemArr.splice(0);
                    cartItemArr.push(...items);
                    saveCartItems();
                }
                return cartItemArr;
            },

            getItemsByIds: function (idArr) {

                //dummy items
                var items = fetchItems();
                var tmp = idArr.map((item1) => {
                    return items.find((item2) => item1.id == item2.id);
                });
                return tmp;
            },

            removeItem: function (itemId) {
                var item = cartItemArr.find((item, key, arr) => {
                    return item.id == itemId && arr.splice(key, 1);
                });
                saveCartItems();
                return item;
            },

            editItem: function (newItem) {
                var oldItem = cartItemArr.find((item) => item.id == newItem.id);
                oldItem.color = newItem.color;
                oldItem.size = newItem.size;
                oldItem.qty = newItem.qty;
                saveCartItems();
            },

            loadCartItems: function () {
                cartItemArr.splice(0);
                var localitems = JSON.parse(localStorage.getItem("cartitems"));
                if (localitems)
                    cartItemArr.push(...localitems);
                if (cartItemArr) {
                    //gets item info from api calls (dummy)
                    var tmp = this.getItemsByIds(cartItemArr);
                    tmp.map((newitem) => {
                        var item = cartItemArr.find((item) => item.id == newitem.id ? item : undefined);
                        newitem.color = item.color;
                        newitem.size = item.size;
                        newitem.qty = item.qty;
                    });
                    cartItemArr.splice(0);
                    cartItemArr.push(...tmp);
                }
                return cartItemArr;
            },

            init: function () {
                cartItemArr = this.getDummyItems();
                initialized = true;
            }

        };

    })();



    var UIController = (function (items, cart) {

        var selector = (function () {
            return {
                "itemContainer": () => {
                    return document.querySelector(".items-container");
                },
                "itemImage": () => {
                    return document.querySelector(".item_image img");
                },
                "editItems": () => {
                    return document.querySelectorAll("a.edit_item");
                },
                "removeItems": () => {
                    return document.querySelectorAll("a.remove_item");
                },
                "overlay": () => {
                    return document.querySelector(".edit-overlay");
                },
                "editForm": () => document.querySelector("form#editForm"),
                "editButton": () => document.querySelector(".edit-btn"),
                "subTotal": () => document.querySelector("._subtotal"),
                "discount": () => document.querySelector("._discount"),
                "total": () => document.querySelector("._total"),
                "shippingMsg": () => document.querySelectorAll("._shippingmsg p"),
                "shippingCost": () => document.querySelector("._shipping"),
                "promobtn": () => document.querySelector(".promotion-coupon .coupon-btn"),
                "promocode": () => document.querySelector("._promocode"),
                "totalitems": () => document.querySelector("._totalItems"),
                "closeoverlay": () => document.querySelector(".close-overlay"),

            };
        })();
        var emptycart = `<div><h3><span>Cart is empty!</span></h3></div>`;
        var itemMarkup = (item) => {
            return `
      <div class="item-row cart_item" data-item-id='${item.id}'>

                <div class="col-2">
                    <div class="item item_image">
                        <img src="${item.imgsrc}" />
                    </div>

                </div>
                <div class="col-10">
                    <div class="row align-horizontal">
                        <div class="item col-3 mobile-col-3">
                            <div class="content">
                                <div class="content-name item_name">
                                    <h3>${item.name}</h3>
                                </div>
                                <div class="content-style content">
                                    <span>Style:</span> <span class="item_style">${item.style}</span>
                                </div>
                                <div class="content-color content">
                                    <span>Color:</span> <span class="item_color">${item.color.colorName}</span>
                                </div>
                            </div>

                            <div class="edit-controls content">
                                <span><a href='#' class="edit_item">EDIT</a> | <a href='#' class="remove_item">X REMOVE</a> | SAVE FOR LATER</span>
                            </div>
                        </div>
                        <div class="item col-3 align-right">
                            <div class="content">
                                <h4>
                                    <span class="col-name-size">Size: </span><span class="content-size item_size">${item.size}</span>
                                </h4>
                            </div>

                        </div>
                        <div class="item col-3 align-right">
                            <div class="content">
                                <h4><span class="col-name-qty">QTY: </span><span class="content-qty item_qty">${item.qty}</span></h4>
                            </div>

                        </div>
                        <div class="item col-3 align-right">
                            <div class="content">
                                <div class='price-container'>

                                    <span class="light-font small-font content-price-slashed" style=${item.reducedprice() < item.price() ? '' : 'display:none;'}>
                                    <sup>$</sup><strike><span class="item_slashed_price light-font">${Number(item.price()).toFixed(2)}</span></strike>
                                    </span>

                                </div>
                                <div class='price-container'>
                                    <span class="content-price"><sup>$</sup><span class="item_price">${Number(item.reducedprice()).toFixed(2)}</span></span>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

    `;
        };

        var overlay = (item, stock) => {
            var sizeHtml = '';
            stock.allsizes.availableSizes.forEach((size) => {
                sizeHtml += `<option value='${size}' ${item.size === size ? 'selected=selected' : ''}> ${size} </option>`;
            });

            var colorHtml = '';
            stock.colors.forEach((color) => {
                colorHtml += `<input type="radio" name="color" value=${color.colorName} class="color-box" style="background-color: ${color.colorHashCode}" ${item.color.colorName === color.colorName ? 'checked' : ''}>`;
            });

            var qtyHtml = '';
            for (i = 1; i < 6; i++) {
                qtyHtml += ` <option value="${i}" ${item.qty == i ? 'selected=selected' : ''}>QTY: ${i}</option>`
            }

            return `<section class="overlay">
                <div class="black-bg"></div>
                <div class="white-bg">
<a href='#' class="close-overlay">X</a>
                    <div class="item-row">
                       
                        <section class="col-5 item-overlay-desc">
                            <div class="auto-margin">
<form id='editForm'>
<input type='hidden' name='id' value='${item.id}'>
                                <div class="item-name margin-btm light-font">
                                    <h3>${item.name}</h3>
                                    <h2><sup>$ </sup>${Number(item.reducedprice()).toFixed(2)}</h2>
                                </div>
                                <div class="color-filter margin-btm">
                                    <h4>PAISLEY</h4>
                                    ${colorHtml}
                                </div>
                                <div class="margin-btm">
                                    <select name='size' class="item-size">
                                        ${sizeHtml}
                                    </select>
                                    <select name='qty' class="item-qty">
                                        ${qtyHtml}
                                    </select>
                                </div>
                                <div class="margin-btm">
                                    <button class="btn edit-btn">EDIT</button>
                                </div>
                                <div class="margin-btm">
                                    <h4><a href="#">See product details</a></h4>
                                </div>
                            </div>
 </form>
                        </section>
                        <section class="col-7">
                            <div class="enlarged-img padding">
                                <img class="auto-margin block" src="${item.imgsrc}">
                            </div>
                        </section>
 
                    </div>
          
                </div>
            </section>
`;
        }

        var bindEvents = function () {
            console.log(this);

            var editfunction = function (e) {
                e.preventDefault();
                var itemRow = e.target.closest(".item-row.cart_item");
                editItemUI.call(this, itemRow.dataset.itemId);
                selector.closeoverlay().addEventListener('click', function (e) {
                    e.preventDefault();
                    selector.overlay().innerHTML = '';
                });
            }.bind(this);

            var removefunction = function (e) {
                e.preventDefault();
                var itemRow = e.target.closest(".item-row.cart_item");
                removeItemUI.call(this, itemRow.dataset.itemId, itemRow);
            }.bind(this);

            selector.editItems().forEach(editItem => editItem.addEventListener('click', editfunction));

            selector.removeItems().forEach(removeItem => removeItem.addEventListener('click', removefunction));

            selector.promobtn().addEventListener('click', function (e) {
                e.preventDefault();
                this.cart.applyPromoCode(e.target.previousElementSibling.value);
                this.reDrawItemRows();
            }.bind(this));

        };


        var editItemUI = function (itemId) {

            var currentItem = items.getItemFromCart(itemId);
            selector.overlay().insertAdjacentHTML("afterbegin", overlay(currentItem,
                items.getItemStockById(itemId)));

            selector.editButton().addEventListener('click', function (e) {
                e.preventDefault();
                var data = new FormData(selector.editForm());
                var color = colors.find((color) => color.colorName == data.get('color') ? color : undefined);
                var item = new itemModel(data.get('id'), '', '', color, data.get('size'), data.get('qty'));
                items.editItem(item);
                selector.overlay().innerHTML = '';
                this.reDrawItemRows();
            }.bind(this));

        }

        var removeItemUI = function (itemId, row) {
            if (items.removeItem(itemId)) {
                this.reDrawItemRows();
            }
        }

        return {

            reDrawItemRows: function () {

                //    Object.values(selector).forEach((ele)=>ele().removeEventListener
                selector.itemContainer().innerHTML = '';
                if (this.cart.totalItems() == 0) {
                    selector.itemContainer().innerHTML = emptycart;
                }
                items.loadCartItems().forEach((item) => {
                    selector.itemContainer().insertAdjacentHTML("afterbegin", itemMarkup(item));
                });
                selector.subTotal().innerHTML = this.cart.calculateSubTotal();
                if (this.cart.isShippingFree()) {
                    selector.shippingMsg()[0].style = 'display:block;';
                    selector.shippingMsg()[1].style = 'display:none;';
                    selector.shippingCost().innerHTML = 'FREE';

                } else {
                    selector.shippingMsg()[0].style = 'display:none;';
                    selector.shippingMsg()[1].style = 'display:block;';
                    selector.shippingCost().innerHTML = '$' + this.cart.shippingCost;
                }
                selector.discount().innerHTML = this.cart.promoDiscount(this.cart.promoCode);
                selector.promocode().innerHTML = this.cart.promoCode;
                selector.total().innerHTML = this.cart.calculateTotal();
                selector.totalitems().innerHTML = this.cart.totalItems();
                bindEvents.call(this);
            },

            init: function () {
                items.init();
                this.cart = new cartModel(items.loadCartItems());
                this.reDrawItemRows();
            }
        };

    })(itemsController, cartModel);


    UIController.init();


}
