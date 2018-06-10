
// Product controller

var ProductController = (function(){
    
    var data = {
        productList: [],
        totalProductCount: 0,
        promoCodes: {
            codes: ['JF5','JF7', 'JF10','JF20'],
            values: [5,7,10,20],
            isPromoApplied: false,
            appliedPromoValue: 0
        },
        totalPrice: 0,
        isShippingFree: false,
        maxTotalForFreeShipping: 50.00,
        totalPriceWithShippingAndPromo: 0,
    };
    
    var calculateTotalPrice = function (productList) {
        var amount = 0.0;
        productList.forEach(function(current) {
           if(parseFloat(current.DiscountedPrice) > 0){
               amount += (parseFloat(current.DiscountedPrice) * parseInt(current.productQuantity));
           } else {
               amount += (parseFloat(current.productPrice) * parseInt(current.productQuantity));
           }
        });
        return Math.abs(amount).toFixed(2);
    };
    return {
        
        formartProducts: function(productJson, callType) {
            data.totalProductCount = productJson.ListOfProducts !== undefined ? productJson.ListOfProducts.length : productJson.productList.length;
            if(callType !== 'delete') {
                 data.productList = productJson.ListOfProducts.map(function(current) {
                    return current;
                });
            }
            data.totalPrice = calculateTotalPrice(data.productList);
            data.isShippingFree = data.totalPrice >= data.maxTotalForFreeShipping ? true:false;
            data.totalPriceWithShippingAndPromo = data.isShippingFree?data.totalPrice:Math.abs(parseFloat(data.totalPrice) + 5.00).toFixed(2);
            return data;
        },
        removeProductFromList: function(id) {
            var ids, index;
            
            ids = data.productList.map(function(cur){
                return cur.id;
            });
            
            index = ids.indexOf(id);
            if(index !== -1){
                data.productList.splice(index,1);
            }

        },
        applyPromo: function(promo) {
            if(data.promoCodes.codes.findIndex(cur=> cur === promo) >= 0){
                var index = data.promoCodes.codes.findIndex(cur=> cur === promo);
                data.promoCodes.appliedPromoValue = Math.abs(parseFloat(data.promoCodes.values[index])).toFixed(2);
                data.promoCodes.isPromoApplied = data.promoCodes.appliedPromoValue > 0? true:false;
            }
            if(data.promoCodes.isPromoApplied) {
                data.isShippingFree = (data.totalPrice - data.promoCodes.appliedPromoValue) >= data.maxTotalForFreeShipping ? true:false;
                data.totalPriceWithShippingAndPromo = data.totalPrice - data.promoCodes.appliedPromoValue + (data.isShippingFree ? 0: 5);
                data.totalPriceWithPromo = data.totalPrice - data.promoCodes.appliedPromoValue;
            }
        },
        getSpecificProduct: function(index) {
           return data.productList[index];
        },
        getProductData: function() {
            return data;
        },
        testing: function() {
            console.log(data);
        }
    };
})();

