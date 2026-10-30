
export function init() {
    const popUp = document.querySelector("#popUp")

    function openPopUp() {
        popUp.classList.add("active")
    }
    function closePopUp() {
        popUp.classList.remove("active")
    }

    window.openPopUp = openPopUp
    window.closePopUp = closePopUp
}