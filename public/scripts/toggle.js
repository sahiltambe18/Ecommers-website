// const mobilebtnElement = document.getElementById("mobile-menu-btn");
// const mobileMenuElement = document.getElementById("mobile-menu");

// function togglebtn() {
//     mobileMenuElement.style.display = 'flex';
// }

// mobilebtnElement.addEventListener("click",togglebtn);

const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);