sap.ui.define([
	"sap/ui/demo/walkthrough/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui.demo.walkthrough.controller.App", {
		
		onInit: function () {
			var a = this.getOwnerComponent().getContentDensityClass();
			this.getView().addStyleClass(a);
		},
		
		onOpenDialog: function () {
			this.getOwnerComponent().openHelloDialog();
		}
	});
});