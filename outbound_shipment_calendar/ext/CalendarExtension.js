sap.ui.define([
	"sap/ui/integration/Extension",
	"sap/ui/core/format/DateFormat",
	"sap/ui/core/date/UI5Date"
], function(Extension, DateFormat, UI5Date) {
	"use strict";

	var SampleExtension = Extension.extend("ns.outbound_shipment_calendar.ext.CalendarExtension");

	SampleExtension.prototype.getData = function (args) {
		let sLocationKey = args.location;
		let sCourierKey = args.courier;


		let aMasterData = [
			{
				"StartTime": '2024-05-15T10:00',
				"EndTime": '2024-05-15T11:00',
				"Courier": "UPS",
				"SaleOrderID": "10000000",
				"CourierColor": "Type01"
			},
			{
				"StartTime": '2024-05-16T10:00',
				"EndTime": '2024-05-16T11:00',
				"Courier": "UPS",
				"SaleOrderID": "10000001",
				"CourierColor": "Type01"
			},
			{
				"StartTime": '2024-05-17T10:00',
				"EndTime": '2024-05-17T11:00',
				"Courier": "UPS",
				"SaleOrderID": "10000002",
				"CourierColor": "Type01"
			},
			{
				"StartTime": '2024-05-18T10:00',
				"EndTime": '2024-05-18T11:00',
				"Courier": "UPS",
				"SaleOrderID": "10000003",
				"CourierColor": "Type01"
			},
			{
				"StartTime": '2024-05-19T10:00',
				"EndTime": '2024-05-19T11:00',
				"Courier": "UPS",
				"SaleOrderID": "10000004",
				"CourierColor": "Type01"
			},
			{
				"StartTime": '2024-05-20T10:00',
				"EndTime": '2024-05-20T11:00',
				"Courier": "UPS",
				"SaleOrderID": "10000005",
				"CourierColor": "Type01"
			},
			{
				"StartTime": '2024-05-15T10:00',
				"EndTime": '2024-05-15T11:00',
				"Courier": "Fedex",
				"SaleOrderID": "10000006",
				"CourierColor": "Type02"
			},
			{
				"StartTime": '2024-05-16T10:00',
				"EndTime": '2024-05-16T11:00',
				"Courier": "Fedex",
				"SaleOrderID": "10000007",
				"CourierColor": "Type02"
			},
			{
				"StartTime": '2024-05-17T10:00',
				"EndTime": '2024-05-17T11:00',
				"Courier": "Fedex",
				"SaleOrderID": "10000008",
				"CourierColor": "Type02"
			},
			{
				"StartTime": '2024-05-18T10:00',
				"EndTime": '2024-05-18T11:00',
				"Courier": "Fedex",
				"SaleOrderID": "10000009",
				"CourierColor": "Type02"
			},
			{
				"StartTime": '2024-05-19T10:00',
				"EndTime": '2024-05-19T11:00',
				"Courier": "Fedex",
				"SaleOrderID": "10000010",
				"CourierColor": "Type02"
			},
			{
				"StartTime": '2024-05-20T10:00',
				"EndTime": '2024-05-20T11:00',
				"Courier": "Fedex",
				"SaleOrderID": "100000011",
				"CourierColor": "Type02"
			}
		]

		let aItems = aMasterData;
		let aSpecialDate = [];

		if (sCourierKey == 3){
			aItems = aMasterData.filter(x => {
				if (x.Courier == "Fedex"){

					let endDate = new Date(x.StartTime).setDate(new Date(x.StartTime).getDate() + 1);
					aSpecialDate.push({
						"start" : new Date(x.StartTime),
						"end" : endDate.toLocaleDateString()
					})

					return x;
				}
			})
		}
		else if (sCourierKey == 4){
			aItems = aMasterData.filter(x => {
				if (x.Courier == "UPS"){
					let endDate = new Date(x.StartTime).setDate(new Date(x.StartTime).getDate() + 1);
					aSpecialDate.push({
						"start" : new Date(x.StartTime),
						"end" : endDate.toLocaleDateString()
					})

					return x;
				}
			})
		}

		let oCalendarData = {
			"date" : new Date().toLocaleDateString(),
			"items": aItems,
			"specialDate" : aSpecialDate
		}

		return new Promise(function(resolve, reject){
			resolve(oCalendarData);
		})
	};
	

	return SampleExtension;
});