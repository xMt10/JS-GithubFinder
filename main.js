import Github from "./github.js";
import UI from "./ui.js";
// UI ve Github classlarının bir örneğini oluşturma
const ui = new UI();
const github = new Github();

const searchUser = document.getElementById("search-user");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", getInput);
searchUser.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getInput();
  }
});

function getInput() {
  // Eğer inputun içi doluysa api isteği at
  if (searchUser.value) {
    github.getUser(searchUser.value).then((data) => {
      //Eğer gelen verideki message 'Not Found' ise
      if (data.profile.message === "Not Found") {
        //Hata Mesajı
        ui.showAlert("Aradığınız kullanıcı bulunamadı", "alert alert-danger");
      } else {
        //Kullanıcıyı Göster
        ui.showProfile(data.profile);
        //Projeleri göster
        ui.showRepos(data.repos);
      }
    });
  }
  //Boşsa uyarı ver
  else {
    ui.showAlert("Form alanı boş olamaz", "alert alert-info");
    ui.clearProfile();
  }
  searchUser.value = "";
}

//Theme
const themeBtn = document.getElementById("theme");

themeBtn.addEventListener("click", changeTheme);

function changeTheme() {
  const body = document.querySelector("body");
  body.classList.toggle("bg-dark");
  body.classList.toggle("text-bg-dark");
}
