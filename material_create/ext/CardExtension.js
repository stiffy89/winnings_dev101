sap.ui.define([
    "sap/ui/integration/Extension",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], 
    function (Extension, MessageToast, JSONModel) {
        "use strict";
        var CardExtension = Extension.extend("ns.material_create.ext.CardExtension");
        
      

        CardExtension.prototype.init = function () {
            Extension.prototype.init.apply(this, arguments);
            this.attachAction(this.handleAction.bind(this));
        };

        CardExtension.prototype.handleAction = function (oEvent) {
           
            let oCard = oEvent.oSource._oCard;
			let sActionType = oEvent.getParameter("type");
			let mParams = oEvent.getParameter("parameters");
			let mSubmitData = mParams.data;

            if (sActionType == "Submit"){
                // Validation
                oCard._bControlsValid = oCard.validateControls();
                
                if (!oCard._bControlsValid) {
                    oCard.showMessage("Please fill out the required fields", "Error");
                    return;
                } 

                const msg = "Material Created"
                
                MessageToast.show(msg);
            }

            let oFilterModel = oCard.getModel('filters');
            
            //set the data to nothing
            //this filter thing is sap.ui.integration.filter.SearchFilter --> its not in the sapui5 SDK?
            oFilterModel.setData({
                "searchMaterial" : {
                    value : ''
                }
            });
            
            //run the refresh the data
            oCard.refreshData();
        }

        CardExtension.prototype.getData = function (arg) {

            return new Promise(function (resolve, reject){

                let uomVH= [
                    {
                        "id" : "EA",
                        "text" : "Each"
                    },
                    {
                        "id" : "BOX",
                        "text" : "Box"
                    },
                    {
                        "id" : "PAI",
                        "text" : "Pair"
                    },
                    {
                        "id" : "BAG",
                        "text" : "BAG"
                    }
                ];

                let uowVH = [
                    {
                        "id" : "KG",
                        "text" : "Kilogram"
                    },
                    {
                        "id" : "LB",
                        "text" : "Pounds"
                    },
                    {
                        "id" : "GM",
                        "text" : "Grams"
                    }
                ]

                let aSampleData = [
                      {
                        "id": 1,
                        "name": "Plexiglass",
                        "description": "Glass Material",
                        "grossweight": 174,
                        "netweight": 505,
                        "volume": 60,
                        "uom" : "BOX",
                        "uow" : "KG"
                      }, {
                        "id": 2,
                        "name": "Mortar Mix",
                        "description": "Rough Building Material",
                        "grossweight": 312,
                        "netweight": 250,
                        "volume": 63,
                        "uom" : "BAG",
                        "uow" : "KG"
                      }, {
                        "id": 3,
                        "name": "FibreGlass",
                        "description": "Lightweight Shell Material",
                        "grossweight": 577,
                        "netweight": 115,
                        "volume": 63,
                        "uom" : "BOX",
                        "uow" : "KG"
                      }, {
                        "id": 4,
                        "name": "Steel",
                        "description": "Building Material",
                        "grossweight": 846,
                        "netweight": 306,
                        "volume": 36,
                        "uom" : "EA",
                        "uow" : "KG"
                      }, {
                        "id": 5,
                        "name": "Ply-Wood",
                        "description": "Building Material",
                        "grossweight": 122,
                        "netweight": 31,
                        "volume": 55,
                        "uom" : "EA",
                        "uow" : "KG"
                      }, {
                        "id": 6,
                        "name": "Cement",
                        "description": "Building Material",
                        "grossweight": 122,
                        "netweight": 31,
                        "volume": 55,
                        "uom" : "BAG",
                        "uow" : "KG"
                      }
                ]

                let oDataObj = {
                    "id": "",
                    "name": "",
                    "description": "",
                    "grossweight": "",
                    "netweight": "",
                    "volume": "",
                    "uom" : "EA",
                    "uow" : "KG"
                }
                
                if (arg){
                    //find the material
                    const foundObj = aSampleData.find(x => {
                        if (x.id.toString() === arg){
                           
                            return x;
                        }
                    });

                    if (foundObj) {
                        oDataObj = foundObj;
                    } else {
                        const msg = "No materials were found with this specific ID"
				        MessageToast.show(msg);
                    }
                }

                //tag on the value helps
                oDataObj["uomVH"] = uomVH;
                oDataObj["uowVH"] = uowVH;

                resolve(oDataObj);
            })
        };

    
        return CardExtension;
    }
); 