var isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
if (isIE11) {
    //polyfills:=>
    //Element.closest
    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest =
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i,
                    el = this;
                do {
                    i = matches.length;
                    while (--i >= 0 && matches.item(i) !== el) {};
                } while ((i < 0) && (el = el.parentElement));
                return el;
            };
    }

    //Array.find
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            },
            configurable: true,
            writable: true
        });
    }
    //



    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    // models
    var color = function color(colorName, colorHashCode) {
        this.colorName = colorName;
        this.colorHashCode = colorHashCode;
    };

    var availableSize = function availableSize() {
        for (var _len = arguments.length, sizes = Array(_len), _key = 0; _key < _len; _key++) {
            sizes[_key] = arguments[_key];
        }

        this.availableSizes = sizes;
    };

    var itemStockModel = function itemStockModel(id, name, style, colors, allsizes, qty, price, imgsrc) {
        this.id = id;
        this.name = name;
        this.style = style;
        this.colors = colors;
        this.allsizes = allsizes;
        this.qty = qty;
        this.price = parseFloat(price);
        this.imgsrc = imgsrc;
    };

    "use strict";

    var itemModel = function itemModel(id, name, style, color, size, qty, price, reducedprice, imgsrc) {
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
        };
        this.price = function () {
            return price * this.qty;
        };
    };

    var cartModel = function cartModel(itemArr1) {
        var freeShippingThreshold = 550;
        var itemArr = itemArr1;
        return {
            shippingCost: Number(50).toFixed(2),
            totalItems: function totalItems() {
                return itemArr.length;
            },
            calculateTotal: function calculateTotal() {
                var total = this.isShippingFree() ? 0 : parseFloat(this.shippingCost);

                console.log(parseFloat(this.calculateSubTotal()));
                console.log(parseFloat(this.promoDiscount(this.promoCode)));

                total += parseFloat(this.calculateSubTotal()) - parseFloat(this.promoDiscount(this.promoCode));
                console.log("discount:" + this.promoDiscount(this.promoCode));
                total = parseFloat(parseFloat(total) * !!parseFloat(this.calculateSubTotal()));
                return Number(total).toFixed(2);
            },

            calculateSubTotal: function calculateSubTotal() {
                var subTotal = 0;

                itemArr.forEach(function (item) {
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

            applyPromoCode: function applyPromoCode(promoCode) {
                var tmp = this.promoDiscount(promoCode);
                this.promoCode = tmp > 0 ? promoCode : '';
            },

            promoDiscount: function promoDiscount(promoCode) {

                return Number(promoCodeMap[promoCode] ? promoCodeMap[promoCode] : 0).toFixed(2);
            },

            isShippingFree: function isShippingFree() {
                return this.calculateSubTotal() - this.promoDiscount(this.promoCode) > freeShippingThreshold;
            },

            promoCode: "NoPromoCodeApplied"

        };
    };

    // Promotional Coupons
    var promoCodeMap = {
        "TEN": 10,
        "FIFTY": 50

        //All sizes
    };
    var size = {
        "Small": "S",
        "Large": "L",
        "XLarge": "XL",
        "XXLarge": "XXL"

        // Data Sample
    };
    // Data Sample
    var yellow = new color("yellow", "#efeb0e");
    var blue = new color("blue", "#0e6fef");
    var pink = new color("pink", "#0e6fef");
    var gray = new color("gray", "#0e6fef");
    var colors = [yellow, blue, pink, gray];

    /*/
    var itemStockMap = new Map();
    itemStockMap.set('1', new itemStockModel(1, 'My Blue Jeans Rocks', 'Rugged', colors, itemsizes, 2, 500, ''));
    itemStockMap.set('2', new itemStockModel(2, 'Your Yellow Jeans Rocks', 'Classic', colors, itemsizes, 2, 3020, ''));

    var itemMap = new Map();
    itemMap.set('1', new itemModel('1', 'My Blue Jeans Rocks', 'Rugged', blue, size.Small, 2, 100, 500, ''));
    itemMap.set('2', new itemModel('2', 'Your Yellow Jeans Rocks', 'Classic', yellow, size.XLarge, 2, 3020, 1500, '/yelllowjeans.png'));
    /*/
    // controllers
    var itemsController = function () {

        var cartItemArr = [];
        var itemStock = undefined;
        var fetchItems = function fetchItems() {
            var tmp = [];
            $.ajax({
                url: '/data/items.json',
                datatype: "json",
                async: false,
                success: function success(items) {
                    items = Object.keys(items).map(function (e) {
                        return items[e];
                    });
                    for (i = 0; i < items.length; i++) {
                        tmp.push(new itemModel(items[i].id, items[i].name, items[i].style, colors.find(function (color) {
                            return color.colorName === items[i].color;
                        }), items[i].size, items[i].qty, items[i].price, items[i].reducedprice, items[i].imgsrc));
                    }
                }
            });
            return tmp;
        };

        var fetchStockItems = function fetchStockItems() {
            var tmp = [];
            $.ajax({
                url: '/data/stock-items.json',
                datatype: "json",
                async: false,
                success: function success(stockitems) {
                    stockitems = Object.keys(stockitems).map(function (e) {
                        return stockitems[e];
                    });
                    for (i = 0; i < stockitems.length; i++) {
                        tmp.push(new itemStockModel(stockitems[i].id, stockitems[i].name, stockitems[i].style, stockitems[i].colors, stockitems[i].allsizes, stockitems[i].qty, stockitems[i].price, stockitems[i].reducedprice, stockitems[i].imgsrc));
                    }
                }
            });
            return tmp;
        };

        var saveCartItems = function saveCartItems() {
            var newArr = cartItemArr.map(function (item) {
                return {
                    id: item.id,
                    size: item.size,
                    color: item.color,
                    qty: item.qty
                };
            });
            localStorage.setItem("cartitems", JSON.stringify(newArr));
        };

        return {

            getItemStockById: function getItemStockById(itemId) {
                var stockitems = fetchStockItems();
                return stockitems.find(function (item2) {
                    return itemId == item2.id;
                });
            },

            getItemById: function getItemById(itemId) {

                //dummy items
                var items = fetchItems();
                return items.find(function (item2) {
                    return itemId == item2.id;
                });
            },

            getItemFromCart: function getItemFromCart(itemId) {
                return cartItemArr.find(function (item) {
                    return item.id == itemId;
                });
            },

            getDummyItems: function () {
                function _toConsumableArray(arr) {
                    if (Array.isArray(arr)) {
                        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                            arr2[i] = arr[i];
                        }
                        return arr2;
                    } else {
                        return Array.from(arr);
                    }
                }

                if (!localStorage.getItem("cartitems")) {
                    var _cartItemArr;

                    //   var item1 = itemMap.get('1');
                    //    var item2 = itemMap.get('2');
                    var items = fetchItems();
                    cartItemArr.splice(0);
                    (_cartItemArr = cartItemArr).push.apply(_cartItemArr, _toConsumableArray(items));
                    saveCartItems();
                }
                return cartItemArr;
            },

            getItemsByIds: function getItemsByIds(idArr) {

                //dummy items
                var items = fetchItems();
                var tmp = idArr.map(function (item1) {
                    return items.find(function (item2) {
                        return item1.id == item2.id;
                    });
                });
                return tmp;
            },

            removeItem: function removeItem(itemId) {
                var item = cartItemArr.find(function (item, key, arr) {
                    return item.id == itemId && arr.splice(key, 1);
                });
                saveCartItems();
                return item;
            },

            editItem: function editItem(newItem) {
                var oldItem = cartItemArr.find(function (item) {
                    return item.id == newItem.id;
                });
                oldItem.color = newItem.color;
                oldItem.size = newItem.size;
                oldItem.qty = newItem.qty;
                saveCartItems();
            },

            loadCartItems: function loadCartItems() {
                cartItemArr.splice(0);
                var localitems = JSON.parse(localStorage.getItem("cartitems"));
                if (localitems)(_cartItemArr = cartItemArr).push.apply(_cartItemArr, _toConsumableArray(localitems));
                if (cartItemArr) {
                    var _cartItemArr2;

                    //gets item info from api calls (dummy)
                    var tmp = this.getItemsByIds(cartItemArr);
                    tmp.map(function (newitem) {
                        var item = cartItemArr.find(function (item) {
                            return item.id === newitem.id ? item : undefined;
                        });
                        newitem.color = item.color;
                        newitem.size = item.size;
                        newitem.qty = item.qty;
                    });
                    cartItemArr.splice(0);
                    (_cartItemArr2 = cartItemArr).push.apply(_cartItemArr2, _toConsumableArray(tmp));
                }
                return cartItemArr;
            },

            init: function init() {
                cartItemArr = this.getDummyItems();
                initialized = true;
            }

        };
    }();

    var UIController = function (items, cart) {

        var selector = function () {
            return {
                "itemContainer": function itemContainer() {
                    return document.querySelector(".items-container");
                },
                "itemImage": function itemImage() {
                    return document.querySelector(".item_image img");
                },
                "editItems": function editItems() {
                    return Array.prototype.slice.call(document.querySelectorAll("a.edit_item"));
                },
                "removeItems": function removeItems() {
                    return Array.prototype.slice.call(document.querySelectorAll("a.remove_item"));
                },
                "overlay": function overlay() {
                    return document.querySelector(".edit-overlay");
                },
                "editForm": function editForm() {
                    return document.querySelector("form#editForm");
                },
                "editButton": function editButton() {
                    return document.querySelector(".edit-btn");
                },
                "subTotal": function subTotal() {
                    return document.querySelector("._subtotal");
                },
                "discount": function discount() {
                    return document.querySelector("._discount");
                },
                "total": function total() {
                    return document.querySelector("._total");
                },
                "shippingMsg": function shippingMsg() {
                    return Array.prototype.slice.call(document.querySelectorAll("._shippingmsg p"));
                },
                "shippingCost": function shippingCost() {
                    return document.querySelector("._shipping");
                },
                "promobtn": function promobtn() {
                    return document.querySelector(".promotion-coupon .coupon-btn");
                },
                "promocode": function promocode() {
                    return document.querySelector("._promocode");
                },
                "totalitems": function totalitems() {
                    return document.querySelector("._totalItems");
                },
                "closeoverlay": function closeoverlay() {
                    return document.querySelector(".close-overlay");
                }

            };
        }();
        var emptycart = "<div><h3><span>Cart is empty!</span></h3></div>";

        var itemMarkup = function itemMarkup(item) {
            return '\n      <div class="item-row cart_item" data-item-id=\'' + item.id + '\'>\n\n                <div class="col-2">\n                    <div class="item item_image">\n                        <img src="' + item.imgsrc + '" />\n                    </div>\n\n                </div>\n                <div class="col-10">\n                    <div class="row align-horizontal">\n                        <div class="item col-3 mobile-col-3">\n                            <div class="content">\n                                <div class="content-name item_name">\n                                    <h3>' + item.name + '</h3>\n                                </div>\n                                <div class="content-style content">\n                                    <span>Style:</span> <span class="item_style">' + item.style + '</span>\n                                </div>\n                                <div class="content-color content">\n                                    <span>Color:</span> <span class="item_color">' + item.color.colorName + '</span>\n                                </div>\n                            </div>\n\n                            <div class="edit-controls content">\n                                <span><a href=\'#\' class="edit_item">EDIT</a> | <a href=\'#\' class="remove_item">X REMOVE</a> | SAVE FOR LATER</span>\n                            </div>\n                        </div>\n                        <div class="item col-3 align-right">\n                            <div class="content">\n                                <h4>\n                                    <span class="col-name-size">Size: </span><span class="content-size item_size">' + item.size + '</span>\n                                </h4>\n                            </div>\n\n                        </div>\n                        <div class="item col-3 align-right">\n                            <div class="content">\n                                <h4><span class="col-name-qty">QTY: </span><span class="content-qty item_qty">' + item.qty + '</span></h4>\n                            </div>\n\n                        </div>\n                        <div class="item col-3 align-right">\n                            <div class="content">\n                                <div class="price-container">\n\n                                    <span class="light-font small-font content-price-slashed" style=' + (item.reducedprice() < item.price() ? '' : 'display:none;') + '>\n                                    <sup>$</sup><strike><span class="item_slashed_price light-font">' + Number(item.price()).toFixed(2) + '</span></strike>\n                                    </span>\n\n                                </div>\n                                <div class="price-container">\n                                    <span class="content-price"><sup>$</sup><span class="item_price">' + Number(item.reducedprice()).toFixed(2) + '</span></span>\n\n                                </div>\n\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n    ';
        };

        var overlay = function overlay(item, stock) {
            var sizeHtml = '';
            stock.allsizes.availableSizes.forEach(function (size) {
                sizeHtml += '<option value=\'' + size + '\' ' + (item.size === size ? 'selected=selected' : '') + '> ' + size + ' </option>';
            });

            var colorHtml = '';
            stock.colors.forEach(function (color) {
                colorHtml += '<input type="radio" name="color" value=' + color.colorName + ' class="color-box" style="background-color: ' + color.colorHashCode + '" ' + (item.color.colorName === color.colorName ? 'checked' : '') + '>';
            });

            var qtyHtml = '';
            for (i = 1; i < 6; i++) {
                qtyHtml += ' <option value="' + i + '" ' + (item.qty == i ? 'selected=selected' : '') + '>QTY: ' + i + '</option>';
            }

            return '<section class="overlay">\n                <div class="black-bg"></div>\n                <div class="white-bg">\n<a href=\'#\' class="close-overlay">X</a>\n                    <div class="item-row">\n                       \n                        <section class="col-5 item-overlay-desc">\n                            <div class="auto-margin">\n<form id=\'editForm\'>\n<input type=\'hidden\' name=\'id\' value=\'' + item.id + '\'>\n                                <div class="item-name margin-btm light-font">\n                                    <h3>' + item.name + '</h3>\n                                    <h2><sup>$ </sup>' + Number(item.reducedprice()).toFixed(2) + '</h2>\n                                </div>\n                                <div class="color-filter margin-btm">\n                                    <h4>PAISLEY</h4>\n                                    ' + colorHtml + '\n                                </div>\n                                <div class="margin-btm">\n                                    <select name=\'size\' class="item-size">\n                                        ' + sizeHtml + '\n                                    </select>\n                                    <select name=\'qty\' class="item-qty">\n                                        ' + qtyHtml + '\n                                    </select>\n                                </div>\n                                <div class="margin-btm">\n                                    <button class="btn edit-btn">EDIT</button>\n                                </div>\n                                <div class="margin-btm">\n                                    <h4><a href="#">See product details</a></h4>\n                                </div>\n                            </div>\n </form>\n                        </section>\n                        <section class="col-7">\n                            <div class="enlarged-img padding">\n                                <img class="auto-margin block" src="' + item.imgsrc + '">\n                            </div>\n                        </section>\n \n                    </div>\n          \n                </div>\n            </section>\n';
        };
        var bindEvents = function bindEvents() {
            console.log("this=>");
            console.log(this);
            var editfunction = function (e) {
                e.preventDefault();
                var itemRow = e.target.closest(".item-row.cart_item");
                console.log("this=>");
                console.log(this);
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

            selector.editItems().forEach(function (editItem) {
                return editItem.addEventListener('click', editfunction);
            });

            selector.removeItems().forEach(function (removeItem) {
                return removeItem.addEventListener('click', removefunction);
            });

            selector.promobtn().addEventListener('click', function (e) {
                e.preventDefault();
                this.cart.applyPromoCode(e.target.previousElementSibling.value);
                this.reDrawItemRows();
            }.bind(this));
        };

        var editItemUI = function (itemId) {

            var currentItem = items.getItemFromCart(itemId);
            selector.overlay().insertAdjacentHTML("afterbegin", overlay(currentItem, items.getItemStockById(itemId)));

            selector.editButton().addEventListener('click', function (e) {
                e.preventDefault();
                var data = new FormData(selector.editForm());
                var id = document.querySelector('input[name=id]').value;
                var size = document.querySelector('select.item-size').value;
                var qty = document.querySelector('select.item-qty').value;
                var colortmp = document.querySelector('input.color-box:checked').value;
                var color = colors.find(function (color1) {
                    return colortmp == color1.colorName;
                });
                var item = new itemModel(id, '', '', color, size, qty);
                items.editItem(item);
                selector.overlay().innerHTML = '';
                console.log(this);
                this.reDrawItemRows();
            }.bind(this));
        };

        var removeItemUI = function (itemId, row) {
            if (items.removeItem(itemId)) {
                this.reDrawItemRows();
            }
        };

        return {

            reDrawItemRows: function () {
                //    Object.values(selector).forEach((ele)=>ele().removeEventListener
                selector.itemContainer().innerHTML = '';
                if (this.cart.totalItems() == 0) {
                    selector.itemContainer().innerHTML = emptycart;
                }
                items.loadCartItems().forEach(function (item) {
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
                console.log("this=>");
                console.log(this);
                bindEvents.call(this);
            },

            init: function init() {
                items.init();
                this.cart = new cartModel(items.loadCartItems());
                this.reDrawItemRows.call(this);
            }
        };
    }(itemsController, cartModel);

    UIController.init();
}
