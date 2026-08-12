let visibleMarketsContainers, lastVisibleMarketContainer, lastVisibleMarketContainerDataIndex = -1;
let visibleMarketButtons = []

// CONFIG
let delayTimer = 1500

let shouldRun = true
while (shouldRun) {
    visibleMarketsContainers = document.querySelectorAll('div[data-index]')
    for (visibleMarketContainer of [...visibleMarketsContainers]) {
        let currentVisibleMarketsContainerDataIndex = parseInt(visibleMarketContainer.dataset.index)
        
        if (visibleMarketContainer.nextElementSibling == null && currentVisibleMarketsContainerDataIndex == lastVisibleMarketContainerDataIndex) {
            console.log(1)
            shouldRun = false;
            break
        }

        if (currentVisibleMarketsContainerDataIndex <= lastVisibleMarketContainerDataIndex) continue 
        
        let showMoreBTN = visibleMarketContainer.querySelector('div > div > label > p')
        if (showMoreBTN != null) {
            showMoreBTN.click()
            await new Promise(r => setTimeout(r, delayTimer))
        }

        let visibleMarketContainerTitle = visibleMarketContainer.querySelector('.sgm-market-head-info').textContent
        let visibleMarketsContainerButtons = visibleMarketContainer.querySelectorAll('.sgm-market-g-i-cell-bc')
        // console.log(visibleMarketContainerTitle)
        // console.log(visibleMarketsContainerButtons)

        visibleMarketButtons.push(...visibleMarketsContainerButtons)
        lastVisibleMarketContainer = visibleMarketContainer
        lastVisibleMarketContainerDataIndex = currentVisibleMarketsContainerDataIndex
        console.log(lastVisibleMarketContainer.querySelector('.sgm-market-head-info').textContent)
        console.log(lastVisibleMarketContainerDataIndex)
    }
    lastVisibleMarketContainer.scrollIntoView({block: "start"})
    await new Promise(r => setTimeout(r, delayTimer))
}

console.log(visibleMarketButtons)
console.log(visibleMarketButtons.length)