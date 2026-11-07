export async function init() {
    // Pop Up
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

    // Gallery layout style

    async function getImagesLayout() {
        return localStorage.getItem("images-layout")
    }
    async function setGalleryClass() {
        const sec = document.querySelector("#gallery")

        if (!sec) {
            return
        }

        const result = await getImagesLayout()
        sec.classList.add(result)
    }
    await setGalleryClass()

    // Adjusts carousel with Javascript. Im gonna be honest with you, fellow code seeker:
    // While searching up, I was gonna use the CSS ::scroll-button and etc, but then I discovered that it isnt supported by neither Firefox and Safari. Absolutely hated instantly. Now I gotta write these *** js code

    // TODO:
    // adicionar funcionalidade aos markers
    // adicionar @media pro gallery-list

    let position = 0
    let markersEl
    let buttons
    let cards

    const carousel = document.querySelector("#gallery-list")

    function updateMarkers() {
        const currentMarker = document.querySelector(".current-marker")

        if (currentMarker) {
            currentMarker.classList.remove("current-marker")
        }

        markersEl.children[position].classList.add("current-marker")
    }

    function removeBlock() {
        for (const [k, v] of Object.entries(buttons)) {
            if (v.hasAttribute("disabled")) {
                v.removeAttribute("disabled")
            }
        }
    }

    function checkButtonState() {
        if (position == 0) {
            removeBlock()
            buttons.prevButton.setAttribute("disabled", true)
        }
        else if (position == cards.length - 1) {
            removeBlock()
            buttons.nextButton.setAttribute("disabled", true)
        }
        else {
            removeBlock()
        }
    }

    function carouselScrollTo(index) {
        position = Math.max(0, Math.min(index, cards.length - 1))

        const card = cards[position]

        carousel.scrollTo({left: card.offsetLeft, behavior: "smooth"})

        updateMarkers()
        checkButtonState()
    }

    function carouselScroll(direction) {
        let sign = 1

        if (direction === "prev") {
            sign = -1
        }

        carouselScrollTo(position + sign)
    }
    window.carouselScroll = carouselScroll

    async function createButtons() {
        buttons = {
            "prevButton": document.createElement("button"),
            "nextButton": document.createElement("button")
        }

        buttons.prevButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
        buttons.nextButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>'

        for (const [k, v] of Object.entries(buttons)) {
            const nString = k.replace("Button", "")

            v.classList.add("crs-button")
            v.setAttribute("id", "crs-button-" + nString)

            v.setAttribute("onclick", "carouselScroll('" + nString + "')")
        }

        return buttons
    }
    async function createMarkers() {
        cards = document.querySelectorAll(".card")

        const markerUl = document.createElement("ul")

        for (let index = 1; index < cards.length + 1; index++) {            
            const marker = document.createElement("button")
            const markerLi = document.createElement("li")
            markerLi.append(marker)
            markerUl.append(markerLi)

            marker.addEventListener("click", () => {
                carouselScrollTo(index - 1)
            })
        }

        markerUl.setAttribute("id", "markers")
        markersEl = markerUl

        updateMarkers()

        const markers = document.querySelectorAll("#markers li button")

        return markerUl
    }


    async function adjustCarousel() {
        const buttons = await createButtons()
        const markerUl = await createMarkers()

        const galleryDiv = document.querySelector("#gallery-div")
        const galleryView = document.querySelector("#gallery-viewport")

        galleryView.insertBefore(buttons.prevButton, galleryView.children[0])
        galleryView.append(buttons.nextButton)
        galleryDiv.append(markerUl)

        checkButtonState()
    }

    if (await getImagesLayout() === "carousel") {
        await adjustCarousel()
    }
}