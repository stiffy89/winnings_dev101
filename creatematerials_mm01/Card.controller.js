sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/ui/integration/Host'
], function (MessageToast, Controller, JSONModel, Host) {
	"use strict";

	return Controller.extend("ns.creatematerials_mm01.Card", {
		onInit: function () {
			let oMaterialCreateJSON = {
				"Product" : "",
				"ProductType": "",
				"CrossPlantStatus": "",
				"CrossPlantStatusValidityDate": null,
				"CreationDate": "\/Date(1715644800000)\/",
				"CreatedByUser": "900576",
				"LastChangeDate": "\/Date(1716336000000)\/",
				"LastChangedByUser": "900576",
				"LastChangeDateTime": "\/Date(1716357523000+0000)\/",
				"IsMarkedForDeletion": false,
				"ProductOldID": "",
				"GrossWeight": "0.000",
				"PurchaseOrderQuantityUnit": "",
				"SourceOfSupply": "",
				"WeightUnit": "KG",
				"NetWeight": "0.000",
				"CountryOfOrigin": "",
				"CompetitorID": "",
				"ProductGroup": "Z3PL01",
				"BaseUnit": "EA"
			}
		},

		onProductTypeVH: function () {
			let oDialog = new sap.m.Dialog({
				title: '',
				contentWidth:"300px",
				contentHeight:"500px",
				content: [

				],
				endButton: new sap.m.Button({
					icon:"sap-icon://sys-cancel-2",
					text:"Close",
					press: function() {
						oDialog.close();
					}
				}),
				afterClose: function () {
					this.destroy()
				}
			});

			oDialog.open();
		}
	});
});