// ==UserScript==
// @name         RF_Jobs
// @namespace    none
// @version      1.0
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
		tableBody = document.getElementsByTagName('tbody')[0],
		date = new Date(),
		currentDateUTC = date.getUTCDate(),
		rfDateUTC = new Date(tableBody.rows[0].cells[4].innerText).getDate();

	//print every paid amount
	for(var i=0;i<25;i++){
        rfDateUTC = new Date(tableBody.rows[i].cells[4].innerText).getDate();
		if(rfDateUTC == currentDateUTC){
			paid += parseInt(tableBody.rows[i].cells[8].innerText.split('c')[0]);
		}
    }

    GM_notification({
        title: "Date: " + currentDateUTC,
        text: "Paid: " + paid/100,
        image: "http://image.prntscr.com/image/2fc8f4257d86482681223bdcfb4170fd.png",
        timeout: 5000
    });
})();