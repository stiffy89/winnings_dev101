sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	
	let oController;
	let oComponent;



	return Controller.extend("winnings.com.inbound_delivery_ic.Detail", {
		onInit: function() {
			oController = this;
			oComponent = this.getOwnerComponent();
			const orderRoute = this.getOwnerComponent().getRouter().getRoute("detail");
  			orderRoute.attachPatternMatched(this.onPatternMatched, this);
		},

		onPatternMatched: function () {
			console.log(oComponent.getModel().getData().detail);
		},

		toDeliveryPage: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo('deliveries');
		}
	});
});