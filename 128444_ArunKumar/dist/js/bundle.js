/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/js/controllers/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/controllers/index.js":
/*!*******************************************!*\
  !*** ./resources/js/controllers/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import {data} from '../models/products';\r\n\r\n// console.log(data);\r\n\r\nvar model = (function() {\r\n    var prodData = [\r\n        {\r\n            \"prodcode\":\"101\",\r\n            \"prodname\":\"Solid Green Cotton TShirt For Man\",\r\n            \"prodstyle\":\"YG45656576HU\",\r\n            \"prodimg\":\"/resources/img/product1.png\",\r\n            \"prodprice\":10.00,\r\n            \"prodsize\":\"S\",\r\n            \"prodcolor\":\"#009900\",\r\n            \"prodsku\":\"101-1\",\r\n            \"prodqty\":\"15\"\r\n        },\r\n        {\r\n            \"prodcode\":\"101\",\r\n            \"prodname\":\"Solid Green Cotton TShirt For Man\",\r\n            \"prodstyle\":\"RT3454HU\",\r\n            \"prodimg\":\"/resources/img/product1.png\",\r\n            \"prodprice\":10.00,\r\n            \"prodsize\":\"S\",\r\n            \"prodcolor\":\"#000099\",\r\n            \"prodsku\":\"101-2\",\r\n            \"prodqty\":\"15\"\r\n        },\r\n        {\r\n            \"prodcode\":\"101\",\r\n            \"prodname\":\"Solid Green Cotton TShirt For Man\",\r\n            \"prodstyle\":\"PO6868HGJ\",\r\n            \"prodimg\":\"/resources/img/product1.png\",\r\n            \"prodprice\":10.00,\r\n            \"prodsize\":\"S\",\r\n            \"prodcolor\":\"#000099\",\r\n            \"prodsku\":\"101-3\",\r\n            \"prodqty\":\"15\"\r\n        },\r\n        {\r\n            \"prodcode\":\"102\",\r\n            \"prodname\":\"Purple Feather Black Open Front Jacket\",\r\n            \"prodstyle\":\"WQ65768QTE\",\r\n            \"prodimg\":\"/resources/img/product2.png\",\r\n            \"prodprice\":20.00,\r\n            \"prodsize\":\"S\",\r\n            \"prodcolor\":\"#009900\",\r\n            \"prodsku\":\"102-1\",\r\n            \"prodqty\":\"20\"\r\n        },\r\n        {\r\n            \"prodcode\":\"102\",\r\n            \"prodname\":\"Purple Feather Black Open Front Jacket\",\r\n            \"prodstyle\":\"AFD4787HYJ\",\r\n            \"prodimg\":\"/resources/img/product2.png\",\r\n            \"prodprice\":20.00,\r\n            \"prodsize\":\"M\",\r\n            \"prodcolor\":\"#000099\",\r\n            \"prodsku\":\"102-2\",\r\n            \"prodqty\":\"20\"\r\n        },\r\n        {\r\n            \"prodcode\":\"102\",\r\n            \"prodname\":\"Purple Feather Black Open Front Jacket\",\r\n            \"prodstyle\":\"MS132THK10376\",\r\n            \"prodimg\":\"/resources/img/product2.png\",\r\n            \"prodprice\":20.00,\r\n            \"prodsize\":\"L\",\r\n            \"prodcolor\":\"#009900\",\r\n            \"prodsku\":\"102-3\",\r\n            \"prodqty\":\"20\"\r\n        },\r\n        {\r\n            \"prodcode\":\"103\",\r\n            \"prodname\":\"Van Heusen Men Blue Single Breasted Slim Fit Suit\",\r\n            \"prodstyle\":\"DFF44646GH\",\r\n            \"prodimg\":\"/resources/img/product3.png\",\r\n            \"prodprice\":15.00,\r\n            \"prodsize\":\"S\",\r\n            \"prodcolor\":\"#991400\",\r\n            \"prodsku\":\"103-1\",\r\n            \"prodqty\":\"10\"\r\n        },\r\n        {\r\n            \"prodcode\":\"103\",\r\n            \"prodname\":\"Van Heusen Men Blue Single Breasted Slim Fit Suit\",\r\n            \"prodstyle\":\"DFF44646GH\",\r\n            \"prodimg\":\"/resources/img/product3.png\",\r\n            \"prodprice\":15.00,\r\n            \"prodsize\":\"L\",\r\n            \"prodcolor\":\"#009955\",\r\n            \"prodsku\":\"103-2\",\r\n            \"prodqty\":\"10\"\r\n        },\r\n        {\r\n            \"prodcode\":\"103\",\r\n            \"prodname\":\"Van Heusen Men Blue Single Breasted Slim Fit Suit\",\r\n            \"prodstyle\":\"DFF44646GH\",\r\n            \"prodimg\":\"/resources/img/product3.png\",\r\n            \"prodprice\":15.00,\r\n            \"prodsize\":\"XL\",\r\n            \"prodcolor\":\"#335599\",\r\n            \"prodsku\":\"103-3\",\r\n            \"prodqty\":\"10\"\r\n        }\r\n    ];\r\n    var cartData = [\r\n        {\r\n            \"prodcode\":\"101\",\r\n            \"prodsku\":\"101-1\",\r\n            \"prodqty\":\"2\"\r\n        },\r\n        {\r\n            \"prodcode\":\"102\",\r\n            \"prodsku\":\"102-1\",\r\n            \"prodqty\":\"1\"\r\n        },\r\n        {\r\n            \"prodcode\":\"102\",\r\n            \"prodsku\":\"102-2\",\r\n            \"prodqty\":\"2\"\r\n        },\r\n        {\r\n            \"prodcode\":\"103\",\r\n            \"prodsku\":\"103-3\",\r\n            \"prodqty\":\"3\"\r\n        }\r\n    ];\r\n\r\n    var cardProducts = function() {\r\n        var data = [];\r\n        var carProdSkus=[];\r\n        var carProdQty=[];\r\n\r\n        cartData.forEach(function(k){\r\n            carProdSkus.push(k[\"prodsku\"]);\r\n            carProdQty.push(k[\"prodqty\"]);\r\n        });\r\n\r\n        prodData.forEach(function(k){\r\n            if (carProdSkus.indexOf(k[\"prodsku\"])>-1){\r\n                data.push(k);\r\n                data[data.length-1].prodqty= carProdQty[data.length-1];\r\n              }\r\n        });\r\n        return data;\r\n    };\r\n\r\n    var getProdByCode = function(code, key){\r\n        var selProd = {\r\n            cardData:{},\r\n            prodvariants:[]\r\n        }\r\n        var selCartItem = {}\r\n\r\n        cartData.forEach(function(k){\r\n            if (k[\"prodsku\"]==code){\r\n                selCartItem = k;\r\n            }\r\n        });\r\n\r\n        prodData.forEach(function(k){\r\n            if (k[\"prodcode\"]==selCartItem.prodcode){\r\n                selProd.prodvariants.push(k);\r\n            }\r\n\r\n            if (k[\"prodsku\"]==selCartItem.prodsku){\r\n                selProd.cardData = k;\r\n                selProd.cardData.prodqty = selCartItem.prodqty;\r\n            }\r\n        });\r\n        return selProd;\r\n    };\r\n\r\n    return{\r\n        getCarts :function(){\r\n            return cardProducts();\r\n        },\r\n        getCardProdByCode: function(code,key){\r\n            return getProdByCode(code,key);\r\n        }\r\n    }\r\n})();\r\n\r\nvar view = (function(m) {\r\n\tvar DOMstrings = {\r\n        dataRow: '.section-products',\r\n        editLinkSelector: \"div[class*='row-'] .edit\",\r\n        popup: '.containerPopup',\r\n        popupContainer: '.containerPopup .overlayPopup',\r\n        popupClose: '.containerPopup .close',\r\n        subtotal: '.section-product-price span#subtotal',\r\n        nettotal: '.section-product-price span#nettotal',\r\n        totitem: 'span#item'\r\n    };\r\n\r\n    var fillProdRow = function(data){\r\n        if (data.length>0){\r\n            document.querySelector(DOMstrings.totitem).innerHTML = data.length;\r\n\r\n            var totPrice=0.00;\r\n            data.forEach(function(current,idx,array) {\r\n                console.log(current);\r\n                var html = \r\n                `\r\n                <div class=\"container data-row row-${current.prodsku}\">\r\n                    <div class=\"col-data-1\">\r\n                        <img src=\"${current.prodimg}\" alt=\"${current.prodname}\" />\r\n                    </div>\r\n                    <div class=\"col-data-2\">\r\n                        <div class=\"prod-detail\">\r\n                            <h4>${current.prodname}</h4>\r\n                            <p>Style #: ${current.prodstyle}</p>\r\n                            <p>Colour: ${current.prodcolor}</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-data-3\">${current.prodsize}</div>\r\n                    <div class=\"col-data-4\">\r\n                        <span class=\"prod-qty\">${current.prodqty}</span>\r\n                    </div>\r\n                    <div class=\"col-data-5\">\r\n                        <sup>$</sup><span class=\"prod-price\">${current.prodprice * current.prodqty}</span>\r\n                    </div>\r\n                    <div class=\"col-data-6\">\r\n                        <a class=\"edit\" href=\"#\">EDIT</a>|\r\n                        <a class=\"remove\" onclick=\"return javascript:void(0);\">X REMOVE</a>|\r\n                        <a class=\"save\" onclick=\"return javascript:void(0);\">SAVE FOR LATER</a>\r\n                    </div>\r\n                </div>\r\n                `;\r\n                document.querySelector(DOMstrings.dataRow).insertAdjacentHTML('beforeend', html);\r\n                totPrice +=current.prodprice * current.prodqty;\r\n            });\r\n            document.querySelector(DOMstrings.subtotal).innerHTML = totPrice;\r\n            document.querySelector(DOMstrings.nettotal).innerHTML = totPrice;\r\n        }\r\n    };\r\n\r\n    var fillProdPopup = function(code){\r\n        console.log(\"Row:\",code);\r\n        var selProd = m.getCardProdByCode(code,\"prodsku\");\r\n\r\n        if (selProd.cardData){\r\n            var coloVariantHtml = '';\r\n            selProd.prodvariants.forEach(function(k){\r\n                coloVariantHtml += `<span id=\"color-variant2\" style=\"background-color:${k.prodcolor}\"></span>`;\r\n            });\r\n\r\n            var html = `\r\n            <div class=\"close\">X</div>\r\n            <div class=\"prod-cart\">\r\n                <span class=\"prod-big-name\">${selProd.cardData.prodname}</span>\r\n                <div class=\"cart-price\">\r\n                    <sub>$</sub><span>${selProd.cardData.prodprice}</span>\r\n                </div>\r\n\r\n                <span class=\"prod-small-name\">${selProd.cardData.prodname}</span>\r\n                <div class=\"cart-variant\">${coloVariantHtml}</div>\r\n\r\n                <div class=\"cart-variation-select\">\r\n                    <select name=\"prod-size\" id=\"prod-size\">\r\n                        <option value=\"0\">SIZE</option>\r\n                        <option value=\"S\">S</option>\r\n                        <option value=\"M\">M</option>\r\n                        <option value=\"L\">L</option>\r\n                        <option value=\"XL\">XL</option>\r\n                    </select>\r\n\r\n                    <select name=\"prod-qty\" id=\"prod-qty\">\r\n                        <option value=\"1\" selected>QTY: 1</option>\r\n                        <option value=\"2\">QTY: 2</option>\r\n                        <option value=\"3\">QTY: 3</option>\r\n                        <option value=\"4\">QTY: 4</option>\r\n                        <option value=\"5\">QTY: 5</option>\r\n                    </select>\r\n                </div>\r\n\r\n                <button id=\"prod-btn\" name=\"prod-btn\" class=\"prod-btn\">ADD TO BAG</button>\r\n\r\n                <div class=\"cart-prod-link\">\r\n                    <a href=\"#\">See product details</a>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"popup-prod-img\">\r\n                <img src=\"${selProd.cardData.prodimg}\" alt=\"${selProd.cardData.prodname}\"/>\r\n            </div>\r\n            `;\r\n            document.querySelector(DOMstrings.popupContainer).innerHTML = html;\r\n            document.querySelector(DOMstrings.popup).style.display=\"block\";\r\n\r\n            document.querySelector(DOMstrings.popupClose).addEventListener(\"click\", function(){\r\n                document.querySelector(DOMstrings.popup).style.display=\"none\";\r\n            });\r\n        }\r\n    };\r\n\r\n    return {\r\n        DOMElement: DOMstrings,\r\n        fillProduct : function(data){\r\n            fillProdRow(data);\r\n        },\r\n        fillProductPopup: function(index){\r\n            fillProdPopup(index);\r\n        }\r\n    }\r\n})(model);\r\n\r\nvar controller = (function(m,v) {\r\n    var openPopup= function(ele){\r\n        console.log(ele.parentNode.parentNode.className);\r\n    };\r\n\r\n    var setupInitialEvents = function(){\r\n        document.querySelector(v.DOMElement.popupClose).addEventListener(\"click\", function(){\r\n            document.querySelector(v.DOMElement.popup).style.display=\"none\";\r\n        });\r\n    };\r\n\r\n    return {\r\n        init: function() {\r\n            var data= m.getCarts();\r\n            //console.log(data);\r\n            v.fillProduct(data);\r\n            var editnodes = document.querySelectorAll(v.DOMElement.editLinkSelector);\r\n\r\n            editnodes.forEach(function(current){\r\n                current.addEventListener(\"click\", function(){\r\n                    var idx = current.parentNode.parentNode.className.split(\" \")[2].replace('row-','');\r\n                    v.fillProductPopup(idx);\r\n                });\r\n            });\r\n\r\n            setupInitialEvents();\r\n        },\r\n        fillProductPopup: function(){\r\n            \r\n        },\r\n        getProducts: function(){\r\n            return m.getCarts();\r\n        }\r\n    }\r\n})(model, view);\r\n\r\ncontroller.init();\r\n\r\n/**************************************************************\r\n*            Product Json Data\r\n**************************************************************/\r\n\n\n//# sourceURL=webpack:///./resources/js/controllers/index.js?");

/***/ })

/******/ });