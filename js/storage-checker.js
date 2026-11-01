export function init() {
    const keys = {
        "theme": "sync",
        "reduce-motion": "false",
        "sound": "true",
        "images-layout": "carousel"
    }

    for (const [k, v] of Object.entries(keys)) {
        const inLocal = localStorage.getItem(k)
        
        if (inLocal === null) {
            localStorage.setItem(k, v)
        }
    }
}