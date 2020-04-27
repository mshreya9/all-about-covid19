document.getElementById("preloader").style.display = "block";

fetch('https://api.covid19india.org/data.json')
.then(res => {
	console.log(res)
	return res.json();
})
.then(data => {
	document.getElementById('count-confirmed').innerHTML = 	data.statewise[0].confirmed
	document.getElementById('count-recovered').innerHTML = data.statewise[0].recovered
	document.getElementById('count-deceased').innerHTML = data.statewise[0].deaths
	document.getElementById('count-active').innerHTML =	data.statewise[0].active
	document.getElementById('inc-confirmed').innerHTML = data.statewise[0].deltaconfirmed
	document.getElementById('inc-recovered').innerHTML = data.statewise[0].deltarecovered
	document.getElementById('inc-deceased').innerHTML = data.statewise[0].deltadeaths
	let statesArray = data.statewise;
	let content = "";
	for(let i = 1; i < statesArray.length; i = i + 1){
		let noOfActive = statesArray[i].active;
		let deltaconfirmed = "";
		let deltadeaths = "";
		let deltarecovered = "";
		let deltacolorConfirmed = "";
		let deltacolorRecovered = "";
		let deltacolorDeaths = "";
		if(noOfActive < 100){
			color = 'color : #28a745'
		} else if (noOfActive < 1000){
			color = 'color : #F0CA33'
		} else {
			color = 'color : #FF073A'
		}
		if(statesArray[i].deltaconfirmed !== "0"){
			deltaconfirmed = `&#8593;${statesArray[i].deltaconfirmed}`
			deltacolorConfirmed = 'color : #FF073A'
		}
		if(statesArray[i].deltarecovered !== "0"){
			deltarecovered = `&#8593;${statesArray[i].deltarecovered}`
			deltacolorRecovered = 'color : #28a745'
		}
		if(statesArray[i].deltadeaths !== "0"){
			deltadeaths = `&#8593;${statesArray[i].deltadeaths}`
			deltacolorDeaths = 'color : #6c757d'
		}
		content = content + `<tr>
																<th style='${color}'>${statesArray[i].state}</th>
																<td>${statesArray[i].confirmed}<sup style='${deltacolorConfirmed}'>${deltaconfirmed}</sup></td>
																<td>${statesArray[i].active}</td>
																<td>${statesArray[i].recovered}<sup style='${deltacolorRecovered}'>${deltarecovered}</sup></td>
																<td>${statesArray[i].deaths}<sup style='${deltacolorDeaths}'>${deltadeaths}</sup></td>
															</tr>`
	}
	document.getElementById('table-data').innerHTML = content;


})

window.onload = () => {
		document.getElementById("preloader").style.display = "none";
		window.addEventListener('resize', () => {
			if(window.outerWidth < 990){
				document.getElementById('c').innerHTML = 'Conf';
				document.getElementById('a').innerHTML = 'Act';
				document.getElementById('r').innerHTML = 'Rec';
				document.getElementById('d').innerHTML = 'Dead';
				document.getElementById('tc').innerHTML = 'C';
				document.getElementById('ta').innerHTML = 'A';
				document.getElementById('tr').innerHTML = 'R';
				document.getElementById('td').innerHTML = 'D';
			} else {
				document.getElementById('c').innerHTML = 'Confirmed';
				document.getElementById('a').innerHTML = 'Active';
				document.getElementById('r').innerHTML = 'Recovered';
				document.getElementById('d').innerHTML = 'Deceased';
				document.getElementById('tc').innerHTML = 'Confiremed';
				document.getElementById('ta').innerHTML = 'Active';
				document.getElementById('tr').innerHTML = 'Recovered';
				document.getElementById('td').innerHTML = 'Deceased';
			}
		})
}