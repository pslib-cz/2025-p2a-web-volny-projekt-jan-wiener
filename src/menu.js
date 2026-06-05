function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (!menu) return;
    menu.classList.toggle('is-open');
}

window.toggleMobileMenu = toggleMobileMenu;


