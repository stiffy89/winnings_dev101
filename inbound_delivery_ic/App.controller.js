jQuery.sap.registerModulePath("inbound_delivery_css", "./css/");
jQuery.sap.includeStyleSheet(sap.ui.resource("inbound_delivery_css", "style.css"));	
jQuery.sap.includeStyleSheet(sap.ui.resource("inbound_delivery_css", "tabulator.css"));	
jQuery.sap.includeStyleSheet(sap.ui.resource("inbound_delivery_css", "tabulator_simple.css"));	

sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	
	return Controller.extend("winnings.com.inbound_delivery_ic.App", {
		onInit: function() {
			
		}
	});
});