// UI controller
var UIController = (function(){
    
    var DOMStrings = {
        productListSection: '.section-product-list',
        productCountLabel: '.product-count',
        productSubtotal: '.product-subtotal',
        shippingCostLabel: '.shipping-amount',
        shippingClarificationLabel: '.shipping-clarification',
        finalAmountLabel: '.final-amount',
        promoButton: '.btn-promo-apply',
        promoInput: '.promo-input-box',
        promoClass: 'promo-row',
        promoAmountLabel: '.promo-amount',
        productSection: '.section-product-list',
        NoProductLabel: '.no-product-message',
        productQuantityTextBox: 'product-quantity-textbox_',
        promoErrorLabel: '.promo-error',
        productCountLabelMobile: '.product-count-mobile'
        
    };
    
    return {
        
        showProductsAndPrices: function(productData) {
                var html,newHTML,formattedHTML, element, finalPrice;
                document.querySelector(DOMStrings.productCountLabel).textContent = productData.totalProductCount;
                document.querySelector(DOMStrings.productCountLabelMobile).textContent = (productData.totalProductCount + " ITEMS") ;
                html = '<div class="row" id="product-%id%"><div class="col span-3-of-12 "><img class="product-image" src="%src%"></div><div class="col span-5-of-12 "><div class="product-details"><span>%product-name%</span><span>Style #: %product-style%</span><span>Color: %product-color%</span></div><div class="product-buttons"><ul><li><a href="#" data-index = "%id%" class="product-overlay-open">Edit</a> <span>|</span></li><li><a href="#" class="remove-product"><ion-icon name="close"></ion-icon> Remove</a><span>|</span></li><li><a href="#">Save For Later</a></li></ul></div></div><div class="col span-1-of-12">&nbsp;</div><div class="col span-1-of-12 "><span class="mobile-product-labels">Size:</span> <div class="product-size"><span>%product-size%</span></div></div><div class="col span-1-of-12"><span class="mobile-product-label-qty">Qty:</span><div class="product-quantity"><input type="text" id = "product-quantity-textbox_%id%" value="1" readonly></div></div>';  
                productData.productList.forEach(function (el, i) {
                    newHTML = html;
                    if(parseFloat(el.DiscountedPrice) > 0) {
                        newHTML = newHTML + '<div class="col span-1-of-12"><div class="product-price-linethrough "><sup>$</sup><span>%product-price%</span></div><div class="product-price-discounted"><sup>$</sup><span >%product-discounted-price%</span></div></div></div>';
                    } else {
                        newHTML = newHTML + '<div class="col span-1-of-12"><div class="product-price"><sup>$</sup><span>%product-price%</span> </div></div></div>';
                    }
                    formattedHTML =  newHTML.replace('%id%',el.id).replace('%id%',el.id).replace('%id%',i).replace('%src%', el.productimgurl).replace('%product-name%', el.ProductName).replace('%product-style%',el.productStyleNumber).replace('%product-color%', el.productColor).replace('%product-size%',el.productSize).replace('%product-price%',Math.abs(el.productPrice * el.productQuantity).toFixed(2)).replace('%product-discounted-price%', Math.abs(el.DiscountedPrice * el.productQuantity).toFixed(2));
                    
                    document.querySelector(DOMStrings.productListSection).insertAdjacentHTML('beforeend', formattedHTML);
                    
                    document.querySelector(DOMStrings.productSubtotal).textContent = productData.totalPrice;
                    document.getElementById(DOMStrings.productQuantityTextBox+i).value = el.productQuantity;
            });
        },
        showShippingSection: function(productData) {
             
             if(productData.isShippingFree) {
                    document.querySelector(DOMStrings.shippingCostLabel).textContent = 'Free';
                    document.querySelector(DOMStrings.shippingClarificationLabel).innerHTML = `you qualify for free shipping<br/> because your order is more than or equal to $${productData.maxTotalForFreeShipping}*`;

                } else {
                    document.querySelector(DOMStrings.shippingCostLabel).innerHTML = '<sup>$</sup>5.00';
                    document.querySelector(DOMStrings.shippingClarificationLabel).innerHTML = `$5 has been added as your<br/> total cost is less than $${productData.maxTotalForFreeShipping}*`;
                }
                document.querySelector(DOMStrings.finalAmountLabel).textContent =  Math.abs(productData.totalPriceWithShippingAndPromo).toFixed(2); 
        },
        showPromoSection: function(productData, promo){
            if(productData.productList.length > 0){
                    if(productData.promoCodes.isPromoApplied){
                        document.getElementById(DOMStrings.promoClass).classList.remove(DOMStrings.promoClass);
                        document.querySelector(DOMStrings.promoErrorLabel).style.display = 'none';
                        document.getElementById(DOMStrings.promoClass).style.display = 'block';
                        document.getElementById(DOMStrings.promoClass).querySelector('label').textContent = `PROMOTION CODE ${promo} APPLIED`;
                        document.querySelector(DOMStrings.promoAmountLabel).textContent = productData.promoCodes.appliedPromoValue;
                        document.querySelector(DOMStrings.finalAmountLabel).textContent = productData.totalPriceWithShippingAndPromo.toFixed(2);
                } else {
                    document.getElementById(DOMStrings.promoClass).classList.remove(DOMStrings.promoClass);
                    document.getElementById(DOMStrings.promoClass).style.display = 'none';
                    document.querySelector(DOMStrings.promoErrorLabel).style.display = 'block';
                    document.querySelector(DOMStrings.finalAmountLabel).textContent = productData.totalPriceWithShippingAndPromo;
                }
            }
        },
        hidePromoSection: function() {
            document.getElementById(DOMStrings.promoClass).classList.add(DOMStrings.promoClass);
        },
        clearPerviousProducts: function() {
            document.querySelector(DOMStrings.productSection).innerHTML = '';
        },
        showNoProductsMessage: function() {
            var html;
            html = '<div class="no-product-message"><p>No Products are added to the cart.</p></div>';
            document.querySelector(DOMStrings.productListSection).insertAdjacentHTML('beforeend', html);
            document.querySelector(DOMStrings.NoProductLabel).style.display = 'block';
        },
        resetProductAmounts: function() {
            document.querySelector(DOMStrings.productCountLabel).textContent = 0;
            document.querySelector(DOMStrings.productSubtotal).textContent = 0;
            document.querySelector(DOMStrings.shippingCostLabel).textContent = 0;
            document.querySelector(DOMStrings.shippingClarificationLabel).innerHTML = '';
            document.querySelector(DOMStrings.finalAmountLabel).textContent = 0;
            document.getElementById(DOMStrings.promoClass).style.display= 'none';
        },
        getInput: function() {
            return document.querySelector(DOMStrings.promoInput).value;
        },
        getDOMstrings: function() {
            return DOMStrings;
        }
    }
})();


