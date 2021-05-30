// ==UserScript==
// @name         RF_Jobs
// @namespace    none
// @version      2.0
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
		tableBody = document.getElementsByTagName('tbody')[0],
		tableLength = tableLength= tableBody.rows.length,

		date = new Date(),
		currentDate = [date.getUTCFullYear(),
					   date.getUTCMonth()+1,
 					   date.getUTCDate()],

		hourUTC = date.getUTCHours() + ':' + date.getUTCMinutes();

	for(var i=0;i<tableLength;i++){
		var rfFullDate = new Date(tableBody.rows[i].cells[4].innerText),
			rainforestDate = [rfFullDate.getUTCFullYear(),
							  rfFullDate.getUTCMonth()+1,
							  rfFullDate.getUTCDate()]
		if(currentDate.toString() == rainforestDate.toString()){
			paid += parseInt(tableBody.rows[i].cells[8].innerText.split('c')[0]);
			console.log(rainforestDate);
			jobCount+=1;
		}
    }

    GM_notification({
        title: "Date: " + currentDate.join('/'),
        text: "Paid: $" + paid/100 + "\nJob Count: " + jobCount + "\nUTC Time: " + hourUTC,
        image: "http://image.prntscr.com/image/2fc8f4257d86482681223bdcfb4170fd.png",
        timeout: 6000
    });
})();
