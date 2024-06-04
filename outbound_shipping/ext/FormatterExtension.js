sap.ui.define([
    "sap/ui/integration/Extension"
], 
    function (Extension, Controller) {
        "use strict";
        var CardExtension = Extension.extend("ns.outbound_shipping.ext.FormatterExtension");

        CardExtension.prototype.getData = async function (arg) {
            let skip;

            switch (arg){
                case "1":
                    skip = "0";
                        break;

                case "2":
                    skip = "5";
                        break;

                case "3":
                    skip = "10";
                        break;

                case "4":
                    skip = "15";
                        break;
            }

            var oCard = this.getCard();

            let oData = await oCard.request({
                "url" : "{{destinations.ES5}}/sap/opu/odata/iwbep/GWSAMPLE_BASIC/SalesOrderSet?$top=10",
                "withCredentials": true,
                "parameters" : {
                    "$orderby" : "CreatedAt desc",
                    "$skip": skip,
                    "$top" : "10",
                    "$expand" : "ToBusinessPartner,ToLineItems"
                }
            });

            oData.d.results.forEach(x => {
                const date = new Date(parseInt(x.CreatedAt.substr(6)));
                x.CreatedAt = date.toLocaleString().substring(0, 10);
            });

            let productIDs = [];

            oData.d.results.forEach(x => {
                x.ToLineItems.results.forEach(y => {
                    if (productIDs.indexOf(y.ProductID) == -1){
                        productIDs.push(y.ProductID)
                    }
                })
            });

            let sFilterString = "";

            productIDs.forEach((x, i, arr) => {
                if (i < (arr.length - 1)){
                    sFilterString += ("ProductID eq '"+ x + "' or ")
                }
                else {
                    sFilterString += ("ProductID eq '"+ x + "'")
                }
            });

            let oProductData = await oCard.request({
                "url" : "{{destinations.ES5}}/sap/opu/odata/iwbep/GWSAMPLE_BASIC/ProductSet",
                "withCredentials": true,
                "parameters" : {
                    "$filter" : sFilterString
                }
            });

            //now that we have all the product data, stick them back into the respective to line items
            oData.d.results.forEach(x => {
                x.ToLineItems.results.forEach(y => {
                    const sProductID = y.ProductID;
                    const matchingProduct = oProductData.d.results.find(z => {
                        return z.ProductID == sProductID
                    });

                    y['ToProduct'] = matchingProduct;
                })
            });

            console.log(oData);

            return oData;

            /* return oCard.request({
                "url" : "{{destinations.ES5}}/sap/opu/odata/iwbep/GWSAMPLE_BASIC/SalesOrderSet?$top=10",
                "withCredentials": true,
                "parameters" : {
                    "$orderby" : "CreatedAt desc",
                    "$skip": skip,
                    "$top" : "10",
                    "$expand" : "ToBusinessPartner,ToLineItems"
                }
            }).then(function(oData){
                //edit the date
                oData.d.results.forEach(x => {
                    const date = new Date(parseInt(x.CreatedAt.substr(6)));
                    x.CreatedAt = date.toLocaleString().substring(0, 10);
                });

                //we also need to get the data for the product information aswell, nested expand. Not supported in v2 odata. manually done
                let productIDs = [];

                oData.d.results.forEach(x => {
                    x.ToLineItems.results.forEach(y => {
                        if (productIDs.indexOf(y.ProductID) == -1){
                            productIDs.push(y.ProductID)
                        }
                    })
                });

                
                return oData;
            }) */
        };
        
        CardExtension.prototype.getFormatters = function() {
            return {
                getData: this.getData
            }
        };
    
        return CardExtension;
    }
); 