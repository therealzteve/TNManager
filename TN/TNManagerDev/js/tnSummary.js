var TN_Summary = function(tnManager){
	var that = this;
	
	that.rowIdentifier = ".summaryTnRow";
	
	that.tnList = [];
	that.tnManager = tnManager;
	
	
	that.removeRow = function(tn){
		tn.destroyHtml();
		var index = that.tnList.indexOf(tn);
		if(index > -1){
			that.tnList.splice(index,1);
		}
	}
	

	that.init = function(){
		$(that.rowIdentifier).each(function(){
			var customer = new TN_customer(
					$(this).data("customer_id"),
					$(this).data("customer_name"),
					that.tnManager
					);
			var tn = new TN_Row($(this).data("tn_id"), customer, $(this).data("tn_date"), "");
			var row = new TN_SummaryRow(tn,$(this),that);
			that.tnList.push(row);
		});
	}
	
	
	that.init();
}

var TN_SummaryRow = function(tn,trRow, tnSummary){
	var that = this;
	that.tn = tn;
	
	that.btnPrefix= ".summaryDelBtn";
	that.trRow = trRow;
	
	
	that.destroyHtml = function(){
		$(trRow).remove();
	}
	
	
	that.deleteTn = function(){
		that.tn.deleteTn(function(){tnSummary.removeRow(that)});
	}
	
	
	
	that.init = function(){
		$(trRow).find(that.btnPrefix).click(function(){
			that.deleteTn();
		});
	}
	
	
	
	
	that.init();
}