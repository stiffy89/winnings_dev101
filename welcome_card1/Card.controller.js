sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("ns.welcome_card1.Card", {
		onInit: function () {
           

			//once we have the card instance
			let oCardInstance = this.getOwnerComponent().getComponentData().__sapUiIntegration_card;

			//show the loading placeholders
			//we can actually separate each area, but just show the whole thing for now
			//https://sapui5.hana.ondemand.com/#/api/sap.ui.integration.widgets.Card%23methods/showLoadingPlaceholders
			oCardInstance.showLoadingPlaceholders();

			oCardInstance.getHostInstance().getContextValue("sap.workzone/currentUser")
			.then((data) => {

				var cardId = "ns.welcome_card1".replace(/\./g,'/');
				var sName = data.name.value;
				var sDate = (new Date()).toDateString();
				var today = new Date()
				var curHr = today.getHours()
				var time = null;

				if (curHr < 12) {
				var time = "Morning";
				} else if (curHr < 18) {
				var time = "Afternoon";
				} else {
				var time = "Evening";
				}

				const welcomeText = "Good " + time + ", " + sName;

				var oImgModel = new JSONModel({
					welcomeTile : sap.ui.require.toUrl(cardId + "/images") + "/winnings_banner2.jpg",
					date : sDate,
					welcome : welcomeText
				});

				this.getView().setModel(oImgModel, "images");
				oCardInstance.hideLoadingPlaceholders();

			}).catch((error) => {
				const msg = "An error occured in trying to retrieve the details of the user"
				MessageToast.show(msg);
			})

			

			
			
			
		}
	});
});