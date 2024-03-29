let teamList = teams;
let oddsList = odds;
let teamsInPool = standings;
let draftPool = [];
let draftResults = [];
let drawCounter = 2;
window.onload = () => {
	displayRankings();
	populatePool();
}
function displayRankings(){
	let listContainer = document.getElementById("draftList");
	teamsInPool.forEach((item, index) => {
		listContainer.innerHTML += 
			"<div class='rItem'>"+
				"<h4 class='tItem tRank'>"+ (index+1) +"</h4>"+
				"<img class='icon tItem' src='./logos/"+item+".gif' />"+
				"<h4 class='tItem'>"+teamList.find(x => x.abreviation == item).name+"</h4>"+
				"<div class='odds tItem'> Odds: "+oddsList[index].odds+"%</div>"+
			"</div>"
	})
}
function populatePool(){
	teamsInPool.forEach((item, index) => {
		let entries = oddsList[index].odds*10;
		for(i = 0; i<entries; i++){
			draftPool.push(item);
		}
	});
	console.log('Pool size: '+draftPool.length);
	console.log(draftPool);
}
function startDraft(){
	document.getElementById('preDraft').classList.add('hide');
	document.getElementById('draftStart').classList.remove('hide');
	draft();
	drawBtn();
}

function draft(){
	for(i = 0; i<2; i++){
		let drawResult = Math.floor(Math.random()*draftPool.length);
		let winner = draftPool[drawResult];
		console.log('And the winner is '+winner.toUpperCase());
		draftPool = draftPool.filter(item => {
			return item !== winner;
		});
		teamsInPool = teamsInPool.filter(item => {
			return item !== winner;
		});
		let team = teamList.find(t => t.abreviation == winner)
		draftResults.push(team);
	}
	teamsInPool.forEach(item => {
		let team = teamList.find(t => t.abreviation == item)
		draftResults.push(team);
	});
}
function draw(){

	if(drawCounter > 0){
		let team = draftResults[drawCounter-1];
		document.getElementById(drawCounter).innerHTML = 
			"<img class='winningTeam' src='./logos/"+team.abreviation+".gif' />"
		drawCounter--;
		drawBtn();

	}else if(drawCounter == 0){
		drawBtn();
		endDraft();
	}
	
}
function endDraft(){
	let element = document.getElementById("finalRankingContainer");
	
	draftResults.forEach((item, index) => {
		element.innerHTML += 
			"<div class='finalItem'>"+(index+1)+". "+item.city+" "+item.name+"</div>"
	})
	element.innerHTML +=
		"<button class='btn' onclick='saveDraft()'>Enregistrer</button>"
	console.log(draftResults);
}
function saveDraft(){
	var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(printResults()));
  element.setAttribute('download', 'repechageSHL2021.txt');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
function printResults(){
	let results = "";
	draftResults.forEach((item, index) => {
		results += (index+1)+'. '+item.city+' '+item.name+'\r'; 
	});
	return results;
}
function drawBtn(){
	if(drawCounter > 0){
		document.getElementById('tirageBtn').innerHTML =
			'Effectuer le tirage ('+drawCounter+')'
	}else{
		document.getElementById('tirageBtn').innerHTML =
			'Voir la liste complète'
	}
	
}