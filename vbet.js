let visibleMarketsContainers, lastVisibleMarketContainer, lastVisibleMarketContainerDataIndex = -1;
let visibleMarketButtons = []

// CONFIG
let delayTimer = 3000

while (true) {
    visibleMarketsContainers = document.querySelectorAll('div[data-index]')
    for (visibleMarketContainer of [...visibleMarketsContainers]) {
        
        let currentVisibleMarketsContainerDataIndex = visibleMarketContainer.dataset.index
        if (currentVisibleMarketsContainerDataIndex <= lastVisibleMarketContainerDataIndex) continue 

        let visibleMarketContainerTitle = visibleMarketContainer.querySelector('.sgm-market-head-info').textContent
        let visibleMarketsContainerButtons = visibleMarketContainer.querySelectorAll('.market-coefficient-bc')
        console.log(visibleMarketContainerTitle)
        console.log(visibleMarketsContainerButtons)

        visibleMarketButtons.push(...visibleMarketsContainerButtons)
        lastVisibleMarketContainer = visibleMarketContainer
        lastVisibleMarketContainerDataIndex = currentVisibleMarketsContainerDataIndex
    }
    console.log(lastVisibleMarketContainerDataIndex)
    lastVisibleMarketContainer.scrollIntoView()
    await new Promise(r => setTimeout(r, delayTimer))
}

console.log(visibleMarketButtons)
console.log(visibleMarketButtons.length)