// app controller acts as a controller in mvc model.

var controller  = (function(productCtrl, UICtrl){
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.promoButton).addEventListener('click', applyPromoCode);
        document.querySelector(DOM.productSection).addEventListener('click', removeProducts, editProduct);
        document.querySelector(DOM.productSection).addEventListener('click', editProduct);
    };
    
    var removeProducts = function(event) {
            var itemID, splitID, itemParentID, ID;
            itemID = event.target;
            if(itemID.classList.contains('remove-product')){
                itemParentID = itemID.parentNode.parentNode.parentNode.parentNode.parentNode.id;
                if(itemParentID) {
                    splitID = itemParentID.split('-');
                    ID = parseInt(splitID[1]);
                    productCtrl.removeProductFromList(ID);
                    var productObj = productCtrl.getProductData();
                    if(productObj.productList.length > 0){
                        productObj = productCtrl.formartProducts(productObj, 'delete');
                        productCtrl.applyPromo(UICtrl.getInput());
                        UICtrl.clearPerviousProducts();
                        UICtrl.showProductsAndPrices(productObj);
                        UICtrl.showShippingSection(productObj);
                    } else {
                        UICtrl.clearPerviousProducts();
                        UICtrl.showNoProductsMessage();
                        UICtrl.resetProductAmounts();
                        UICtrl.hidePromoSection();
                    }
                }
            }
        };
    var editProduct = function(event) {
        var itemID, product;
        itemID = event.target;
        if(itemID.classList.contains('product-overlay-open')) {
            console.log(event);
            product = productCtrl.getSpecificProduct(parseInt(itemID.getAttribute('data-index')));
            showPopup(product);
        }
      
    };
    var applyPromoCode = function() {
        var inputVal = UICtrl.getInput();
        productCtrl.applyPromo(inputVal.toUpperCase());
        var productData = productCtrl.getProductData();
        UICtrl.showPromoSection(productData, inputVal);
        UICtrl.showShippingSection(productData);
    };
    var readJsonData = function(){
        var myObj, productData;
        var xmlhttp = new XMLHttpRequest();
        try{
            xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 ){
                myObj = JSON.parse(this.responseText);
                productData = productCtrl.formartProducts(myObj);
                UICtrl.showProductsAndPrices(productData);
                UICtrl.showShippingSection(productData);
            }
         };
         xmlhttp.open("GET", "Resources/Data/ProductList.json", true);
         xmlhttp.send();
        }catch(err){
           // readDataOffline();
        }
        
    };
    
    var readDataOffline = function() {
        var file = new File();
        var reader= new FileReader();
        reader.onload = function(event) {
            
        };
    };
      
    return {
         init: function(){
            console.log('App has started');
            readJsonData();
            setupEventListeners();
        }
    } 
})(ProductController, UIController);

controller.init();


// Modal popup function.

function showPopup(product){
    var productPrice = parseFloat(product.DiscountedPrice) > 0 ? product.DiscountedPrice : product.productPrice;
    $.magnificPopup.open({
        items: {
            src: "#test-popup",
            type: "inline"
        },
        closeOnContentClick: false,
        closeOnBgClick: false,
        showCloseBtn: true,
        enableEscapeKey: true,
        callbacks:{
            open: function() {
                $('.product-overlay-name').find('span').text(product.ProductName);
                $('.product-overlay-price').find('span').html('<sup>$</sup> '+ productPrice);
                $('.product-overlay-color').find('span').text(product.productColor);
                $('.product-overlay-image').attr('src', product.productimgurl);
                $('#product-size-selector > option').each(function(el){
                   if($(this).val() === product.productSize) {
                       $(this).parent('select').val($(this).val());
                   }
                });
                $('#product-quantity-selector > option').each(function(el){
                   if($(this).val() === product.productQuantity.toString()) {
                       $(this).parent('select').val($(this).val());
                   }
                });
            },
            close: function() {
                
            }
        }
    });
}
   
