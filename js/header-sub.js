export function init() {
    const sidebars = {
        "header-main": document.getElementById("wrapper-header-main"),
        "aside": document.getElementById("wrapper-aside")
    }

    async function closeSideBars() {
        sidebars["header-main"].classList.remove("active")
        sidebars["aside"].classList.remove("active")
        overlayClose("sidebar")
    }

    // Header Sub

    async function openSideBar(sidebar) {
        await closeSideBars()

        sidebars[sidebar].classList.add("active")
        overlayActive("sidebar")
    }

    window.openSideBar = openSideBar
    window.closeSideBars = closeSideBars
}