
export function init() {
    const popUp = document.querySelector("#popUp")

    function openPopUp() {
        popUp.classList.add("active")
        overlayActive("pop-up")
    }
    function closePopUp() {
        popUp.classList.remove("active")
        overlayClose("pop-up")
    }

    window.openPopUp = openPopUp
    window.closePopUp = closePopUp

    const ol = document.querySelector("#nav-ol")

    const links = ol.querySelectorAll("li a")
    const arch = window.location.pathname.split('/').pop();
    
    links.forEach(link => {
        const href = link.getAttribute("href")
        link.setAttribute("href", "pages/projects/" + arch + href)
    })
}