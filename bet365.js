// ‼ НЕ ЗАБЫВАЙТЕ переходить во вкладку All 

// CONFIG
const delayTimer = 300
const statisticWords = ['corner', 'yellow', 'foul', 'shot', 'goalscorers', 'player', 'card', 'goal scorer', 'promoted build a bet', 'booked', 'multi scorers']


function getSuspendedMarkets(marketsGroup) {
    let suspendedMarkets = 0
    for (market of marketsGroup) {
        let isMarketGroupSuspended = market.closest('div[data-market-group-id]').querySelector('div[class^="spr"] > div[class^="spr"] > div[class^="spr"]').querySelector('span[class^="spr"]').textContent == 'Market Suspended'
        let isMarketSuspended = market.querySelector('span').textContent == ''
        if (isMarketGroupSuspended || isMarketSuspended) {
            suspendedMarkets++
            continue
        }
    }
    return suspendedMarkets
}

let allGroups = document.querySelectorAll('div[class=""] > div > div[data-market-group-id]')

allGroups.forEach(el => {
    let groupName = el.querySelector('div[class^="spr"] > div[class^="spr"] > div[class^="spr"] > div[class^="spr"]').textContent
    if (statisticWords.some(word => groupName.toUpperCase().includes(word.toUpperCase()))) {
        console.log('УДАЛЕНО: ', groupName)
        el.remove()
    }
})


let groupsWithTabs = new Set()

for(group of allGroups) {
    let divtab = group.querySelector('div[role="tablist"]')

    if (!(divtab == null)) {
        for (ch of divtab.children) {
            ch_name = ch.textContent.trim()
            if (ch_name == 'All') {
                ch.children[0].click()
                await new Promise(r => setTimeout(r, delayTimer))
                break
            } else if (ch_name != 'Table') {
                groupsWithTabs.add(group)
            }
        }
    }
}

let allMarkets = []

let visibleMarkets = document.querySelectorAll('div[class*="rgl"]:has(> span[class*="rgl"]), div[class*="sct"]:has(> span[class*="sct"])')
let suspendedMarkets = getSuspendedMarkets(visibleMarkets)

allMarkets.push(...visibleMarkets)

for (group of groupsWithTabs) {
    let divtab = group.querySelector('div[role="tablist"]')
    if (divtab == null) break
    
    let countedTabName = ''
    for (let tab of divtab.children) {
        // Активная вкладка, которую уже считали
        if (tab.children[0].classList.length == 2) {
            countedTabName = tab.textContent.trim()
        }
    }

    for (let tab of divtab.children) {
        let tabname = tab.textContent.trim()
        if (countedTabName == tabname) continue

        tab.children[0].click()
        await new Promise(r => setTimeout(r, delayTimer))

        let groupMarkets = group.querySelectorAll('div[class*="rgl"]:has(> span[class*="rgl"]), div[class*="sct"]:has(> span[class*="sct"])')
        suspendedMarkets += getSuspendedMarkets(groupMarkets)
        allMarkets.push(...groupMarkets)
    }
}

console.log(allMarkets)
console.log(`${allMarkets.length} (${allMarkets.length - suspendedMarkets}, ${suspendedMarkets})`)