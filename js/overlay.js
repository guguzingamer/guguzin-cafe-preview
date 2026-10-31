export function init() {
    const overlay = document.querySelector("#overlay")

    // Overlay Source Control, can have both 'sidebar' and 'pop-up'
    const OSC = new Set()

    function overlayClose(source) {
        OSC.delete(source)
        overlay.classList.remove(source)
        
        if (OSC.size == 0) {
            overlay.classList.remove("active")
        }
    }
    function overlayActive(source) {
        OSC.add(source)
        overlay.classList.add("active", source)
    }

    function overlayClick() {
        const classesAtt = overlay.getAttribute("class")

        if (classesAtt.includes("pop-up")) {
            closePopUp()
        }
        else if (classesAtt.includes("sidebar")) {
            closeSideBars()
        }
    }

    window.overlayClose = overlayClose
    window.overlayActive = overlayActive
    window.overlayClick = overlayClick
}