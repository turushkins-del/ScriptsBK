let delayTimer = 1000

let marketContainer = document.querySelector('.new-markets-container')

let marketGroups = marketContainer.querySelectorAll('.new-market')
let resultButtons = []

for (let marketGroup of [...marketGroups]) {
    let marketsInGroup = marketGroup.querySelectorAll('.new-outcome:not(.m-empty)')
    // console.log(marketsInGroup)
    resultButtons.push(...marketsInGroup)
    
    let haveFilter = marketGroup.querySelector('.new-market__filter') == undefined ? false : true
    
    if (!haveFilter) continue
    let allFilters = marketGroup.querySelectorAll('.new-market__filter-item:not(.m-active)')
    
    // console.log(marketGroup.querySelector('.m-active').textContent, marketsInGroup.length)
    for (let filter of allFilters) {
        filter.click()
        await new Promise(r => setTimeout(r, delayTimer))
        marketsInGroup = marketGroup.querySelectorAll('.new-outcome:not(.m-empty)')
        // console.log(filter.textContent, marketsInGroup.length)

        // console.log(marketsInGroup)
        resultButtons.push(...marketsInGroup)
    }
}

console.log(resultButtons)
console.log(resultButtons.length)
