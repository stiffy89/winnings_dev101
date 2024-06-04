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
                        data.metric = "11";
                        data.lastYear = "105";
                        data.currentYear = "116";

                        chartData[0].cost = "10";
                        chartData[1].cost = "50";
                        chartData[2].cost = "42";
                        chartData[3].cost = "14";
                        break;
    
                    case "2":
                        //month
                        data.trend = "Up";
                        data.valueColor = "Good";
                        data.metric = "20";
                        data.lastYear = "1054";
                        data.currentYear = "1265";

                        chartData[0].cost = "351";
                        chartData[1].cost = "640";
                        chartData[2].cost = "113";
                        chartData[3].cost = "200";
                        break;
    
                    case "3":
                        //year
                        data.trend = "Up";
                        data.valueColor = "Good";
                        data.metric = "6";
                        data.lastYear = "3120";
                        data.currentYear = "3307";

                        chartData[0].cost = "580";
                        chartData[1].cost = "1720";
                        chartData[2].cost = "250";
                        chartData[3].cost = "757";
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