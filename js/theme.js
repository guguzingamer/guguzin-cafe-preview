// Get theme

function getTheme() {
    return localStorage.getItem("theme");
}

// Apply theme

const syncOpt = document.querySelector("label[for='sync']")

function applyTheme(sysTheme) {
    const preference = getTheme();

    let theme = preference;

    if (preference === "sync") {
        if (sysTheme.matches) {
            theme = "dark";
        } else {
            theme = "light";
        }
    }

    document.documentElement.dataset.theme = theme;

    if (syncOpt) {
        syncOpt.classList.remove("sync-dark", "sync-light")
        syncOpt.classList.add("sync-" + (sysTheme.matches ? "dark" : "light"))
    }
}

// Checked radio

function checkForRadio() {
    const savedTheme = getTheme();
    const input = document.getElementById(savedTheme);

    if (input) {
        input.checked = true;
    }
}

export function init() {

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    systemTheme.addEventListener("change", () => {
        if (getTheme() === "sync") {
            applyTheme(systemTheme);
        }
    })

    window.addEventListener("themeChanged", (value) => {
        applyTheme(systemTheme)
    })

    applyTheme(systemTheme);
    checkForRadio();
}