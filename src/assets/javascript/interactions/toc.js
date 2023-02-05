
if(document.querySelector(`[data-toc]`)) {
    const tocScroller = document.querySelector(`[data-toc-contents]`);
    const tocLinked = document.querySelectorAll(`[data-toc-linked]`)
    const tocLinks = document.querySelectorAll(`[data-toc-link]`);

    let tocOptions = {
        root: null,
        rootMargin: "0% 0% -50% 0%",
        threshold: [0.05],
    }

    const tocObserve = new IntersectionObserver(tocSetCurrent, tocOptions);

    function tocWatchLinks() {
        tocLinked.forEach(linked => {
            tocObserve.observe(linked);
        })
    }

    function tocSetCurrent(e) {
        e.map(i => {
            if(i.isIntersecting === true) {
                tocLinks.forEach(link => link.classList.remove(`color:link-rg`));
                document.querySelector(`a[href="#${i.target.id}"]`).classList.add(`color:link-rg`) ;
            }
        })
    }

    (function tocSetUp() {
        if (tocScroller === null) {
            return;
        }
        tocWatchLinks();
    })();
};