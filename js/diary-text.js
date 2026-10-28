export async function init() {
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    const message = {
        sunday: "Checkpoint! The start of a new week!",
        monday: "\"I hate Mondays\" ~ a chill cat",
        tuesday: "What do you think? Comfy, right?",
        wednesday: "I cause chaos. I don't succumb to it.",
        thursday: "Did you know that you are cool?",
        friday: "Absolute Cinema day!",
        saturday: "Let's go gaming! Best day of the week.",

        "05/01": "One more year!",
        "05/02": "Don't let your flame be extinguished",
        "04/10": "Look at this lol: <a href='assets/wizardofgreed.png' class='link' target='_black' rel='noopener noreferrer'>wizardofgreed.png</a>",

        "01/01": "<i>NEW YEAR!</i>",

        "27/02": "The best 'jegue' community!",
        "30/06": "Technoblade Never Dies",
        "22/08": "That's a great theory for the game!",


        "08/03": "Respect them!",
        "21/03": "Seriously, <b>say no to racism.</b>",
        "01/05": "Working on stuff",
        "07/09": "Gold. Just gold.",
        // 11/09 is too heavy to put here. I'd love to put something to support, but there's a chance some people will think it is a disrespect since most of these aren't on that scale and most should be funny. But I still wanted to put it here, since we need to honor those we lost. <3
        "31/10": "Spooky!!!",
        "25/12": "Aww man I never saw snow :(",
    };

    let isSpecial = false

    async function getTodayDate() {
        const today = new Date()

        let dd = String(today.getDate())
        let mm = String(today.getMonth() + 1) // January is 0 what the

        if (dd.length == 1) {
            dd = 0+dd
        }
        if (mm.length == 1) {
            mm = 0+mm
        }

        const weekNum = String(today.getDay())

        const t_ddmm = dd+"/"+mm
        const t_week = days[weekNum]

        // console.log(t_ddmm, t_week)

        if (message[t_ddmm]) {
            isSpecial = true
            return message[t_ddmm]
        }
        else {
            return message[t_week]
        }
    }

    async function setTodaysText() {
        const todaysText = await getTodayDate()

        const text = document.querySelector("#diaryText")
        text.innerHTML = todaysText

        if (isSpecial) {
            const note = document.querySelector("#note")

            const small = document.createElement("small")
            small.textContent = "Special!"

            note.insertBefore(small, note.children[1])
        }
    }

    await setTodaysText();
}