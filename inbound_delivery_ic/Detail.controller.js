sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	
	let oController;




	return Controller.extend("winnings.com.inbound_delivery_ic.Detail", {
		onInit: function() {
			const orderRoute = this.getOwnerComponent().getRouter().getRoute("detail");
  			orderRoute.attachPatternMatched(this.onPatternMatched, this);
		},

		onPatternMatched: function () {
			
		},
		toSupplierDetail: function (oEvent) {
			let oSelectedData = oEvent.getSource().getBindingContext().getObject();
			oController.getOwnerComponent()._selectedData = oSelectedData;
			oRouter.navTo('detail');
		}
	});
});