sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	
	let oController;
	let oRouter;
	return Controller.extend("winnings.com.inbound_delivery_ic.Deliveries", {
		onInit: function () {
			oController = this;
			oRouter = this.getOwnerComponent().getRouter();
		},
        
		toDetail: function (oEvent) {
			oRouter.navTo('detail');
		}
	});
});