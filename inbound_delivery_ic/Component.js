sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("winnings.com.inbound_delivery_ic.Component", {
		init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();
        },
		
		onCardReady: function (oCard) {
			// Holds the card for use inside the controller
			this.card = oCard;

		}
	});

	return Component;

});
