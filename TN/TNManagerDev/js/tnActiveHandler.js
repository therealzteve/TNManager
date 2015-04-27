var TN_activeHandler = function(tnManager,activeTns){
	var that = this;
	that.activeTns = activeTns;
	that.amountTns = activeTns.length;
	// Maybe we need later
	// that.tnTimes = [];
	
	
	// DOM Elements
	that._dialogContainer = $( "<div id='openTns'></div>" );
	 
	that.handleEndTimeEdit = function(e){
		
		//get vars
		var timeField = $(this).data("timeField");
		var rowId = $(this).data("rowId");
		var start = $(this).data("startTime");
		var end = $(this).val();
		
		//update GUI
		var d = moment.duration(end).subtract(moment.duration(start));
		
		//update model
		that.activeTns[rowId].time = d.as('seconds');
		
		
		//update GUI
		$(timeField).html(moment.utc(d.as('milliseconds')).format("HH:mm:ss"));
	};
	
	
	that.handleSavedRow = function(tr,time){
		$(tr).remove();
		that.amountTns--;
		if(that.amountTns == 0){
			$(that._dialogContainer).dialog('close');
		}
	};
	
	
	that._prepareTns = function(){
		
		var createCallback = function(tr){
			return function(){
				that.handleSavedRow(tr);
			}
		}
		
		var tnList = $("<table></table>");
		for(var i = 0; i < that.activeTns.length; i++  ){
			var activeTn = $.parseJSON(that.activeTns[i]);
			
			var tr = $("<tr></tr>");

			// Used helper function for callback to avoid call by reference
			var tn_activeTime = new TN_activeTime(activeTn,createCallback(tr));
			
			//Maybe we need later
//			that.tnTimes.push(tn_activeTime);
			
			
				$(tr).append("<td>"+ activeTn.date+"</td>")
				.append("<td>"+ activeTn.name+"</td>")
				.append($("<td></td>").append(tn_activeTime.getStartField()))
				.append($("<td></td>").append(tn_activeTime.getEndField()))
				.append($("<td></td>").append(tn_activeTime.getTimeField()))
				.append($("<td></td>").append(tn_activeTime.getOkButton()));
			$(tnList).append(tr);
		}
		return tnList;
	};
	
	that._init = function(){
		if(typeof that.activeTns != "undefined" && that.activeTns.length > 0){
			 
			 $(that._dialogContainer).append(that._prepareTns());
			 
			 $(that._dialogContainer).dialog({
				 autoOpen: false,
				 title: 'Noch offene TNs:',
				 height: 300,
				 width: 'auto',
				 modal: true,
				 buttons: {
					 "OK": function() {
						 $( this ).dialog( "close" );
					 },
					 Cancel: function() {
						 $( this ).dialog( "close" );
					 }
				 },
				 close: function() {
				 }
			}).dialog("open");
		}
		
		
	};
	
	that._init();
};


var TN_activeTime = function(time, saveCallback){
	//JS Vars
	var that = this;
	that._time = time;
	
	//DOM Elements
	that._okButton = $("<input type='button' value='ok' />");
	that._startField = $("<span></span>");
	that._endField = $("<input type='text' />");
	that._timeField = $("<span></span>");
	
	
	/**
	 *  Updates the row at the server
	 *  Callback for save button
	 */
	that.save = function(){
		synchronizeTime(that._time.id,that._time.tn_id, that._time.start, that._time.end, false, that.saveCallback );
	};
	
	that.saveCallback = function(){
		saveCallback();
	};
	
	/**
	 * Handles changes in the edit field
	 * Callback for edit field onChange event
	 */
	that.handleEndTimeEdit = function(){
		
		//get vars
		var start = that._time.start;
		var end = $(that._endField).val();
		
		//calculate duration
		var d = moment.duration(end).subtract(moment.duration(start));
		
		//update model
		that._time.time = d.as('seconds');
		
		
		//update GUI
		$(that._timeField).html(moment.utc(d.as('milliseconds')).format("HH:mm:ss"));
	};
	
	that.getOkButton = function(){
		return that._okButton;
	}
		
	that.getStartField = function(){
		return that._startField;
	}
	
	that.getEndField = function(){
		return that._endField;
	}
	that.getTimeField = function(){
		return that._timeField;
	}
	
	
	that._init = function(){
		$(that._startField).html(moment(time.start).format("HH:mm:ss"));
		
		$(that._endField)
			.val(moment(time.end).format("HH:mm:ss"))
			.bind("change",that.handleEndTimeEdit);
		
		$(that._timeField).html(moment.utc(that._time.time*1000).format("HH:mm:ss"));
		
		$(that._okButton).click(that.save);
	};
	
	that._init();
};