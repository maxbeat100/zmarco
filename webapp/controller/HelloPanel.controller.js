sap.ui.define([
	"sap/ui/demo/walkthrough/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
		onShowHello: function () {
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);
			// show message
			MessageToast.show(sMsg);
		},
		onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		},
		onCloseDialog: function () {
			this.getView().byId("helloDialog").close();
		}
	});
});