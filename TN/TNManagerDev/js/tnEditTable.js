	var TN_EditTable = function(tnManager){
		var that = this;
		that._htmlTable = $("#TNs");
		//that._addButton = $("#new_cust_tn");	
		that._tnManager = tnManager;
		that._currentTr;
		that._rowCount = 0;
		that.tableRows = [];

		
		/*that._addButton.click(function(){
			that.stopRows(true);
			var customer = new TN_customer();
			var custField = $("#newRowCustomer option:selected");
			customer.setName(custField.text());
			customer.setId(custField.val());
			var tn = that._tnManager.addNewTn(customer);
			that.addRow(tn);
		});*/
		
		that.addRow = function(tn){
			if(that._currentTr !== undefined){
				$(that._currentTr.getHtmlTime()).prop("disabled",false);
			}
			var newRow = new TN_TableRow(tn,that._rowCount,that);
			that.tableRows.push(newRow);
			that._htmlTable.append(newRow.createHtml());
			that._currentTr = newRow;
			$(that._currentTr.getHtmlTime()).prop("disabled",true);
			that._rowCount++;
		};
		
		


		that.stopRows = function(force) {
			for ( var i = 0; i < that.tableRows.length; i++) {
				that.tableRows[i].stop(force);
			}
		};

		that.analyzeHtmlTable = function(){
			var tnList = [];
			//Do stuff
			return tnList;
		};

		that.synchronizeTableRow = function(tn){
			that._getTableRowWithTn(tn).synchronizeHtml();
		};
		
		that.refresh = function(){
			for(var i = 0; i <  that.tableRows.length; i++){
				that.tableRows[i].synchronizeHtml();
			}
		};

		that._getTableRowWithTn = function(tn){
			for(var i = 0; i <  that.tableRows.length; i++){
				if(that.tableRows[i].getTn() === tn){
						return that.tableRows[i];
				}
			}
		};
		
		
		
	};

	
	var TN_TableRow = function(tn,tableRowId,tnManager){
		var that = this;
		
		that._tnManager = tnManager;
		that._tn = tn;
		that._tn_timeRows = [];
		
		
		that._idSuffix = tableRowId;
		that._isActive = true;
		
		that._htmlTnDesc = $("<textarea class='tatTextField' id='tat_"+that._idSuffix+"'>"+that._tn.getText()+"</textarea>").change(function(){
			that._tn.setText($(this).val());
		});
		that._htmlTime = $("<ul class='time_ul' id='time_"+that._idSuffix+"' ></ul>");
		
		that._htmlCalcTime = $("<span id='calcTime_"+that._idSuffix+"'></span>");

		that._button = $("<input type='button' value='stop' ></input>");
		
		$(that._button).click(function(){
			if(that._isActive){
				console.log("click stop");
				that.stop(true); 
			}else{
				console.log("click start");
				that.start();

			}
		});
		

		
		that.stop = function(force){
			console.log("funcStop");
			that._tn.stop(force);
			that._isActive = false;
			that._tn.synchronize();
			$(that._button ).val("start");
		}
		
		that.start = function(){
			console.log("funcStart");
			that._tnManager.stopRows(true);
			that.addNewTimeRow();
			that._isActive = true;
			$(that._button ).val("stop");
		}
	
		that.getTn = function(){
			return that._tn;
		};

		that.setTn = function(tn){
			that._tn  = tn;
		};	
		
		that.addTimeRow = function(tn_TimeRow){
			that._tn_timeRows.push(tn_TimeRow);
			that._htmlTime.append(tn_TimeRow.createHtml());
		}
		
		that.addNewTimeRow = function(){
			
			var tn_timeRow = new TN_timeRow(that._tn.addNewTime(),tableRowId,0);
			that._tn_timeRows.push(tn_timeRow);
			that._htmlTime.append(tn_timeRow.createHtml());
		}
		

		that.getHtmlTime = function(){
				return that._htmlTime;
		};
				

		that.createHtml = function(){
			var tr = $("<tr></tr>");
			tr.append(createTd(that._tn.getTnId()));
			tr.append(createTd(that._button));
			tr.append(createTd(that._tn.getCustomer().getName()));
			tr.append(createTd(that._htmlTnDesc));
			tr.append(createTd(that._htmlTime));
			tr.append(createTd(that._htmlCalcTime));
			console.log("htmlcreated!");
			return tr;
		};	

		that.synchronizeHtml = function(){
			that._htmlTnDesc.not(":focus").val(that._tn.getText());
			
			var timeAmount = 0 ;	
			for(var i = 0; i <  that._tn_timeRows.length; i++){
				that._tn_timeRows[i].synchronizeHtml();
				timeAmount = timeAmount + dateDiff(that._tn_timeRows[i].getTime().getEnd(),that._tn_timeRows[i].getTime().getStart());
			}
			
			that._htmlCalcTime.html(timeAmount);
			
		};
		
		that.addNewTimeRow(); 
		
	};
	
	var TN_timeRow = function(time, tnRowId, timeRowId){
		var that = this;
		
		that._time = time;
		that._tnRowId = tnRowId;
		that._timeRowId = timeRowId;
		
		that._idSuffix = tnRowId + "_" + timeRowId;
		
		that._htmlStart = new timeEditorField(time.getStart(),function(){that._changeStartTime()}, "time_span");
		that._htmlEnd =    $("<span class='time_span' id='endtime_"+that._idSuffix+"' >"+that._time.getEndFormatted()+"</span>");
		
		
		that.createHtml = function(){
			var li = $("<li class='time_li' ></li>");
			li.append($("<span class='time_id'>"+that._time.getId()+"</span>"));
			li.append(that._htmlStart.getElement());
			li.append(that._htmlEnd);		
			return li;
		};	

		that.synchronizeHtml = function(){
				that._htmlStart.setValue(that._time.getStart());
				that._htmlEnd.html(that._time.getEndFormatted());		
		};
		
		
		
		that._changeStartTime = function(){		
			that._time.setStartTime(that._htmlStart.getValue());
		}
		
	
		
		that.getTime = function(){
			return that._time;
		}
		
		
	}