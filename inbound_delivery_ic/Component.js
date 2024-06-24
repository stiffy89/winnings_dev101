sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("winnings.com.inbound_delivery_ic.Component", {
		
		constructor: function(sId, mSettings) {
			UIComponent.call(this, "inbound_deliveries_component", mSettings);
		},
		
		metadata : {
			manifest: "json"
		},

		init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();

			let oModel = new sap.ui.model.json.JSONModel({
				"delivery" : {},
				"detail" : {}
			});
			
			this.setModel(oModel);
        }
	});

	return Component;

});
