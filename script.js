const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");
const repositoryCount = document.querySelector("#repository-count");

const formatStars = (stars) => new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1
}).format(stars);

const formatDate = (date) => new Intl.DateTimeFormat("en", {
  dateStyle: "medium"
}).format(new Date(`${date}T00:00:00`));

const createRepositoryCard = ({ repository, description, language, stars, starredAt, url }) => {
  const item = document.createElement("li");
  item.className = "repository-card";
  item.innerHTML = `
    <h3><a href="${url}" target="_blank" rel="noreferrer">${repository}</a></h3>
    <p class="description">${description}</p>
    <p class="metadata">
      <span>${language}</span>
      <span>${formatStars(stars)} stars</span>
      <span>Starred ${formatDate(starredAt)}</span>
    </p>
  `;
  return item;
};

const renderRepositories = (repositories) => {
  repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
  repositoryCount.textContent = `${repositories.length} repositories`;
  status.textContent = "";
};

const loadRepositories = async () => {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Unable to load repositories (${response.status})`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be an array");
    }

    renderRepositories(repositories);
  } catch (error) {
    status.textContent = "The starred repositories could not be loaded. Please try again later.";
    console.error(error);
  }
};

loadRepositories();
