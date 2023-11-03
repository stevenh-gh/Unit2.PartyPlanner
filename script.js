const cohort = "2308-ACC-PT-WEB-PT-B";
const url = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;

const parties = [];

const partyList = document.querySelector("#party-list");

getParty();

async function getParty() {
	parties.length = 0; //clear array
	let response = await fetch(url);
	let partyData = await response.json();
	parties.push(...partyData.data);
	render();
}

function render() {
	const partyRender = parties.map(party => {
		const partyContainer = document.createElement("div");
		partyContainer.innerHTML = `
			<h3>${party.name}</h3>
			<p>${party.description}</p>
			<p>${party.date}</p>
			<p>${party.location}</p>`;
		return partyContainer;
	});
	partyList.replaceChildren(...partyRender);
}