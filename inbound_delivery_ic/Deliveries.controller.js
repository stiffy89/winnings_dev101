sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	
	let oController;
	let oComponent;
	let oRouter;
	

	return Controller.extend("winnings.com.inbound_delivery_ic.Deliveries", {
		onInit: function () {
			oController = this;
			oComponent = this.getOwnerComponent();
			oRouter = this.getOwnerComponent().getRouter();
			
		},

		onReadRowData: function () {
			
			return new Promise(function(resolve, reject){
				let oDeliveriesPage = oController.byId("deliveriesPage");
				oDeliveriesPage.setBusy(true);
				setTimeout(function(){
					oDeliveriesPage.setBusy(false);
					resolve();
				}, 5000)
			})
			
			
		},

		onRenderDeliveryTable: function () {

			let aDeliveryData = GetDeliveryHeaderData();
			oComponent._deliveryResultsTable = new Tabulator('#inbDeliveryResTable', {
				layout: "fitColumns",
				placeholder: "No inbound deliveries found",
				resizableColumns: false,
				data: aDeliveryData,
				pagination: "local",
				paginationSize: 5,
				rowClick: function(e, row) {
					let oRowData = row._row.data;
					oController.onReadRowData().then(function(){
						let oComponentModel = oComponent.getModel();
						let oComponentData = oComponentModel.getData();
						oComponentData.detail.rowData = oRowData;
						oComponentModel.setData(oComponentData);
						oController.toDetail();
					})
				},
				columns: [
					{
						title: "Delivery Document",
						field: "DeliveryDocument",
						vertAlign: "middle",
						hozAlign: "left",
						headerHozAlign:"left",
						resizable: false,
						headerSort: false
					},
					{
						title: "Document Type",
						field: "DeliveryDocumentType",
						vertAlign: "middle",
						hozAlign: "left",
						headerHozAlign:"left",
						resizable: false,
						headerSort: false
					},
					{
						title: "Shipping Point",
						field: "ShippingPoint",
						vertAlign: "middle",
						hozAlign: "left",
						headerHozAlign:"left",
						resizable: false,
						headerSort: false
					}
				]
			});
		},
        
		toDetail: function (oRowData) {
			oRouter.navTo('detail');
		},

	});
});