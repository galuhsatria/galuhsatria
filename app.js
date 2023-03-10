const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 56) {
    nav.classList.add("nav-on-scroll");
  } else {
    nav.classList.remove("nav-on-scroll");
  }
});

const API_URL = "https://api.github.com/users/";

const githubProfil = document.getElementById("github-profil");

async function getUser(username) {
  const { data } = await axios(API_URL + username);
  createUserCard(data);
  getRepos(username);
}

async function getRepos(username) {
  const { data } = await axios(API_URL + username + "/repos?sort=created");
  addReposToCard(data);
}

function createUserCard(user) {
  const idUser = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${idUser}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong> Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `;
  githubProfil.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

getUser("galuhsatria");

const getVideo = (iframe) => {
  const CHENNEL_ID = "UCvp1-YrLcRjKipkw3x_VVww";
  const CHENNEL_URL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHENNEL_ID}`);
  const REQUEST_URL = `https://api.rss2json.com/v1/api.json?rss_url=${CHENNEL_URL}`;

  fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const videoNumber = iframe.getAttribute("vnum");
      const link = result.items[videoNumber].link;
      const id = link.substr(link.indexOf("=") + 1);
      iframe.setAttribute("src", `https://youtube.com/embed/${id}?controls=0&autoplay=1`);
    })
    .catch((error) => console.log("error", error));
};

const iframes = document.getElementsByClassName("latestVideoEmbed");
for (let i = 0, len = iframes.length; i < len; i++) {
  getVideo(iframes[i]);
}
