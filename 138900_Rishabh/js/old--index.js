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
    this.price = price;
    this.imgsrc = imgsrc;
}

var itemModel = function (id, name, style, color, size, qty, price, reducedprice, imgsrc) {
    this.id = id;
    this.name = name;
    this.style = style;
    this.color = color;
    this.size = size;
    this.qty = qty;
    this.price = price;
    this.reducedprice = reducedprice;
    this.imgsrc = imgsrc;
}

var cartModel = function (itemArr) {
    var shippingPrice = 50;
    var freeShippingThreshold = 550;

    return {

        calculateTotal: function () {
            var total = (this.isShipping()) ? shippingPrice : 0;
            total += this.calculateSubTotal() - this.promoDiscount(this.promoCode);
            console.log("discount:" + this.promoDiscount(this.promoCode));
            return total;
        },

        calculateSubTotal: function () {
            var subTotal = 0;
            console.log(this);
            itemArr.forEach((item) => {
                var tmp = 0;
                try {
                    tmp = item.price * item.qty;
                } catch {
                    tmp = 0;
                }
                subTotal += tmp;
            });
            console.log("subtotal:" + subTotal);
            return subTotal;
        },

        applyPromoCode: function (promoCode) {
            var tmp = this.promoDiscount(promoCode);
            this.promoCode = tmp > 0 ? promoCode : '';
        },

        promoDiscount: function (promoCode) {

            return promoCodeMap[promoCode] ? promoCodeMap[promoCode] : 0;

        },

        isShipping: function () {
            return (this.calculateSubTotal() - this.promoDiscount(this.promoCode)) < freeShippingThreshold;
        },

    };
};


// Promotional Coupons
var promoCodeMap = {
    "Ten": 10,
    "Fifty": 50,
}

//All sizes
var size = {
    "Small": "S",
    "Large": "L",
    "XLarge": "XL",
    "XXLarge": "XXL"
}

// Data Sample
var yellow = new color("yellow", "#ffffff");
var blue = new color("blue", "#ffffff");

var itemsizes = new availableSize(size.Small, size.Large, size.XLarge, size.XXLarge);
var colors = [yellow, blue];
var itemMap = new Map();
itemMap.set(1, new itemModel('1', 'My Blue Jeans Rocks', 'Rugged', colors, itemsizes, 2, 100, ''));
itemMap.set(2, new itemModel('2', 'Your Yellow Jeans Rocks', 'Classic', colors, itemsizes, 2, 3020, ''));


var itemStockMap = new Map();
itemStockMap.set('1', new itemStockModel(1, 'My Blue Jeans Rocks', 'Rugged', colors, itemsizes, 2, 100, ''));
itemStockMap.set('2', new itemStockModel(2, 'Your Yellow Jeans Rocks', 'Classic', colors, itemsizes, 2, 3020, ''));

var itemMap = new Map();
itemMap.set('1', new itemModel('1', 'My Blue Jeans Rocks', 'Rugged', blue, size.Small, 2, 100, 500, ''));
itemMap.set('2', new itemModel('2', 'Your Yellow Jeans Rocks', 'Classic', yellow, size.XLarge, 2, 3020, 1500, ''));




// controllers
var cartController = (function () {
    // Selectors

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
        };
    })();

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
                                <span><a href='#' class="edit_item">EDIT</a> | <a href='#' class="remove_item">REMOVE</a> | SAVE FOR LATER</span>
                            </div>
                        </div>
                        <div class="item col-3 align-right">
                            <div class="content">
                                <h4>
                                    <span class="content-size item_size">${item.size}</span>
                                </h4>
                            </div>

                        </div>
                        <div class="item col-3 align-right">
                            <div class="content">
                                <h4><span class="content-qty item_qty">${item.qty}</span></h4>
                            </div>

                        </div>
                        <div class="item col-3 align-right">
                            <div class="content">
                                <div>

                                    <span class=" light-font small-font content-price-slashed">
                                    <sup>$</sup><strike><span class="item_slashed_price">${item.price}</span></strike>
                                    </span>

                                </div>
                                <div>
                                    <span class="content-price"><sup>$</sup><span class="item_price">${item.reducedprice}</span></span>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

    `;
    };

    var overlay = (item, stock) => {
        return `<section class="overlay">
    <div class="item-row">
        <section class="col-5 item-overlay-desc">
            <div class="auto-margin">
                <div class="item-name margin-btm light-font">
                    <h3>${item.id}</h3>
                    <h2><sup>$ </sup>${item.price}</h2>
                </div>
                <div class="color-filter margin-btm">
                    <h4>PAISLEY</h4>
                    <input type="radio" name="color" class="color-box">
                    <input type="radio" name="color" class="color-box">
                </div>
                <div class="margin-btm">
                    <select class="item-size">
                    ${stock.allsizes.getOwnPropertyNames().forEach((size) => {
                        "<option >"+size+"</option>"
                    })}
                    
                </select>
                    <select class="item-qty">
                    <option value="1">QTY: 1</option>
                    <option value="2">QTY: 2</option>
                    <option value="3">QTY: 3</option>
                    <option value="4">QTY: 4</option>
                    <option value="5">QTY: 5</option>
                </select>
                </div>
                <div class="margin-btm">
                    <button class="btn">EDIT</button>
                </div>
                <div class="margin-btm">
                    <h4><a href="#">See product details</a></h4>
                </div>
            </div>
        </section>
        <section class="col-7">
            <div class="enlarged-img padding">
                <img class="auto-margin block" src="yelllowjeans.png">
            </div>
        </section>

    </div>


