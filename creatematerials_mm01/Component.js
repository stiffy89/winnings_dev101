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

	
	});

	return Component;

});
