// script.js version: 1.0-4

// ----- Config here! -----

var scriptsToLoad = [
	"theme.js",
	"components.js",
	"fetch-news.js",
	"header-sub.js",

	"fa.js",
	"diary-text.js",

	"current-nav.js",
	"reduce-motion.js",
	"sounds.js",
	
    "test.js"
];

const debugMode = false

// ----- Adds the custom elements to scriptsToLoad -----

const customScripts = document.querySelectorAll("custom-script") 

customScripts.forEach(el => {
    const source = el.getAttribute("src")
    let nSource = source
		.replace("js/", "")

    scriptsToLoad.splice(3, 0, nSource)
})

// ----- JS Loading bar -----

// yk, I didn't wanted this type of loading, but better than nothing

const loadingBar = document.createElement("progress")
loadingBar.max = scriptsToLoad.length
loadingBar.value = 0
loadingBar.classList.add("loading-bar")

document.body.append(loadingBar)

let loadedScripts = 0

// ----- Finish function & page loading -----

async function finishLoading() {
	loadingBar.classList.add("is-complete");
	document.documentElement.classList.remove("html-loading")
	console.log("All scripts loaded!")

	if (location.hostname === "127.0.0.1") {
		const links = document.querySelectorAll(".internal-html")

		links.forEach(async link => {
			const href = link.getAttribute("href")

			link.setAttribute("href", href + ".html")
		})
		console.log("Website is running on Local Server Friendly mode!")
	}
}

// ----- Loading scripts main logic -----

async function loadScript(path) {
	const archive = await import(path)
	
	if (typeof archive.init === "function") {
		await archive.init()
		
		if (debugMode) {
			console.log(path + " loaded!")
		}

		loadedScripts++
		// console.log(loadedScripts)
		
		loadingBar.value = loadedScripts
		if (loadedScripts == scriptsToLoad.length) {
			await finishLoading()
		}
	}
	else {
		console.warn(path+" does not have a init function!")
	}
}

async function loadAllScripts() {
	for (const src of scriptsToLoad) {
		await loadScript("./js/" + src)
	}
}

loadAllScripts()