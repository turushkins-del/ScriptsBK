// Для корректной работы скрипта нужно находиться сверху страницы, тк скрипт считает исходы сверху вниз. Лучше запускать со скрытыми маркетами
// Работа скрипта занимает некоторое время 

let visibleMarketsContainers, lastVisibleMarketContainer, lastVisibleMarketContainerDataIndex = -1;
let visibleMarketButtons = []

// CONFIG
let delayTimer = 1500
let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'кто забьет', 'штанги', 'VAR', 'удет удалён', 'Автор', 'Тотал жёлтых карточек', 'Карточки']

let openAllMarketsBTN = document.querySelector('.sp-new-gameDetailsMarketsSelector__collapseBtn')
openAllMarketsBTN.click()
openAllMarketsBTN.click()
openAllMarketsBTN.click()
await new Promise(r => setTimeout(r, delayTimer))


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
        
        let visibleMarketContainerTitle = visibleMarketContainer.querySelector('.sp-new-marketGroup__header__left__title').textContent.toUpperCase()
        
        if (statisticWords.some(word => visibleMarketContainerTitle.includes(word.toUpperCase()))) {
            console.log('НЕ УЧИТЫВАЕМ: ', visibleMarketContainerTitle)
            visibleMarketContainer.scrollIntoView({block: "start"})
            lastVisibleMarketContainerDataIndex = currentVisibleMarketsContainerDataIndex
            await new Promise(r => setTimeout(r, delayTimer))
            continue
        }

        let showMoreBTN = visibleMarketContainer.querySelector('button.sp-see-more-selections')
        if (showMoreBTN != null) {
            showMoreBTN.click()
            await new Promise(r => setTimeout(r, delayTimer))
            visibleMarketContainer.scrollIntoView({block: "start"})
            await new Promise(r => setTimeout(r, delayTimer))
            visibleMarketsContainers = document.querySelectorAll('div[data-index]')
        }
        
        let visibleMarketsContainerButtons = visibleMarketContainer.querySelectorAll('div.marketEventNew:not(.empty)')
        visibleMarketButtons.push(...visibleMarketsContainerButtons)
        lastVisibleMarketContainer = visibleMarketContainer
        lastVisibleMarketContainerDataIndex = currentVisibleMarketsContainerDataIndex
        console.log('[' + lastVisibleMarketContainerDataIndex + '] ' + lastVisibleMarketContainer.querySelector('.sp-new-marketGroup__header__left__title').textContent +' (' + visibleMarketsContainerButtons.length + ')')
        console.log(visibleMarketsContainerButtons)
    }
    lastVisibleMarketContainer.scrollIntoView({block: "start"})
    await new Promise(r => setTimeout(r, delayTimer))
}

console.log(visibleMarketButtons)
console.log(visibleMarketButtons.length)