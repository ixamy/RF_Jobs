// ==UserScript==
// @name         RF_Jobs
// @namespace    none
// @version      2.1
// @description  Data about RainfresotQa jobs
// @author       ixamy
// @match        https://portal.rainforestqa.com/jobs*
// @grant        GM_notification
// @updateURL    .
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
	var paid = 0,
		jobCount = 0,
		cellEight,
		cellSeven,
		tableBody = document.getElementsByTagName('tbody')[0],
		tableLength = tableLength= tableBody.rows.length,

		date = new Date(),
		currentDate = [date.getUTCFullYear(),
					   date.getUTCMonth()+1,
 					   date.getUTCDate()],

		hourUTC = date.getUTCHours() + ':' + date.getUTCMinutes();

	for(var i=0;i<tableLength;i++){
		var rfFullDate = new Date(tableBody.rows[i].cells[4].innerText),
			rainforestDate = [rfFullDate.getFullYear(),
							  rfFullDate.getMonth()+1,
							  rfFullDate.getDate()]
		if(currentDate.toString() == rainforestDate.toString()){
			cellEight = tableBody.rows[i].cells[8].innerText;
			cellSeven = tableBody.rows[i].cells[7].innerText

			if(cellEight!="—"){
				paid += parseInt(tableBody.rows[i].cells[8].innerText.split('c')[0]);
			} else {
				paid += parseInt(tableBody.rows[i].cells[7].innerText.split('c')[0]);
			} jobCount+=1;

			if(cellEight=="—" && cellSeven=="—"){
			   jobCount-=1;}
		}
    }

	function checkJobs(){
		if(jobCount==0){
			return "No jobs for the range loaded.";
		} else {
			return "Paid: $" + paid/100 + "\nJob Count: " + jobCount + "\nUTC Time: " + hourUTC;
		}
	}

    GM_notification({
        title: "Date: " + currentDate.join('/'),
        text: checkJobs(),
        image: "http://image.prntscr.com/image/2fc8f4257d86482681223bdcfb4170fd.png",
        timeout: 6000
    });
})();
