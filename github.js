class Github {
  constructor() {
    this.client_id = "39532c9317a896cbc1b9";
    this.client_secret = "6798bd6d92eaa37e57e268c9e59bf2d28aa69535";
    this.repos_sort = "asc";
    this.repos_count = 10;
  }

  async getUser(user) {
    //gelen user ile beraber istek atma
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    //Kullanıcıların repolarını çekme
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    //Gelen cevapı jsona çevirme
    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    //İşlenmiş veriyi fonksiyonun çağrıldığı yere gönderme
    return {
      profile,
      repos,
    };
  }
}

export default Github;

/* hatayı yönetme
try {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}`
    );

    //Gelen cevapı jsona çevirme
    const profile = await profileResponse.json();

    return profile;
  } catch (err) {
    console.log(err);
  }
  */
