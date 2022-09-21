sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("employeedetail.controller.ObjectDetail", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments").id;
			oView = this.getView();
			oView.bindElement({
				path : "/EmployeeSet(" + oArgs + ")/resume",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});