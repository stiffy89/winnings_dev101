sap.ui.define([
    "sap/ui/integration/Extension"
], 
    function (Extension, Controller) {
        "use strict";
        var CardExtension = Extension.extend("ns.inbound_delivery_ui_card.ext.FormatterExtension");

        CardExtension.prototype.getData = function (arg) {
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
            
            return oCard.request({
                "url" : "{{destinations.ES5}}/sap/opu/odata/iwbep/GWSAMPLE_BASIC/SalesOrderSet?$top=10",
                "withCredentials": true,
                "parameters" : {
                    "$orderby" : "CreatedAt desc",
                    "$skip": skip,
                    "$top" : "10",
                    "$expand" : "ToBusinessPartner"
                }
            }).then(function(oData){
                //edit the date
                oData.d.results.forEach(x => {
                    const date = new Date(parseInt(x.CreatedAt.substr(6)));
                    x.CreatedAt = date.toLocaleString().substring(0, 10);
                });

                return oData;
            })
        };
        
        CardExtension.prototype.getFormatters = function() {
            return {
                getData: this.getData
            }
        };
    
        return CardExtension;
    }
); 