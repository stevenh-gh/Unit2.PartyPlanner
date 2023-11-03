const cohort = "2308-ACC-PT-WEB-PT-B";
const url = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;

const parties = [];

const partyList = document.querySelector("#party-list");
const partyForm = document.querySelector("#party-form");
partyForm.addEventListener("submit", e => {
	e.preventDefault();
	const name = partyForm.name.value;
	const description = partyForm.description.value;
	const date = new Date(partyForm.date.value).toISOString();
	const location = partyForm.location.value;
	addParty(name, description, date, location);
});

getParty();

async function getParty() {
	parties.length = 0; //clear array
	let response = await fetch(url);
	let partyData = await response.json();
	parties.push(...partyData.data);
	render();
}

async function addParty(name, description, date, location) {
	await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: name,
			description: description,
			date: date,
			location: location
		})
	});
	getParty();
}

async function deleteParty(id) {
	await fetch(`${url}/${id}`, {
		method: "DELETE"
	});
	getParty();
}

function render() {
	const partyRender = parties.map(party => {
		const partyContainer = document.createElement("div");
		partyContainer.innerHTML = `
				<h3>${party.name}</h3>
				<p>${party.description}</p>
				<p>${party.date}</p>
				<p>${party.location}</p>
				<button onclick="deleteParty(${party.id})">Delete</button>
			`;
		return partyContainer;
	});
	partyList.replaceChildren(...partyRender);
}