var TN_CustomerHandler = function(tnManager){
	var that = this;
	that.tnManager = tnManager;
	that.customerList = [];
	that.add_new_cust_button = $("#new_cust_btn");	
	that.add_new_cust_text = $("#new_cust_name");	
	that.add_new_cust_hint = $("#customer-add-hint");
	
	that._init = function(){
		
		$(that.add_new_cust_button).click(function(){that.addNewCustomer()});
		
		$(that.add_new_cust_text).focus(function(){
			$(that.add_new_cust_hint).empty();
		});
		
		$(".tn_customer").each(function(){
			var customer = new TN_customer(
					$(this).data("customer_id"),
					$(this).data("customer_name"),
					that.tnManager
					);
			
			customer.setDomElement($(this));
			customer.installAddButton();
			that.customerList.push(customer);
		});
	};
	
	that.findCustomer = function(custName){
		for(var i = 0; i < that.customerList.length; i++){
			if(that.customerList[i].getName().toUpperCase() != custName.toUpperCase()){
				i++;
			}else{
				return that.customerList[i];
			}
		}
		return null;
	}	

	
	that.addNewCustomer = function(){
		if($(that.add_new_cust_text).val() != "" ){
			if(that.findCustomer($(that.add_new_cust_text).val()) == null){
				addNewCustomer($(that.add_new_cust_text).val(),that.customerAdded);
			}else{
				$(that.add_new_cust_hint).html("Kunde ist bereits in Liste!");
			}
		}else{
			$(that.add_new_cust_hint).html("Bitte Kundenname eintragen!");
		}
	}
	
	that.customerAdded = function(data){
		var newCust  = new TN_customer(data.id,data.name,that.tnManager);
		newCust.createDomElement();
		
		that._addAlphabetically(newCust);
		var tn = that.tnManager.addNewTn(newCust);
		that.tnManager.table.addRow(tn);
	}
	
	
	
	
	
	that._addAlphabetically = function(tn_customer){
    	var added = false;
		for(var i = 0; i < that.customerList.length; i++){
	    	if(!added && that.customerList[i].getName().toUpperCase() > tn_customer.getName().toUpperCase()){
	    		added = true;
	    		$(tn_customer.getDomElement()).insertBefore(that.customerList[i].getDomElement());
	    		that.customerList.splice(i, 0, tn_customer);
	    	}
	    }
	};
	
	that._init();
};	


var TN_customer = function(id,name,tnManager){
		var that = this;
		that._name = name;
		that._id  = id;
		that._domElement;
		that._labelSpan;
		that._button;
		that._tnManager = tnManager;
		
		
		that.setName = function(name){
			that._name = name;
		};

		that.getName = function(){
			return that._name;
		};

		that.setId = function(id){
			that._id = id;
		};

		that.getId = function(){
			return that._id;
		};
		
		that.setDomElement = function(element){
			that._domElement = element;
		}
		
		that.getDomElement = function(){
			return that._domElement;
		}
		
		that.createDomElement = function(){
			var container = $("<div></div>")
				.addClass("tn_customer")
				.data("customer_id",that._id)
				.data("customer_name",that._name);
			var span = $("<span></span>").text(that._name);
			$(container).append(span);
			that._domElement = container;
			that.installAddButton();
		};
		

		that.installAddButton = function(){
			var addButton = $("<button>+</button>")
			.addClass("tn_customer_add_button")
			.click(function(){
				var tn = that._tnManager.addNewTn(that);
				that._tnManager.table.addRow(tn);
			});
			$(that._domElement).prepend(addButton);
		};
		
		
		
	};