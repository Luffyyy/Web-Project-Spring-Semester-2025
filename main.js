// Capitalizes words like hello -> Hello
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  // Toggle theme (dark/light)
  document.addEventListener("DOMContentLoaded", function () {
    const btnTheme = document.getElementById("btnTheme");
    if (btnTheme) {
      btnTheme.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
        btnTheme.innerText = document.documentElement.classList.contains("dark") ? "🌙" : "☀️";
      });
    }
  });
  
  // Handle login/logout display
  document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login");
    const registerBtn = document.getElementById("register");
    const userInfo = document.getElementById("userInfo");
    const userPicture = document.getElementById("userPicture");
    const logoutButton = document.getElementById("logoutButton");
  
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (loggedInUser && loginBtn && registerBtn && userInfo && userPicture) {
      loginBtn.style.display = "none";
      registerBtn.style.display = "none";
      userInfo.style.display = "flex";
      userPicture.src = loggedInUser.picture || "assets/default-avatar.png";
    } else if (loginBtn && registerBtn && userInfo) {
      loginBtn.style.display = "flex";
      registerBtn.style.display = "flex";
      userInfo.style.display = "none";
    }
  
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        if (loginBtn && registerBtn && userInfo) {
          loginBtn.style.display = "flex";
          registerBtn.style.display = "flex";
          userInfo.style.display = "none";
        }
      });
    }
  });
  
  // Handle mobile menu dropdown
  document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btnMenu");
    const mobileMenu = document.getElementById("mobileMenu");
  
    if (btnMenu && mobileMenu) {
      btnMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  });
  