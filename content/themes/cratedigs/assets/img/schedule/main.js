(function() {

	// Schedule Template - by CodyHouse.co
	function ScheduleTemplate( element ) {
		this.element = element;
		this.timelineItems = this.element.getElementsByClassName('cd-schedule__timeline')[0].getElementsByTagName('li');
		this.timelineStart = getScheduleTimestamp(this.timelineItems[0].textContent);
		this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems[1].textContent) - getScheduleTimestamp(this.timelineItems[0].textContent);
		
		this.topInfoElement = this.element.getElementsByClassName('cd-schedule__top-info')[0];
		this.singleEvents = this.element.getElementsByClassName('cd-schedule__event');
		
		this.modal = this.element.getElementsByClassName('cd-schedule-modal')[0];
		this.modalHeader = this.element.getElementsByClassName('cd-schedule-modal__header')[0];
		this.modalHeaderBg = this.element.getElementsByClassName('cd-schedule-modal__header-bg')[0];
		this.modalBody = this.element.getElementsByClassName('cd-schedule-modal__body')[0];
		this.modalBodyBg = this.element.getElementsByClassName('cd-schedule-modal__body-bg')[0];
		this.modalClose = this.modal.getElementsByClassName('cd-schedule-modal__close')[0];
		this.modalDate = this.modal.getElementsByClassName('cd-schedule-modal__date')[0];
		this.modalEventName = this.modal.getElementsByClassName('cd-schedule-modal__name')[0];
		this.coverLayer = this.element.getElementsByClassName('cd-schedule__cover-layer')[0];

		this.modalMaxWidth = 800;
		this.modalMaxHeight = 480;

		this.animating = false;
		// this.supportAnimation = Util.cssSupports('transition');

		this.initSchedule();


		
	};

	

	ScheduleTemplate.prototype.initSchedule = function() {
		this.scheduleReset();
		// this.initEvents();
	};

	ScheduleTemplate.prototype.scheduleReset = function() {
		// according to the mq value, init the style of the template

		var mq = this.mq(),
			loaded = Util.hasClass(this.element, 'js-schedule-loaded'),
			modalOpen = Util.hasClass(this.modal, 'cd-schedule-modal--open');
		if( mq == 'desktop' && !loaded ) {

			Util.addClass(this.element, 'js-schedule-loaded');
			this.placeEvents();
			modalOpen && this.checkEventModal(modalOpen);
		} else if (loaded) {
			// Add by Jay Hughes
			console.log('check 9');
			Util.removeClass(this.element, 'cd-schedule--loading js-schedule-loaded');
			this.placeEvents();
		} else if( mq == 'mobile' && loaded) {

			//in this case you are on a mobile version (first load or resize from desktop)
			Util.removeClass(this.element, 'cd-schedule--loading js-schedule-loaded');
			this.resetEventsStyle();
			modalOpen && this.checkEventModal();
		} else if( mq == 'desktop' && modalOpen ) {

			//on a mobile version with modal open - need to resize/move modal window
			this.checkEventModal(modalOpen);
			Util.removeClass(this.element, 'cd-schedule--loading');
		} else {
			Util.removeClass(this.element, 'cd-schedule--loading');
		}
	};

	ScheduleTemplate.prototype.resetEventsStyle = function() {
		// remove js style applied to the single events
		for(var i = 0; i < this.singleEvents.length; i++) {
			this.singleEvents[i].removeAttribute('style');
		}
	};

	ScheduleTemplate.prototype.placeEvents = function() {
		// on big devices - place events in the template according to their time/day
		var self = this,
			slotHeight = this.topInfoElement.offsetHeight;

		for(var i = 0; i < this.singleEvents.length; i++) {
			var anchor = this.singleEvents[i].getElementsByTagName('a')[0];
			var start = getScheduleTimestamp(anchor.getAttribute('data-start')),
				duration = getScheduleTimestamp(anchor.getAttribute('data-end')) - start;

			var eventTop = slotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				eventHeight = slotHeight*duration/self.timelineUnitDuration;

			this.singleEvents[i].setAttribute('style', 'top: '+(eventTop-6)+'px; height: '+(eventHeight -5)+'px');
		}

		Util.removeClass(this.element, 'cd-schedule--loading');
	};


	ScheduleTemplate.prototype.checkEventModal = function(modalOpen) {
		// this function is used on resize to reset events/modal style
		this.animating = true;
		var self = this;
		var mq = this.mq();
		if( mq == 'mobile' ) {
			//reset modal style on mobile
			self.modal.removeAttribute('style');
			self.modalBody.removeAttribute('style');
			self.modalHeader.removeAttribute('style');
			self.modalHeaderBg.removeAttribute('style');
			self.modalBodyBg.removeAttribute('style');
			Util.removeClass(self.modal, 'cd-schedule-modal--no-transition');
			self.animating = false;	
		} else if( mq == 'desktop' && modalOpen) {
			Util.addClass(self.modal, 'cd-schedule-modal--no-transition cd-schedule-modal--animation-completed');
			var item = self.element.getElementsByClassName('cd-schedule__event--selected')[0],
				target = item.getElementsByTagName('a')[0];

			var eventPosition = target.getBoundingClientRect(),
				eventTop = eventPosition.top,
				eventLeft = eventPosition.left,
				eventHeight = target.offsetHeight,
				eventWidth = target.offsetWidth;

			var windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);


			setTimeout(function(){
				self.modal.setAttribute('style', 'top:'+(windowHeight/2 - modalHeight/2)+'px;left:'+(windowWidth/2 - modalWidth/2)+'px;height:'+modalHeight+'px;width:'+modalWidth+'px;transform: translateY(0) translateX(0)');
				//change modal modalBodyBg height/width
				self.modalBodyBg.style.height = modalHeight+'px';self.modalBodyBg.style.transform = 'scaleY(1) scaleX('+BodyBgScaleX+')';self.modalBodyBg.style.width = '1px';
				//set modalHeader width
				self.modalHeader.setAttribute('style', 'width:'+eventWidth+'px');
				//set modalBody left margin
				self.modalBody.setAttribute('style', 'margin-left:'+eventWidth+'px');
				//change modal modalHeaderBg height/width and scale it
				self.modalHeaderBg.setAttribute('style', 'height: '+eventHeight+'px;width:'+eventWidth+'px; transform:scaleY('+HeaderBgScaleY+');');
			}, 10);

			setTimeout(function(){
				Util.removeClass(self.modal, 'cd-schedule-modal--no-transition');
				self.animating = false;	
			}, 20);

		}
	};

	ScheduleTemplate.prototype.loadEventContent = function(content) {
		// load the content of an event when user selects it
		var self = this;

		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
	      if (httpRequest.status === 200) {
	      	self.modal.getElementsByClassName('cd-schedule-modal__event-info')[0].innerHTML = self.getEventContent(httpRequest.responseText); 
	      	Util.addClass(self.modal, 'cd-schedule-modal--content-loaded');
	      }
	    }
		};
		httpRequest.open('GET', content+'.html');
    httpRequest.send();
	};

	ScheduleTemplate.prototype.getEventContent = function(string) {
		// reset the loaded event content so that it can be inserted in the modal
		var div = document.createElement('div');
		div.innerHTML = string.trim();
		return div.getElementsByClassName('cd-schedule-modal__event-info')[0].innerHTML;
	};

	ScheduleTemplate.prototype.animationFallback = function() {
		if( !this.supportAnimation ) { // fallback for browsers not supporting transitions
			var event = new CustomEvent('transitionend');
			self.modal.dispatchEvent(event);
			self.modalHeaderBg.dispatchEvent(event);
		}
	};

	ScheduleTemplate.prototype.mq = function(){
		//get MQ value ('desktop' or 'mobile') 
		var self = this;
		return window.getComputedStyle(this.element, '::before').getPropertyValue('content').replace(/'|"/g, "");
	};

	function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	};

	var scheduleTemplate = document.getElementsByClassName('js-cd-schedule'),	
		scheduleTemplateArray = [],
		resizing = false;
	
	if( scheduleTemplate.length > 0 ) { // init ScheduleTemplate objects
		for( var i = 0; i < scheduleTemplate.length; i++) {
			(function(i){
				scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
			})(i);
		}

		window.addEventListener('resize', function(event) { 
			// on resize - update events position and modal position (if open)
			if( !resizing ) {
				resizing = true;
				(!window.requestAnimationFrame) ? setTimeout(checkResize, 250) : window.requestAnimationFrame(checkResize);
			}
		});

		window.addEventListener('keyup', function(event){
			// close event modal when pressing escape key
			if( event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape' ) {
				for(var i = 0; i < scheduleTemplateArray.length; i++) {
					scheduleTemplateArray[i].closeModal();
				}
			}
		});

		window.onclick = function (e) {
			if (e.target.localName == 'a') {
				document.getElementsByTagName("html")[0].className += " js";
				checkResize();
			}
		}

		function checkResize(){
			
			for(var i = 0; i < scheduleTemplateArray.length; i++) {
				scheduleTemplateArray[i].scheduleReset();
			}
			resizing = false;
		};
	}


}());