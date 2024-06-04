sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("ns.help_banner.Card", {
		onInit: function () {
            var cardId = "ns.help_banner";
            cardId = cardId.replace(/\./g,'/');
			var oImgModel = new JSONModel({
                helpimage : sap.ui.require.toUrl(cardId + "/images") + "/Winning_family_photo.png"
            });
			this.getView().setModel(oImgModel, "images");
		}
	});
});