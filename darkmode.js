let darkmode = localStorage.getItem("darkmode")

const switchTheme = document.getElementById('switch-theme')

const enabledDarkmode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkmode", 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkmode", null)
}

if(darkmode === "active") enabledDarkmode()

switchTheme.addEventListener('click', () =>{
    darkmode = localStorage.getItem("darkmode")
    darkmode !== "active" ? enabledDarkmode() : disableDarkmode()
})