// You can edit ALL of the code here
let allEpisodes = []; // global so we can filter easily

function setup() {
  allEpisodes = getAllEpisodes(); // get all episodes
  createSearchAndSelect();
  makePageForEpisodes(allEpisodes);
}

// SEARCH AND SELECT FUNCTIONS BEEN ADDED 
function createSearchAndSelect() {
  const rootElem = document.getElementById("root");

  // Search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search-input";
  searchInput.placeholder = "Search episodes...";
  searchInput.style.cssText = "width: 300px; padding: 8px; margin: 10px; font-size: 16px;";
  rootElem.prepend(searchInput);

  // Match count display
  const matchCount = document.createElement("p");
  matchCount.id = "match-count";
  matchCount.style.textAlign = "center";
  rootElem.prepend(matchCount);

  // Select dropdown
  const episodeSelect = document.createElement("select");
  episodeSelect.id = "episode-select";
  episodeSelect.style.cssText = "width: 300px; padding: 8px; margin: 10px;";
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Episodes";
  episodeSelect.appendChild(defaultOption);

  allEpisodes.forEach(ep => {
    const option = document.createElement("option");
    option.value = `${ep.season}-${ep.number}`;
    const seasonCode = ep.season.toString().padStart(2, "0");
    const episodeCode = ep.number.toString().padStart(2, "0");
    option.textContent = `S${seasonCode}E${episodeCode} - ${ep.name}`;
    episodeSelect.appendChild(option);
  });

  rootElem.prepend(episodeSelect);

  // Event: Search
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allEpisodes.filter(ep =>
      ep.name.toLowerCase().includes(term) ||
      ep.summary.toLowerCase().includes(term)
    );
    makePageForEpisodes(filtered);
    matchCount.textContent = `Displaying ${filtered.length} episode(s)`;
  });

  // Event: Dropdown
  episodeSelect.addEventListener("change", () => {
    const value = episodeSelect.value;
    if (value === "all") {
      makePageForEpisodes(allEpisodes);
      matchCount.textContent = `Displaying ${allEpisodes.length} episode(s)`;
      return;
    }

    const [season, number] = value.split("-");
    const selected = allEpisodes.filter(ep =>
      ep.season == season && ep.number == number
    );
    makePageForEpisodes(selected);
    matchCount.textContent = `Displaying ${selected.length} episode(s)`;
  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");

  // Remove old episode section if exists
  const oldSection = document.querySelector("section#episodes-section");
  if (oldSection) oldSection.remove();

  const section = document.createElement("section");
  section.id = "episodes-section";
  section.style.cssText = "display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; padding: 20px; background-color: #f3f3f3;";

  episodeList.forEach(ep => {
    const seasonCode = ep.season.toString().padStart(2, '0');
    const episodeCode = ep.number.toString().padStart(2, '0'); 
    const displayCode = `S${seasonCode}E${episodeCode}`;

    const article = document.createElement("article");
    article.className = "episode";
    article.id = `S${seasonCode}E${episodeCode}`;
    article.style.cssText = "background-color: #ffffff; border-radius: 1px; width: 300px; height: 450px; padding: 1px; box-shadow: 0 3px 6px rgba(0,0,0,0.1); max-width: 25%; margin: 1px;";

    //INNER HTML FOR EACH EPISODE BEEN MODIFIED TO INCLUDE THE EPISODE CODE IN THE TITLE === CHANGE
    article.innerHTML = `
  <h3>${ep.name} - ${displayCode}</h3>
  <img src="${ep.image ? ep.image.medium : ''}" alt="${ep.name}" />
  <div class="episode-summary">${ep.summary}</div>
`;
    section.appendChild(article);
  });

  rootElem.appendChild(section);

  // Footer
  let footer = document.querySelector("footer");
  if (!footer) {
    footer = document.createElement("footer");
    footer.innerHTML = `<p style="text-align:center; margin-top: 20px;">Data provided by <a href="https://www.tvmaze.com/" target="_blank">TVMaze.com</a></p>`;
    rootElem.appendChild(footer);
  }
}

window.onload = setup;
