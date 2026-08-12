let marketsRow, betShadowRoot;
 
function checkClass(m, a) {
    if ([...marketsRow].every(el => el.classList.contains('dg_collapse--open'))) {
        showResults(betShadowRoot)
        observer.disconnect();
    }
}
 
let observer = new MutationObserver(checkClass)
 
function openAllMarkets(marketsRow) {
    for (let markets of marketsRow) {
        if (!(markets.classList.contains('dg_collapse--open'))) {
            markets.firstElementChild.click()
        }
    }
}
 
function showResults(SR) {
    let counterDisabledMarkets = 0;
    let markets = SR.querySelectorAll('.dg_lv_stake');
    
    let available = markets.length;
    let disabled = counterDisabledMarkets;
 
    const now = new Date();
    const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
 
    console.log(`[${hours}:${minutes}:${seconds}]: ${available} (${available - disabled}, ${disabled})`);
}
 
function getCountMarket() {
    betShadowRoot = document.querySelector('sport-latino-view').shadowRoot;
    marketsRow = betShadowRoot.querySelectorAll('.dg_collapse');
    
    if ([...marketsRow].every(el => el.classList.contains('dg_collapse--open'))) {
        showResults(betShadowRoot)
        observer.disconnect();
    } else {
        [...marketsRow].forEach(el => {
            observer.observe(el, {
                attributes: true,
                attributeFilter: ['class']
            })
        })
    }
    openAllMarkets(marketsRow)
}
 
getCountMarket()
 
// ПРОВЕРКА 
// console.log(document.querySelector('sport-latino-view').shadowRoot.querySelectorAll('.dg_lv_stake'));