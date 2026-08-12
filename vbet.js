// Для корректной работы скрипта нужно находиться сверху страницы, тк скрипт считает исходы сверху вниз. Лучше запускать со скрытыми маркетами
// Работа скрипта занимает некоторое время 

let visibleMarketsContainers, lastVisibleMarketContainer, lastVisibleMarketContainerDataIndex = -1;
let visibleMarketButtons = []



// CONFIG
let delayTimer = 1500
let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'кто забьет', 'штанги', 'VAR', 'удет удалён', 'Автор', 'Тотал жёлтых карточек', 'Карточки']


let shouldRun = true
while (shouldRun) {
    visibleMarketsContainers = document.querySelectorAll('div[data-index]')

    for (visibleMarketContainer of [...visibleMarketsContainers]) {
        let currentVisibleMarketsContainerDataIndex = parseInt(visibleMarketContainer.dataset.index)
        if (visibleMarketContainer.nextElementSibling == null && currentVisibleMarketsContainerDataIndex == lastVisibleMarketContainerDataIndex) {
            shouldRun = false;
            break
        }

        if (currentVisibleMarketsContainerDataIndex <= lastVisibleMarketContainerDataIndex) continue 
        
        let visibleMarketContainerTitle = visibleMarketContainer.querySelector('.sgm-market-head-info').textContent.toUpperCase()
        
        if (statisticWords.some(word => visibleMarketContainerTitle.includes(word.toUpperCase()))) {
            console.log('НЕ УЧИТЫВАЕМ: ', visibleMarketContainerTitle)
            visibleMarketContainer.scrollIntoView({block: "start"})
            lastVisibleMarketContainerDataIndex = currentVisibleMarketsContainerDataIndex
            await new Promise(r => setTimeout(r, delayTimer))
            continue
        }
   

        let showMoreBTN = visibleMarketContainer.querySelector('div > div > label > p')
        if (showMoreBTN != null) {
            showMoreBTN.click()
            await new Promise(r => setTimeout(r, delayTimer))
            visibleMarketContainer.scrollIntoView({block: "start"})
            await new Promise(r => setTimeout(r, delayTimer))
            visibleMarketsContainers = document.querySelectorAll('div[data-index]')
        }
        
        let visibleMarketsContainerButtons = visibleMarketContainer.querySelectorAll('.sgm-market-g-i-cell-bc:not(.empty-market-bc, .m-g-header)')

        visibleMarketButtons.push(...visibleMarketsContainerButtons)
        lastVisibleMarketContainer = visibleMarketContainer
        lastVisibleMarketContainerDataIndex = currentVisibleMarketsContainerDataIndex
        console.log('[' + lastVisibleMarketContainerDataIndex + '] ' + lastVisibleMarketContainer.querySelector('.sgm-market-head-info').textContent +' (' + visibleMarketsContainerButtons.length + ')')
    }
    lastVisibleMarketContainer.scrollIntoView({block: "start"})
    await new Promise(r => setTimeout(r, delayTimer))
}

console.log(visibleMarketButtons)
console.log(visibleMarketButtons.length)