    // Product Controller
    var productController = (function () {
        var data = {
            Items: {
                products: [],
                subtotal: 0,
                estimatedTotal: 0,
                totalItems: 0,
                isPromoApplied: false,
                appliedPromo: []
            },
            promocode: new Map([['JF7', 7], ['RF8', 8], ['MKY10', 10]]),
            shippingInfo: {
                charges: 5,
                shippingThreshold: 50
            }
        };

        var discountedTotal = 0;
        var isItemRemoved = false;
        var deletedItemPrice = 0;

        return {
            getCartInfo: function (arrProducts) {
                var actualPrice, discountedPrice, quantity, totalPrice;
                data.Items.subtotal = 0;
                data.Items.estimatedTotal = 0;
                data.Items.totalItems = 0;

                // pushing the items into data structure
                arrProducts.products.forEach(function (item) {

                    actualPrice = parseFloat(item.ActualPrice);
                    discountedPrice = parseFloat(item.DiscountedPrice);
                    quantity = parseInt(item.Quantity);

                    if (discountedPrice > 0) {
                        totalPrice = discountedPrice * quantity;
                        item.ActualPrice = actualPrice * quantity;
                        data.Items.subtotal += discountedPrice * quantity;
                    } else {
                        totalPrice = actualPrice * quantity;
                        data.Items.subtotal += actualPrice * quantity;
                    }

                    // total price per unit price of the product
                    item.TotalPrice = totalPrice;
                    if (!isItemRemoved) {
                        data.Items.products.push(item);
                    }

                });

                // if item is removed update the discounted price (price after applying promotion)
                if (!isItemRemoved) {
                    discountedTotal = data.Items.subtotal;
                } else {
                    // update the discounted total by deducting the removed item price
                    discountedTotal = discountedTotal - deletedItemPrice;
                }

                // Total items in the cart to show in header
                data.Items.totalItems = arrProducts.products.length;
                return data;
            },
            resetData: function () {
                return {
                    subtotal: 0,
                    estimatedTotal: 0,
                    totalItems: 0
                };
            },
            calculateShippingCharges: function () {
                var amount;
                // calculating shipping charges
                if (discountedTotal > 0) {
                    if (data.Items.isPromoApplied) {
                        amount = parseFloat(discountedTotal);
                    } else {
                        amount = data.Items.subtotal;
                    }

                    if ((amount > data.shippingInfo.shippingThreshold) || amount == 0) {
                        data.Items.estimatedTotal = amount;
                        data.shippingInfo.charges = 0;
                    } else {
                        data.shippingInfo.charges = 5;
                        data.Items.estimatedTotal = amount + parseFloat(data.shippingInfo.charges);
                    }

                }
                return data;
            },
            editItem: function (id) {
                var editItem, index, ids;

                index = data.Items.products.indexOf(id);
                ids = data.Items.products.map(function (current) {
                    return current.ID;
                });
                index = ids.indexOf(id);
                if (index !== -1) {
                    editItem = data.Items.products[index];
                }
                return editItem;
            },
            deleteItem: function (id) {
                var id, leftItems, index;
                index = data.Items.products.indexOf(id);
                ids = data.Items.products.map(function (current) {
                    return current.ID;
                });
                index = ids.indexOf(id);
                if (index !== -1) {
                    isItemRemoved = true;
                    deletedItemPrice = data.Items.products[index].TotalPrice;
                    data.Items.products.splice(index, 1);
                }
                return data;
            },
            getShoppingCartDetails: function () {
                return data;
            },
            verifyPromoCode: function (key) {
                return data.promocode.has(key);
            },
            applyPromoCode: function (key) {
                var discount;
                if (data.Items.estimatedTotal > 0 && !data.Items.isPromoApplied) {
                    discount = parseFloat(data.promocode.get(key));
                    discountedTotal = parseFloat(discountedTotal) - discount;
                    data.Items.isPromoApplied = true;
                    data.Items.appliedPromo.push({
                        code: key,
                        value: discount
                    });

                    console.log(discountedTotal);
                }
            },
            testing: function () {
                console.log(data);
            }
        };
    })();


    // UI Controller
    var UIController = (function () {
        // DOM strings used in the page
        var DOMstrings = {
            cartContainer: '.cart--products',
            subTotalLabel: '.cart--subtotal',
            shippingInfoLabel: '.shipping-info',
            itemCountContainer: '.item--count',
            estimatedTotalLabel: '.estimated--total',
            applyPromoButton: '.btn-apply',
            promocodeInput: 'promocode',
            promoCodeRequiredLabel: '.promocode--error',
            invalidPromoCodeLabel: '.invalid--promo--error',
            shippingPriceLabel: '.shipping-price',
            promocodeLabel: '.promo--code',
            promocodePriceLabel: '.promo--code--price',
            promoContainer: '.promo--info',
            cartMessageContainer: '.cart--message',
            shippingInfoContainer: '.shipping-details',
            removeClass: 'remove',
            actualPriceClass: 'actual--price',
            editItemClass: 'item--edit',
            popUpContainer: '.white-popup',
            popUpItemTitle:'.item-title',
            popUpItemImage:'.item--img',
            popUpItemSize:'size',
            popUpItemQuantity:'quantity',
            popUpItemPrice:'price'
        };

        // format the number to 2 decimal places
        var formatNumber = function (num) {
            num = Math.abs(num);
            num = num.toFixed(2);
            return num;
        };

        return {
            renderHeader: function (obj) {
                var itemCountHTML, itemCountElement;
                itemCountElement = DOMstrings.itemCountContainer;

                // Insert the HTML into the DOM
                document.querySelector(itemCountElement).textContent = obj.Items.totalItems;

                // Show message when there is no items in cart
                if (obj.Items.products.length == 0) {
                    document.querySelector(DOMstrings.cartMessageContainer).style.display = "block";
                }
            },
            renderPage: function (obj) {
                var productHTML, allProductsHTML, itemsElement;

                itemsElement = DOMstrings.cartContainer;

                obj.Items.products.forEach(function (curr) {
                    productHTML = '<div id="%ID%" class="row products-details-row"><div class="col span-2-of-12"><div class="cloth-photo"><img src="%Image%" alt="%Name%" /></div></div><div class="col span-6-of-12"><div class="cloth-description"><span class="product-title">%ProductName%</span><p>Style #: <span>%Style%</span></p><p>Colour: <span>%Colour%</span></p></div><ul class="product-cta"><li><a href="#" class="item--edit">Edit</a></li><li><a href="#" class="remove"> <i class="ion-close icon-small"></i>Remove</a></li><li><a href="#">Save for later</a></li></ul></div><div class="col white-space span-1-of-12">&nbsp;</div><div class="col span-1-of-12 product-size"><span>%Size%</span></div><div class="col span-1-of-12 product-quantity"><span><input type="text" value="%Quantity%" readonly/></span></div><div class="col span-1-of-12 product-price"><span class="discounted--price"><sup>$</sup>%TotalPrice%</span><br/><span id="%ProductID%actual--price" class="hide actual--price"><sup>$</sup>%ActualPrice%</span></div></div>';

                    // Replace the placeholder text with some actual data

                    productHTML = productHTML.replace('%ID%', curr.ID);
                    productHTML = productHTML.replace('%Image%', curr.Image);
                    productHTML = productHTML.replace('%Name%', curr.Name);
                    productHTML = productHTML.replace('%ProductName%', curr.Name);
                    productHTML = productHTML.replace('%Style%', curr.Style);
                    productHTML = productHTML.replace('%Colour%', curr.Colour);
                    productHTML = productHTML.replace('%Size%', curr.Size);
                    productHTML = productHTML.replace('%Quantity%', curr.Quantity);
                    productHTML = productHTML.replace('%ProductID%', curr.ID);
                    productHTML = productHTML.replace('%TotalPrice%', formatNumber(curr.TotalPrice));
                    productHTML = productHTML.replace('%ActualPrice%', formatNumber(curr.ActualPrice));

                    // Insert the HTML into the DOM
                    document.querySelector(itemsElement).insertAdjacentHTML('beforeend', productHTML);

                    if (curr.DiscountedPrice > 0) {
                        var elem = curr.ID + DOMstrings.actualPriceClass;
                        document.getElementById(elem).style.display = "block";
                    }


                });
            },
            renderPrice: function (obj) {
                var priceLimit;

                document.querySelector(DOMstrings.subTotalLabel).textContent = formatNumber(obj.Items.subtotal);

                priceLimit = "$" + obj.shippingInfo.shippingThreshold

                if (obj.shippingInfo.charges > 0) {
                    document.querySelector(DOMstrings.shippingInfoLabel).textContent = "You are not eligible for free shipping because your order is under" + priceLimit;
                    document.querySelector(DOMstrings.shippingPriceLabel).textContent = formatNumber(obj.shippingInfo.charges);
                } else {
                    document.querySelector(DOMstrings.shippingInfoLabel).textContent = "You qualify for free shipping because your order is over" + priceLimit;

                    document.querySelector(DOMstrings.shippingPriceLabel).textContent = "Free";
                }

                document.querySelector(DOMstrings.estimatedTotalLabel).textContent = formatNumber(obj.Items.estimatedTotal);

                // Hide Estimated and Promotion Information when no items are added in cart
                if (obj.Items.products.length == 0) {
                    document.querySelector(DOMstrings.promoContainer).style.display = "none";
                    document.querySelector(DOMstrings.shippingInfoContainer).style.display = "none";
                }

            },
            deleteListItem: function (selectorID) {
                var el = document.getElementById(selectorID);
                el.parentNode.removeChild(el);
            },
            showPromoCodeDetails: function (obj) {
                var promotions, discount;
                if (obj.Items.isPromoApplied) {
                    //currently catered for only one promo code so fetching directly from array, in future we can use it for multiple promo code
                    document.querySelector(DOMstrings.promocodeLabel).textContent = obj.Items.appliedPromo[0].code;
                    document.querySelector(DOMstrings.promocodePriceLabel).textContent = obj.Items.appliedPromo[0].value.toFixed(2);
                    document.querySelector(DOMstrings.promoContainer).style.display = "block";
                    document.getElementById(DOMstrings.promocodeInput).disabled = true;
                    document.getElementById(DOMstrings.promocodeInput).readOnly = true;

                }
            },
            openPopUp: function (elem, selectedItem) {
                var actualPrice, discountedPrice, quantity;
                console.log(selectedItem);
                var popUpContainer = DOMstrings.popUpContainer;

                if (elem.className === DOMstrings.editItemClass && selectedItem != null) {
                    document.querySelector(DOMstrings.popUpItemTitle).textContent = selectedItem.Name;
                    document.querySelector(DOMstrings.popUpItemImage).src = selectedItem.Image;
                    document.getElementById(DOMstrings.popUpItemSize).value = selectedItem.Size;
                    document.getElementById(DOMstrings.popUpItemQuantity).value = selectedItem.Quantity;
                    actualPrice = parseFloat(selectedItem.ActualPrice);
                    discountedPrice = parseFloat(selectedItem.DiscountedPrice);
                    quantity = parseInt(selectedItem.Quantity);

                    if (actualPrice < discountedPrice || discountedPrice == 0) {
                        document.getElementById('price').textContent = actualPrice * quantity;
                    } else {
                        document.getElementById('price').textContent = discountedPrice * quantity;
                    }

                    $("#editpopup").trigger("click");
                }
            },
            verifyRemoveElement: function (elem) {
                var isValid = false;
                if (elem.className === DOMstrings.removeClass) {
                    isValid = true;
                }
                return isValid;
            },
            invokeValidation: function () {
                document.querySelector(DOMstrings.invalidPromoCodeLabel).style.display = "block";
            },
            getPromoCodeInput: function () {
                var promoCode;
                var letterNumber = /^[0-9a-zA-Z]+$/; // reg-ex to checck the promo code conatins numbers and alphabets only.

                promoCode = document.getElementById(DOMstrings.promocodeInput).value;
                document.querySelector(DOMstrings.invalidPromoCodeLabel).style.display = "none";
                document.querySelector(DOMstrings.promoCodeRequiredLabel).style.display = "none";


                if (promoCode.trim().length > 0) {
                    if (!promoCode.match(letterNumber)) {
                        promoCode = 0;
                        document.querySelector(DOMstrings.invalidPromoCodeLabel).style.display = "block";
                        document.getElementById(DOMstrings.promocodeInput).focus();
                    }
                } else {
                    document.querySelector(DOMstrings.promoCodeRequiredLabel).style.display = "block";
                    document.getElementById(DOMstrings.promocodeInput).focus();
                }
                return promoCode;
            },
            getDOMstrings: function () {
                return DOMstrings;
            }
        };

    })();


    //Global App Controller
    var controller = (function (prodCtrl, UICtrl) {
        var setupEventListeners = function () {
            var DOM = UICtrl.getDOMstrings();

            document.querySelector(DOM.applyPromoButton).addEventListener('click', ctrlApplyPromo);
            document.querySelector(DOM.cartContainer).addEventListener('click', ctrlDeleteItem);
            document.querySelector(DOM.cartContainer).addEventListener('click', openPopUp);

        };

        var bindProducts = function () {
            var xmlhttp, arrProducts, cartInfo, priceInfo;

            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.status == 200 && this.readyState == 4) {
                    // parse json to product object
                    arrProducts = JSON.parse(this.responseText);

                    // get shopping cart information
                    cartInfo = prodCtrl.getCartInfo(arrProducts);
                    priceInfo = prodCtrl.calculateShippingCharges();

                    // call to UI, to bind the data and render the page
                    UICtrl.renderHeader(cartInfo);
                    UICtrl.renderPage(cartInfo);
                    UICtrl.renderPrice(priceInfo);

                }
            };
            xmlhttp.open("GET", "/resources/js/product-json.txt", true);
            xmlhttp.send();
        };

        var openPopUp = function () {
            var itemID, element;

            element = event.target;
            itemID = element.parentNode.parentNode.parentNode.parentNode.id;
            if (itemID.length > 0) {
                var selectedItem = prodCtrl.editItem(itemID);
                UICtrl.openPopUp(element, selectedItem);
            }
        };

        var ctrlDeleteItem = function () {
            var itemID, splitID, type, ID, leftItems, element;

            element = event.target;
            itemID = element.parentNode.parentNode.parentNode.parentNode.id;

            // verify whether the clicked element is remove only

            var isValid = UICtrl.verifyRemoveElement(element);

            if (itemID && isValid) {

                // 1. delete the item from the data structure
                prodCtrl.deleteItem(itemID);

                leftItems = prodCtrl.getShoppingCartDetails();

                prodCtrl.getCartInfo(leftItems.Items);
                prodCtrl.calculateShippingCharges();

                // 2. Delete the item from the UI
                UICtrl.deleteListItem(itemID);

                // Update UI
                UICtrl.renderHeader(leftItems);
                UICtrl.renderPrice(leftItems);
            }
        };

        var ctrlApplyPromo = function () {
            var promoCode, priceInfo, isValid;

            // Get the user entered promo code
            promoCode = UICtrl.getPromoCodeInput();

            //Verify the promo code and get discounted amount
            if (promoCode.length > 0 && promocode != 0) {
                // Verify promo code
                isValid = prodCtrl.verifyPromoCode(promoCode.toUpperCase());
                if (isValid) {
                    prodCtrl.applyPromoCode(promoCode.toUpperCase());

                    // Update Cart Prices
                    priceInfo = prodCtrl.calculateShippingCharges();
                    
                    // Update UI
                    UICtrl.showPromoCodeDetails(priceInfo);
                    UICtrl.renderPrice(priceInfo);
                } else {
                    UICtrl.invokeValidation();
                }
            }
        };

        return {
            init: function () {
                console.log("Application started");
                bindProducts();
                setupEventListeners();
            }
        };
    })(productController, UIController);

    controller.init();
