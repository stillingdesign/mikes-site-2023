module.exports = {
    url: process.env.URL || "http://localhost:8080",
    name: "Mike Stilling",

    twitterHandle: "@mikestilling",
    twitterLink: "https://twitter.com/mikestilling",
    githubLink: "https://github.com/stillingdesign",
    linkedinLink: "https://www.linkedin.com/in/mikestilling/",

    // Current year
    currentYear() {
        const today = new Date();
        return today.getFullYear();
    }
};