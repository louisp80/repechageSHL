let teamList = teams;
let teamsInPool = [];
let draftPool = [];
let draftResults = [];
let drawCounter = 0;
window.onload = () => {
	teamList.forEach(item => {
		teamsInPool.push(item.abreviation);
	});
	displayRankings();
	populatePool();
}
function displayRankings(){
	let listContainer = document.getElementById("draftList");
	teamList.forEach((item, index) => {
		listContainer.innerHTML += 
			"<div class='rItem'>"+
				"<h4 class='tItem tRank'>"+ (index+1) +"</h4>"+
				"<img class='icon tItem' src='./logos/"+item.abreviation+".gif' />"+
				"<h4 class='tItem'>"+item.name+"</h4>"+
				"<div class='odds tItem'> Odds: "+item.odds+"%</div>"+
			"</div>"
	})
}
function populatePool(){
	teamList.forEach((item, index) => {
		let entries = item.odds*2;
		for(i = 0; i<entries; i++){
			draftPool.push(item.abreviation);
		}
	});
	console.log('Pool size: '+draftPool.length);
	console.log(draftPool);
}
function startDraft(){
	document.getElementById('preDraft').classList.add('hide');
	document.getElementById('draftStart').classList.remove('hide');
	drawBtn();
}
function draw(){
	drawCounter++;
	if(drawCounter <= 3){
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

		document.getElementById(drawCounter).innerHTML = 
			"<img class='winningTeam' src='./logos/"+winner+".gif' />"

		drawBtn();

	}else if(drawCounter == 4){
		drawBtn();
		endDraft();
	}
}
function endDraft(){
	let element = document.getElementById("finalRankingContainer");
	teamsInPool.forEach(item => {
		let team = teamList.find(t => t.abreviation == item)
		draftResults.push(team);
	});
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
  element.setAttribute('download', 'repechageSHL2019.txt');

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
	if(drawCounter < 3){
		document.getElementById('tirageBtn').innerHTML =
			'Effectuer le tirage ('+(3-drawCounter)+')'
	}else{
		document.getElementById('tirageBtn').innerHTML =
			'Voir la liste complète'
	}
	
}