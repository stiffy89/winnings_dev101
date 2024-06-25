sap.ui.define([
    "sap/ui/integration/Extension"
], 
    function (Extension) {
        "use strict";
        var CardExtension = Extension.extend("winnings.inbound_delivery_sloc_ic.ext.FormatterExtension");

        CardExtension.prototype.getData = function (arg) {
            
            var oCard = this.getCard();

            let sLastCalYear = (moment().subtract(365, 'days').toISOString()).slice(0, -1);
            let sRequestUrl = "{{destinations.ds4}}/sap/opu/odata/sap/API_INBOUND_DELIVERY_SRV;v=2/A_InbDeliveryItem?$format=json&$filter=CreationDate gt datetime'" + sLastCalYear + "'";

            if (arg){
               let sSloc = arg.toUpperCase();
               sRequestUrl += "&$filter=StorageLocation eq '"+sSloc+"'";
            }


            return oCard.request({
                "url" : sRequestUrl,
                "withCredentials": true
            }).then(function(oData){
                let results = oData.d.results;
                
                let oPastWeekDate = moment().subtract(7, 'days').toDate();
                let oPastFortnightDate = moment().subtract(14, 'days').toDate();
                let oPastMonthDate = moment().subtract(30, 'days').toDate();

                let aChartData = [
                    {
                        "Period" : "Past 7 Days",
                        "Count" : 0
                    },
                    {
                        "Period" : "Past 14 Days",
                        "Count" : 0
                    },
                    {
                        "Period" : "Past 30 Days",
                        "Count" : 0
                    }, 
                    {
                        "Period" : "Past Year",
                        "Count" : 0
                    }
                ];
                
                results.forEach((x) => {
                    
                    const date = new Date(parseInt(x.CreationDate.substr(6)));
                    let iQuantity = parseInt(x.ActualDeliveryQuantity);

                    //add to all of them
                    if (date >= oPastWeekDate){
                        [0,1,2,3].forEach((y) => {
                            aChartData[y].Count += iQuantity
                        });
                    }
                    else if (date >= oPastFortnightDate){
                        [1,2,3].forEach((y) => {
                            aChartData[y].Count += iQuantity
                        });
                    }
                    else if (date >= oPastMonthDate){
                        [2,3].forEach((y) => {
                            aChartData[y].Count += iQuantity
                        });
                    }
                    else {
                        aChartData[3].Count += iQuantity
                    }
                });

                let sTitle = "Delivered items across all storage locations"
                
                if (arg){
                    sTitle = "Delivered items across '" + arg + "' storage location"
                }

                let oResultsData = {
                    "title" : sTitle,
                    "chart" : aChartData
                }

                return oResultsData;
            })
        };

        CardExtension.prototype.getQuantityFormatter = function (val) {
            return parseInt(val);
        };
        
        CardExtension.prototype.getFormatters = function() {
            return {
                getData: this.getData,
                getQuantityFormatter: this.getQuantityFormatter
            }
        };
    
        return CardExtension;
    }
); 