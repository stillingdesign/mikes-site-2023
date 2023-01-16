const { DateTime } = require("luxon");

module.exports = (eleventyConfig) => {

    // Watch Targets
    eleventyConfig.addWatchTarget("src/assets/sass");
    eleventyConfig.addWatchTarget("src/assets/javascript");

    // Pass throughs
    eleventyConfig.addPassthroughCopy('src/manifest.webmanifest');
    eleventyConfig.addPassthroughCopy('src/_redirects');
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/images");

    // Date Formatting
    eleventyConfig.addFilter("dateShort", (dateObj) => { return DateTime.fromISO(dateObj).toLocaleString(DateTime.DATE_SHORT); });
    eleventyConfig.addFilter("dateFull",  (dateObj) => {  return DateTime.fromISO(dateObj).toLocaleString(DateTime.DATE_FULL); });

    // Limit # of Loop Results
    eleventyConfig.addFilter("limit", (arr, limit) => arr.slice(0, limit));

    // Range limit for loop results
    eleventyConfig.addFilter('rangeLimit', (arr, start, end) => arr.slice(start, end));

    // Remove current post from results
    eleventyConfig.addFilter('removeCurrent', function(collection, title) {
        const filtered = collection.filter(item => item.fields.title != title)
        return filtered;
    });

    // Output
    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }

};