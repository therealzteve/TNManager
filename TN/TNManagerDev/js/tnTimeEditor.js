;
var timeEditorField = function(time, callback, labelClass) {
	var that = this;

	// --------------------------------------------------------------------
	// Init vars
	that._time = time;	
	console.log(time);
	that._container = $("<span></span>");
	that._labelField = $("<span></span>").addClass(labelClass).val(that._time.format("H:i:s"));
	that._inputField = $("<input type='text'>")
	.datetimepicker(
			{datepicker : false,
				format : 'H:i:s'}
	);
	that._editButton = $("<input type='button' value='ok'>").click(function(){
		that._editStartCB();
	});	
	that._errorLabel = $("<span>Ungültige Eingabe.</span>");
	
	// --------------------------------------------------------------------
	//Init
	
	$(that._container).append(that._labelField).append(that._editButton).append(that._errorLabel);
	$(that._errorLabel).hide();
	
	// --------------------------------------------------------------------
	//Public functions
	
	that.getValue = function(asString) {
		if (asString) {
			return that._time.format("HH:mm:ss");
		}
		return that._time;
	};

	that.setValue = function(time) {
		that._time = time;
		$(that._labelField).html(that.getValue(true));
	};
	
	that.getElement = function() {
		return that._container;
	};

	// --------------------------------------------------------------------
	// internal functions
	
	
	that._parseTime = function(){
		if ($(that._inputField).val().match(/.*:.*:.*/g)) {
			var parsedTime = $(that._inputField).val().split(":");

			var time = moment();
			time.hours(parsedTime[0]);
			time.minutes(parsedTime[1]);
			time.seconds(parsedTime[2]);
			
			that.setValue(time);
			return true;
		}
		return false;
	};
	

	that._editStartCB = function(){
		$(that._inputField).val(that.getValue(true));
		
		that._configGuiEdit();
		
	}
	
	that._editFinishCB = function(){
		if(that._parseTime()){

			that._handleParseCorrect();
			that._configGuiRead();
			console.log("test");
			callback();

		}else{
			that._handleParseError();
		}
		
	}
	
	that._handleParseError = function(){
		$(that._errorLabel).show();
		
	}
	
	that._handleParseCorrect = function(){
		$(that._errorLabel).hide();
	}
	
	that._configGuiEdit = function(){
		$(that._container).append(that._inputField);
		$(that._labelField).detach();	
		$(that._editButton).unbind('click').click(function(){that._editFinishCB()});

	}
	
	that._configGuiRead = function(){
		$(that._container).append(that._labelField);
		$(that._inputField).detach();
		$(that._editButton).unbind('click').click(function(){that._editStartCB()});
	}

};