</section>
`
    }


    var cartItemArr = [];
    var itemStock = undefined;

    var bindEvents = function () {
        console.log(this);


        var editfunction = function (e) {
            e.preventDefault();
            var itemRow = e.target.closest(".item-row.cart_item");
            editItemUI.call(this, itemRow.dataset.itemId);
        }.bind(this);

        var removefunction = function (e) {
            e.preventDefault();
            var itemRow = e.target.closest(".item-row.cart_item");
            removeItemUI.call(this, itemRow.dataset.itemId, itemRow);
        }.bind(this);

        selector.editItems().forEach(editItem => editItem.addEventListener('click', editfunction));

        selector.removeItems().forEach(removeItem => removeItem.addEventListener('click', removefunction));
    };


    var editItemUI = function (itemiId) {
        /*/  var promise = new Promise(function (resolve, reject) {
              resolve(fetch("/edit-overlay.html"));
          });
          console.log(this);
          promise.then(function (result) {
              console.log(this);
              var reader = result.text();
              console.log(this);
              reader.then(function (html) {
                  console.log(this);
                  var overlay = (item) => String.raw`${html}`;
                  console.log(this);
                  console.log(overlay(this.itemId));

              }.bind(this))
          }.bind(this));/*/




    }

    var removeItemUI = function (itemId, row) {
        if (this.removeItem(itemId)) {
            row.remove();
        }
    }

    return {

        getItemStockById: function (itemId) {
            return itemStockMap.get(itemId);
        },

        getItems: function () {

            //dummy items
            var item1 = itemMap.get('1');
            var item2 = itemMap.get('2');
            cartItemArr = [item1, item2];
            return cartItemArr;
        },

        getItemsById: function (idArr) {

            //dummy items
            cartItemArr = idArr.map((item) => {
                return itemMap.get(item.id);
            });

            return cartItemArr;
        },

        removeItem: function (itemId) {
            var item = cartItemArr.find((item, key, arr) => {
                return item.id === itemId && arr.splice(key, 1);
            });
            return item;
        },

        edititem: function (itemId) {

        },

        saveCartItems: function () {
            var newArr = cartItemArr.map((item) => {
                return {
                    id: item.id
                };
            });
            localStorage.setItem("cartitems", JSON.stringify(newArr));
        },

        loadCartItems: function () {
            cartItemArr = JSON.parse(localStorage.getItem("cartitems"));
            cartItemArr = this.getItemsById(cartItemArr);
            return cartItemArr;
        },

        drawItemRows: function () {
            cartItemArr.forEach((item) => {
                selector.itemContainer().insertAdjacentHTML("afterbegin", itemMarkup(item));
            });
        },

        init: function () {
            this.drawItemRows();
            console.log(this);
            bindEvents.call(this);
        }

    };

})();



var items = cartController.getItems();
cartController.saveCartItems();
items = cartController.loadCartItems();

var cart = new cartModel(items);

cart.applyPromoCode("Fifty");
console.log(cart.calculateTotal());
console.log(cart.calculateTotal());

cartController.init();
/*/
items = [1,2,3]; 
var idd = items.find((item, key) => {
    if (item === 3) {
        return item;
    } else {
        return undefined;
    }
});
/*/
