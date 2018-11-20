sap.ui.define([
	"sap/ui/demo/walkthrough/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		formatter: formatter,
		onInit: function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			// var userModel = new sap.ui.model.json.JSONModel("/services/userapi/currentUser");
			// sap.ui.getCore().setModel(userModel, "userapi");
		},
		onFilterInvoices: function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onPress: function (oEvent) {
			//Returns the event provider on which the event was fired.
			var oItem = oEvent.getSource();
			//Returns the reference to the router instance
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//Get the binding context of this object for the given model name
			var oDetail = oItem.getBindingContext("invoice").getPath();
			//obtenir la clé a passé a la vue detail
			var x = oDetail.charAt(oDetail.lastIndexOf("/")+1);
			// Nom de la route + paramètre de la route deéfini dans le manifest, on le voix dans le URL a la fin
			oRouter.navTo("detail", {
				invoicePath: x

			});
		}

	});
});