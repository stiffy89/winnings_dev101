sap.ui.define([
    "sap/ui/integration/Extension",
    "sap/ui/model/json/JSONModel"
], 
    function (Extension, JSONModel) {
        "use strict";
        var CardExtension = Extension.extend("ns.inbound_cost_kpi_card.ext.FormatterExtension");

        CardExtension.prototype.getData = function (arg) {

            var oCard = this.getCard();

            /* var appId = oCard.getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);
            var oModel = new JSONModel();
            let sUrl = appModulePath + "/user-api/currentUser";
            oModel.loadData(sUrl);
            oModel.dataLoaded()
            .then(()=>{
                console.log(oModel.getData())
            })
            .catch(()=>{               
                console.log('error base url')
            }); */

            oCard.request({
                "url" : "{{destinations.JAM}}/$Metadata",
                
            }).then(function(oData){ 
                console.log(oData);
            }).catch(function(err){
                console.log(err)
            });

            return new Promise(function (resolve, reject){
                //header data
                let data = {
                    "trend": "Up",
                    "valueColor": "Good",
                    "metric": "",
                    "lastYear": "",
                    "currentYear" : ""    
                };

                //chart data
                let chartData = [
                    {
                        "location" : "NSW Standard Delivery",
                        "cost" : "0"
                    },
                    {
                        "location" : "NSW Interstage",
                        "cost" : "0"
                    },
                    {
                        "location" : "NSW Customer Pick-up",
                        "cost" : "0"
                    },
                    {
                        "location" : "NSW Returns",
                        "cost" : "0"
                    }
                ]
    
                switch (arg){
                    case "1":
                        //week
                        data.trend = "Up";
                        data.valueColor = "Good";
                        data.metric = "22";
                        data.lastYear = "$1100.00";
                        data.currentYear = "$1320.00";

                        chartData[0].cost = "120";
                        chartData[1].cost = "200";
                        chartData[2].cost = "600";
                        chartData[3].cost = "400";
                        break;
    
                    case "2":
                        //month
                        data.trend = "Up";
                        data.valueColor = "Good";
                        data.metric = "11";
                        data.lastYear = "$5500.00";
                        data.currentYear = "$6105.00";

                        chartData[0].cost = "2105";
                        chartData[1].cost = "2500";
                        chartData[2].cost = "1000";
                        chartData[3].cost = "500";
                        break;
    
                    case "3":
                        //year
                        data.trend = "Up";
                        data.valueColor = "Good";
                        data.metric = "6";
                        data.lastYear = "$47000.00";
                        data.currentYear = "$49820.00";

                        chartData[0].cost = "9820";
                        chartData[1].cost = "9000";
                        chartData[2].cost = "21500";
                        chartData[3].cost = "8500";
                        break;
                }

                let oDataObj = {
                    "header" : data,
                    "chart" : chartData
                };

                resolve(oDataObj);
            })

            
            
            //just return some fake data for this


            
            /* return oCard.request({
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