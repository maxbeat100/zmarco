sap.ui.define([
	"sap/ui/demo/walkthrough/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (BaseController, History, MessageToast, JSONModel) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.Detail", {
		onInit: function () {

			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Pour associé la view a la route 
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.byId("rating").reset();
			this.getView().bindElement({
				//Binding des données de la clé recu invoicePath=3 ex avec path "Tag du fichier JSON" Invoices donc = /Invoices/3 du model manifest "invoice"
				path: "/Invoices/" + oEvent.getParameter("arguments").invoicePath,
				model: "invoice"
			});
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		},
		onRatingChange: function (oEvent) {
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});