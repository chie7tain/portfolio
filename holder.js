const personalAccessToken = "pTIIIqeoJgNZ6IRVkS1LWGR25xW1LdXUtHISqlR3QBc";
// this helps us to call the fetch data(info about sites from netlify)
const apiUrl = "https://api.netlify.com/api/v1/sites";
class Sites {
  async fetchSites() {
    try {
      let result = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `token ${personalAccessToken}`,
        },
        mode: "cors",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sites = new Sites();
  sites.fetchSites();
});
