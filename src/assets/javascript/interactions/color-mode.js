function colorMode() {
    let scheme = ``;
    const root = document.querySelector(`html`);
    const toggleBtn = document.querySelector(`[data-toggle-scheme]`);
    const themeImgs = document.querySelectorAll(`[data-theme-img]`);

    let getScheme = () => {
        return localStorage.getItem(`color-scheme`);
    }
    
    const darken = () => {
        root.setAttribute("color-scheme", "dark");
        toggleBtn.checked = true;
        scheme = `dark`;
        localStorage.removeItem("color-scheme", "light");
        localStorage.setItem("color-scheme", "dark");
    }

    const lighten = () => {
        root.setAttribute("color-scheme", "light");
        toggleBtn.checked = false;
        scheme = `light`;
        localStorage.removeItem("color-scheme", "dark");
        localStorage.setItem("color-scheme", "light"); 
    }

    // Get initial color preference
    const setScheme = () => {
        if(getScheme() === `dark`) {
            darken();
        } else if(getScheme() === `light`) {
            lighten();
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                darken();
            } else {
                lighten();
            }
        }
    }
    setScheme();

    // Check current color preference
    const toggleScheme = (scheme) => {
        scheme = root.getAttribute(`color-scheme`);

        if(scheme === `light`) {
            darken();
        } else {
            lighten();
        }
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setScheme();
    });

    toggleBtn.addEventListener("click", () => { toggleScheme(); });
}

colorMode();