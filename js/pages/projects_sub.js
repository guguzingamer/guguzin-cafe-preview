
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
}