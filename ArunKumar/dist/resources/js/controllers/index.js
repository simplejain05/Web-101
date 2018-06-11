// import {data} from '../models/products';

// console.log(data);

var model = (function() {
    var prodData = [
        {
            "prodcode":"101",
            "prodname":"Solid Green Cotton TShirt For Man",
            "prodstyle":"YG45656576HU",
            "prodimg":"/resources/img/product1.png",
            "prodprice":10.00,
            "prodsize":"S",
            "prodcolor":"#009900",
            "prodsku":"101-1",
            "prodqty":"15"
        },
        {
            "prodcode":"101",
            "prodname":"Solid Green Cotton TShirt For Man",
            "prodstyle":"RT3454HU",
            "prodimg":"/resources/img/product1.png",
            "prodprice":10.00,
            "prodsize":"S",
            "prodcolor":"#000099",
            "prodsku":"101-2",
            "prodqty":"15"
        },
        {
            "prodcode":"101",
            "prodname":"Solid Green Cotton TShirt For Man",
            "prodstyle":"PO6868HGJ",
            "prodimg":"/resources/img/product1.png",
            "prodprice":10.00,
            "prodsize":"S",
            "prodcolor":"#000099",
            "prodsku":"101-3",
            "prodqty":"15"
        },
        {
            "prodcode":"102",
            "prodname":"Purple Feather Black Open Front Jacket",
            "prodstyle":"WQ65768QTE",
            "prodimg":"/resources/img/product2.png",
            "prodprice":20.00,
            "prodsize":"S",
            "prodcolor":"#009900",
            "prodsku":"102-1",
            "prodqty":"20"
        },
        {
            "prodcode":"102",
            "prodname":"Purple Feather Black Open Front Jacket",
            "prodstyle":"AFD4787HYJ",
            "prodimg":"/resources/img/product2.png",
            "prodprice":20.00,
            "prodsize":"M",
            "prodcolor":"#000099",
            "prodsku":"102-2",
            "prodqty":"20"
        },
        {
            "prodcode":"102",
            "prodname":"Purple Feather Black Open Front Jacket",
            "prodstyle":"MS132THK10376",
            "prodimg":"/resources/img/product2.png",
            "prodprice":20.00,
            "prodsize":"L",
            "prodcolor":"#009900",
            "prodsku":"102-3",
            "prodqty":"20"
        },
        {
            "prodcode":"103",
            "prodname":"Van Heusen Men Blue Single Breasted Slim Fit Suit",
            "prodstyle":"DFF44646GH",
            "prodimg":"/resources/img/product3.png",
            "prodprice":15.00,
            "prodsize":"S",
            "prodcolor":"#991400",
            "prodsku":"103-1",
            "prodqty":"10"
        },
        {
            "prodcode":"103",
            "prodname":"Van Heusen Men Blue Single Breasted Slim Fit Suit",
            "prodstyle":"DFF44646GH",
            "prodimg":"/resources/img/product3.png",
            "prodprice":15.00,
            "prodsize":"L",
            "prodcolor":"#009955",
            "prodsku":"103-2",
            "prodqty":"10"
        },
        {
            "prodcode":"103",
            "prodname":"Van Heusen Men Blue Single Breasted Slim Fit Suit",
            "prodstyle":"DFF44646GH",
            "prodimg":"/resources/img/product3.png",
            "prodprice":15.00,
            "prodsize":"XL",
            "prodcolor":"#335599",
            "prodsku":"103-3",
            "prodqty":"10"
        }
    ];
    var cartData = [
        {
            "prodcode":"101",
            "prodsku":"101-1",
            "prodqty":"2"
        },
        {
            "prodcode":"102",
            "prodsku":"102-1",
            "prodqty":"1"
        },
        {
            "prodcode":"102",
            "prodsku":"102-2",
            "prodqty":"2"
        },
        {
            "prodcode":"103",
            "prodsku":"103-3",
            "prodqty":"3"
        }
    ];

    var cardProducts = function() {
        var data = [];
        var carProdSkus=[];
        var carProdQty=[];

        cartData.forEach(function(k){
            carProdSkus.push(k["prodsku"]);
            carProdQty.push(k["prodqty"]);
        });

        prodData.forEach(function(k){
            if (carProdSkus.indexOf(k["prodsku"])>-1){
                data.push(k);
                data[data.length-1].prodqty= carProdQty[data.length-1];
              }
        });
        return data;
    };

    var getProdByCode = function(code, key){
        var selProd = {
            cardData:{},
            prodvariants:[]
        }
        var selCartItem = {}

        cartData.forEach(function(k){
            if (k["prodsku"]==code){
                selCartItem = k;
            }
        });

        prodData.forEach(function(k){
            if (k["prodcode"]==selCartItem.prodcode){
                selProd.prodvariants.push(k);
            }

            if (k["prodsku"]==selCartItem.prodsku){
                selProd.cardData = k;
                selProd.cardData.prodqty = selCartItem.prodqty;
            }
        });
        return selProd;
    };

    return{
        getCarts :function(){
            return cardProducts();
        },
        getCardProdByCode: function(code,key){
            return getProdByCode(code,key);
        }
    }
})();

