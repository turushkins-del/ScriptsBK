// ‼ НЕ ЗАБЫВАЙТЕ переходить во вкладку All 

// CONFIG
const delayTimer = 300
const statisticWords = ['corner', 'yellow', 'foul', 'shot', 'goalscorers', 'player', 'card', 'goal scorer', 'promoted build a bet', 'booked', 'multi scorers']


let allGroups = document.querySelectorAll('div[class=""] > div > div[data-market-group-id]')

allGroups.forEach(el => {
    let groupName = el.querySelector('div[class^="spr"] > div[class^="spr"] > div[class^="spr"] > div[class^="spr"]').textContent

    if (statisticWords.some(word => groupName.toUpperCase().includes(word.toUpperCase()))) {
        console.log('УДАЛЕНО: ', groupName)
        el.remove()
    }
})

for(group of allGroups) {
    let divtab = group.querySelector('div[role="tablist"]')

    if (!(divtab == null)) {
        for (ch of divtab.children) {
            if (ch.textContent.trim() == 'All') {
                ch.children[0].click()
                await new Promise(r => setTimeout(r, delayTimer))
                break
            }
        }
    }
}

let allMarkets = []

allGroups.forEach(el => {
    let fMarkets = el.querySelectorAll('div[class*="pwidth100"]')
    if (fMarkets.length != 0) allMarkets.push(...fMarkets[0].children)
})

let pMarkets = []

allGroups.forEach(el => {
    let sMarkets = el.querySelectorAll('div[class*="pwidth"]:not(div[class*="pwidth100"])')
    if (sMarkets.length != 0) {
        pMarkets.push(...sMarkets)
    }
})

let pMarketsDivsTwo = []

for (let pMarket of pMarkets) {
    let pMarketDivs = pMarket.querySelectorAll('div[class*="rgl"]')
    let pMarketDivTwo = Array.from(pMarketDivs).filter(div => div.classList.length === 2);
    pMarketsDivsTwo.push(...pMarketDivTwo)
}

console.log(allMarkets)
console.log(allMarkets.length)
