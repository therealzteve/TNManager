//Manages TN List
var tnManager = function(activeTns) {
	var that = this;
	that.currentRow;
	that.tnList = [];
	that.table = new TN_EditTable(that); //main GUI
	that.activeHandler = new TN_activeHandler(that,activeTns); //handles not finished TNs
	that.customerHandler = new TN_CustomerHandler(that); // Customer component
	that.summaryHandler = new TN_Summary(that)
	that.timer;
	that.timerRunning = false;

	// private
	var timerCounter = 0;

	
	/**
	 * 	Adds a new TN to the tn List
	 * 
	 */
	that.addNewTn = function(customer) {
		
		//First soft stop all tns (the ones who are not marked with stayActive)
//		for ( var i = 0; i < that.tnList.length; i++) {
////				that.tnList[i].stop(false);
//				
//		}
		that.table.stopRows(false); 
		
		//Create new TN
		var date = new Date();
		var serverTN = addAjaxTN(customer, date);
		var newTn;
		if(serverTN.text != undefined){
			newTn = new TN_Row(serverTN.id, customer, date,serverTN.text);
		}else{
			newTn = new TN_Row(serverTN.id, customer, date);
		}
		newTn.setSynchronized(true);
		
		//Add to TN list
		that.tnList.push(newTn);
		if (that.currentRow !== undefined) {
			that.currentRow++;
		} else {
			that.currentRow = 0;
		}
		
		
		//Start the timer if not running	
		if (!that.timerRunning) {
			that.timerRunning = true;
			that.start();
		}
		
		return newTn;
	};

	that.reloadCurrentTns = function() {
		// Analyze current table here
		that.tnList = that.table.analyzeHtmlTable();
		// Create for each row an entry in EditTable and in tnList
	};

	that.start = function() {
		that.timer = setInterval(handleTime, 1000);
	};

	
	var handleTime = function() {
		var currentTime = new Date();

//		that.tnList[that.currentRow].setEndTime(currentTime);
//		that.tnList[that.currentRow].setTime(DateDiff(
//				that.tnList[that.currentRow].getEndTime(),
//				that.tnList[that.currentRow].getStartTime()));
//
//		that.table.synchronizeTableRow(that.tnList[that.currentRow]);
		for ( var i = 0; i < that.tnList.length; i++) {

			that.tnList[i].refreshTime();
			if (timerCounter == 10) {
				that.tnList[i].synchronize();
			}
		}

		if (timerCounter == 10) {
			timerCounter = 0;
		} else {
			timerCounter++;
		}
		
		that.table.refresh();
	};
	
	
	//**** PRIVATE FUNCTIONS *****


};


// END TableManager

//******************************************************************************

var TN_Row = function(tnId, customer, date,text) {
	var that = this; // handle for timer;

	that._tnId = tnId;
	that._customer = customer;
	that._date = date;
	that._times = [];
	that._currentTime;
	that._text = "";
	
	if(text != undefined){
		that._text = text;
	}
	
	
	//Interface stuff
	that._stayActive = false;

	that._isSynchronized;
	
	
	that.setTnId = function(tnId) {
		that._tnId = tnId;
		that._isSynchronized = false;
	};

	that.setCustId = function(custId) {
		that._custId = custId;
		that._isSynchronized = false;

	};

	that.setDate = function(date) {
		that._date = date;
		that._isSynchronized = false;
	};
	
	that.setStayActive = function(active){
		that._stayActive = active;
	}

	that.isStayActive = function(){
		return that._stayActive;
	}


	that.setTimes = function(times) {
		that._times = times;
		that._isSynchronized = false;

	};

	that.addTime = function(newTime) {
		that_times.push(newTime);
	};

	/**
	 *  Stops the time counter of the TN
	 *  if force = false it only stops when stayActive is false
	 */
	that.stop = function(force){
		if(force || !that._stayActive){
			if(that._currentTime != null){
				that._currentTime.setActive(false);
				that._currentTime = null;
			}
		}
	};
	
	
	that.addNewTime = function() {
		var startDate = moment();
		var time = addAjaxTime(that._tnId, startDate);
		var newTime = new TN_time(time.id, that._tnId, startDate);
		newTime.setActive(true);
		that._times.push(newTime);

		that._currentTime = newTime;

		return newTime;
	};
	
	that.deleteTn = function(callback){
		that._times = [];
		deleteTn(that.getTnId(), callback)
	}

	that.setText = function(text) {
		that._text = text;
		that._isSynchronized = false;

	};
	that.setSynchronized = function(isSynchronized) {
		that._isSynchronized = isSynchronized;
	};

	that.getTnId = function() {
		return that._tnId;
	};
	that.getCustomer = function() {
		return that._customer;
	};
	that.getDate = function() {
		return that._date;
	};
	
	that.getTimes = function() {
		return that._times;
	};
	that.getText = function() {
		return that._text;
	}
	that.getSynchronized = function() {
		return that._isSynchronized;
	};

	that.refreshTime = function() {
		if (that._currentTime !== undefined && that._currentTime !== null) {
			that._currentTime.refreshTime();
		}
	};

	that.synchronize = function() {
		if (!that._isSynchronized) {
			synchronizeTN(that._tnId, that._date, that._text,
					that._synchronizeCallBack);
		}
		for(var i = 0; i< that._times.length;i++){
			that._times[i].synchronize();
		}
	};

	that._synchronizeCallBack = function() {
		that._isSynchronized = true;
	};

};


//******************************************************************************


var TN_time = function(id, tn_id,start) {
	var that = this;
	that._id = id;
	that._tnId = tn_id;
	that._start =  start;
	that._end = start;
	that._active;
	
	that._isSynchronized;

	that.synchronize = function() {
		if (!that._isSynchronized) {
			console.log(that._active);
			synchronizeTime(that._id,that._tnId, that._start, that._end,that._active,
					that._synchronizeCallBack);
		}
	};

	that._synchronizeCallBack = function() {
		that._isSynchronized = true;
	};

	that.refreshTime = function() {
		var currentTime = moment();
		that.setEnd(currentTime);
		// that.tnList[that.currentRow].setTime(DateDiff(that.tnList[that.currentRow].getEndTime(),that.tnList[that.currentRow].getStartTime()));

	};
	
	that.getId = function(){
		return that._id;
	}

	that.getStart = function(){
		return that._start;
	};
	
	that.getEnd = function(){
		return that._end;
	};
	
	

	that.setStart = function(start) {
		that._start = start;
		that._isSynchronized = false;
	}
	
	
	/**
	 * Params: MomentJS Time object
	 * 
	 */
	that.setStartTime = function(time){
		
		var time = moment(time);
		that._start = time;
//		that._start
//			.seconds(time.seconds())
//			.minutes(time.minutes())
//			.hours(time.hours());
		console.log(that._start);
		that._isSynchronized = false;
	};

	that.setEnd = function(end) {
		that._end = end;
		that._isSynchronized = false;
	}
	
	/**
	 * Params: MomentJS Time object
	 * 
	 */
	that.setEndTime = function(time){
		var time = moment(time);
		that._start
			.seconds(time.seconds())
			.minutes(time.minutes())
			.hours(time.hours());
		that._isSynchronized = false;
	};
	
	that.getActive = function(){
		return that._active;
	}
	
	that.setActive = function(active){
		that._active = active;
	}
	
	that.getTimeDifference = function(){
		
	}

	that.getStartFormatted = function() {
		return that._start.format("HH:mm:ss");
	};

	that.getEndFormatted = function() {
		return that._end.format("HH:mm:ss");
	};

};



