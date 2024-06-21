sap.ui.define([
    "sap/ui/integration/Extension"
], 
    function (Extension) {
        "use strict";
        var CardExtension = Extension.extend("ns.outb_deliv_integration_card.ext.FormatterExtension");

        CardExtension.prototype.getData = function (arg) {
            
            var oCard = this.getCard();

            let sGreaterThanDate;

            switch (arg) {
                case "0" :
                        sGreaterThanDate = (moment().subtract(7, 'days').toISOString()).slice(0, -1);
                        break;

                case "1" : 
                        sGreaterThanDate = (moment().subtract(14, 'days').toISOString()).slice(0, -1);
                        break;

                case "2" :
                        sGreaterThanDate = (moment().subtract(30, 'days').toISOString()).slice(0, -1);
                        break;
            }

            let sFilterString = "";

            if (sGreaterThanDate){
                sFilterString = "DeliveryDate gt datetime'" + sGreaterThanDate + "'";
            }

            if (!sFilterString) {
                return new Promise((resolve, reject) => {
                    resolve([]);
                })
            } else {
                console.log(sFilterString);
                return oCard.request({
                    "url" : "{{destinations.ds4}}/sap/opu/odata/sap/API_OUTBOUND_DELIVERY_SRV;v=2/A_OutbDeliveryHeader?$filter=" + sFilterString + "&$expand=to_DeliveryDocumentPartner/to_Address&$format=json",
                    "withCredentials": true
                }).then(function(oData){
                    let results = oData.d.results;
                    console.log(results);
                    results.forEach(x => {
                        const date = new Date(parseInt(x.DeliveryDate.substr(6)));
                        x.DeliveryDateDisp = date.toLocaleString().substring(0, 10);
                    });
    
                    return results;
                })
            }
        };
        
        CardExtension.prototype.getFormatters = function() {
            return {
                getData: this.getData
            }
        };
    
        return CardExtension;
    }
); 