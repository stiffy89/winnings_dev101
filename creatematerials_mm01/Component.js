sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel'
],
	function(UIComponent, JSONModel) {
	"use strict";

	var Component = UIComponent.extend("ns.creatematerials_mm01.Component", {

		metadata : {
			manifest: "json"
		},

		init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
        },

		onAfterRendering: function () {
		/*	let oCard = this.getComponentData().__sapUiIntegration_card;
			oCard.request({
				"url" : "{{destinations.DS4}}/sap/opu/odata/sap/API_Product_srv/A_Product",
				"withCredentials": true
			}).then(function(oRes){
				console.log(oRes)
			}).catch(function(error){
				console.log(error);
			})  */

			let oModel = new JSONModel();
			oModel.loadData("{{destinations.DS4}}/sap/opu/odata/sap/API_Product_srv/A_Product").then(function(res){
				console.log(res);
			})
		}

	
	});

	return Component;

});