var view = (function(m) {
	var DOMstrings = {
        dataRow: '.section-products',
        editLinkSelector: "div[class*='row-'] .edit",
        popup: '.containerPopup',
        popupContainer: '.containerPopup .overlayPopup',
        popupClose: '.containerPopup .close',
        subtotal: '.section-product-price span#subtotal',
        nettotal: '.section-product-price span#nettotal',
        totitem: 'span#item'
    };

    var fillProdRow = function(data){
        if (data.length>0){
            document.querySelector(DOMstrings.totitem).innerHTML = data.length;

            var totPrice=0.00;
            data.forEach(function(current,idx,array) {
                console.log(current);
                var html = 
                `
                <div class="container data-row row-${current.prodsku}">
                    <div class="col-data-1">
                        <img src="${current.prodimg}" alt="${current.prodname}" />
                    </div>
                    <div class="col-data-2">
                        <div class="prod-detail">
                            <h4>${current.prodname}</h4>
                            <p>Style #: ${current.prodstyle}</p>
                            <p>Colour: ${current.prodcolor}</p>
                        </div>
                    </div>
                    <div class="col-data-3">${current.prodsize}</div>
                    <div class="col-data-4">
                        <span class="prod-qty">${current.prodqty}</span>
                    </div>
                    <div class="col-data-5">
                        <sup>$</sup><span class="prod-price">${current.prodprice * current.prodqty}</span>
                    </div>
                    <div class="col-data-6">
                        <a class="edit" href="#">EDIT</a>|
                        <a class="remove" onclick="return javascript:void(0);">X REMOVE</a>|
                        <a class="save" onclick="return javascript:void(0);">SAVE FOR LATER</a>
                    </div>
                </div>
                `;
                document.querySelector(DOMstrings.dataRow).insertAdjacentHTML('beforeend', html);
                totPrice +=current.prodprice * current.prodqty;
            });
            document.querySelector(DOMstrings.subtotal).innerHTML = totPrice;
            document.querySelector(DOMstrings.nettotal).innerHTML = totPrice;
        }
    };

    var fillProdPopup = function(code){
        console.log("Row:",code);
        var selProd = m.getCardProdByCode(code,"prodsku");

        if (selProd.cardData){
            var coloVariantHtml = '';
            selProd.prodvariants.forEach(function(k){
                coloVariantHtml += `<span id="color-variant2" style="background-color:${k.prodcolor}"></span>`;
            });

            var html = `
            <div class="close">X</div>
            <div class="prod-cart">
                <span class="prod-big-name">${selProd.cardData.prodname}</span>
                <div class="cart-price">
                    <sub>$</sub><span>${selProd.cardData.prodprice}</span>
                </div>

                <span class="prod-small-name">${selProd.cardData.prodname}</span>
                <div class="cart-variant">${coloVariantHtml}</div>

                <div class="cart-variation-select">
                    <select name="prod-size" id="prod-size">
                        <option value="0">SIZE</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>

                    <select name="prod-qty" id="prod-qty">
                        <option value="1" selected>QTY: 1</option>
                        <option value="2">QTY: 2</option>
                        <option value="3">QTY: 3</option>
                        <option value="4">QTY: 4</option>
                        <option value="5">QTY: 5</option>
                    </select>
                </div>

                <button id="prod-btn" name="prod-btn" class="prod-btn">ADD TO BAG</button>

                <div class="cart-prod-link">
                    <a href="#">See product details</a>
                </div>
            </div>

            <div class="popup-prod-img">
                <img src="${selProd.cardData.prodimg}" alt="${selProd.cardData.prodname}"/>
            </div>
            `;
            document.querySelector(DOMstrings.popupContainer).innerHTML = html;
            document.querySelector(DOMstrings.popup).style.display="block";

            document.querySelector(DOMstrings.popupClose).addEventListener("click", function(){
                document.querySelector(DOMstrings.popup).style.display="none";
            });
        }
    };

    return {
        DOMElement: DOMstrings,
        fillProduct : function(data){
            fillProdRow(data);
        },
        fillProductPopup: function(index){
            fillProdPopup(index);
        }
    }
})(model);

var controller = (function(m,v) {
    var openPopup= function(ele){
        console.log(ele.parentNode.parentNode.className);
    };

    var setupInitialEvents = function(){
        document.querySelector(v.DOMElement.popupClose).addEventListener("click", function(){
            document.querySelector(v.DOMElement.popup).style.display="none";
        });
    };

    return {
        init: function() {
            var data= m.getCarts();
            //console.log(data);
            v.fillProduct(data);
            var editnodes = document.querySelectorAll(v.DOMElement.editLinkSelector);

            editnodes.forEach(function(current){
                current.addEventListener("click", function(){
                    var idx = current.parentNode.parentNode.className.split(" ")[2].replace('row-','');
                    v.fillProductPopup(idx);
                });
            });

            setupInitialEvents();
        },
        fillProductPopup: function(){
            
        },
        getProducts: function(){
            return m.getCarts();
        }
    }
})(model, view);

controller.init();

/**************************************************************
*            Product Json Data
**************************************************************/
