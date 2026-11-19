// ‼️‼️ ПЕРЕД РАБОТОЙ СКРИПТА, нужно перейти на вкладку All и пролистать страницу вниз и обратно, чтобы подгрузились все элементы
// Скрипт работает около 10 секунд, задержка из-за долгой подгрузки на самом сайте. 

// Таймер, в случае, если что-то считается неверно, следует увеличить задержку, мс
const delayTimer = 1000
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Статистика
const statisticWords = ['corner', 'yellow', 'foul', 'shot', 'goalscorers', 'player', 'card', 'goal scorer', 'promoted build a bet']

let marketContainer = document.querySelector('.option-group-list > .group-list')
let marketGroupsTitles = marketContainer.querySelectorAll('.ds-accordion-header-start')

// Удаляем стату
function deleteStatistic() {
    marketGroupsTitles.forEach(el => {
        let marketGroupTitle = el.textContent.toUpperCase()
        if (statisticWords.some(word => marketGroupTitle.includes(word.toUpperCase()))) {
            console.log('УДАЛЕНО: ', marketGroupTitle)
            el.closest('.option-panel').remove()
        }
    })
}

// Раскрываем все группы
function openAllGroups() {
    marketContainer.querySelectorAll('button[aria-expanded=false]').forEach(el => {
        el.click()
})}

// Кликаем на все кнопки "Show More"
function clickShowMoreButtons() {
    document.querySelectorAll('.show-more-less-button:not(.expanded)').forEach(el => {
        el.click()
    })
}

async function countMarkets() {
    let groupMarketContainers = document.querySelectorAll('ms-option-panel')

    let markets = []
    let blockedMarketsCount = 0

    for (let groupMarketContainer of groupMarketContainers) {
        let haveTabs = groupMarketContainer.querySelector('.ds-tab-header') == null ? false : true 
        let marketBTNS;

        if (haveTabs) {
            let tabsButtons = groupMarketContainer.querySelectorAll('button[role="tab"]')
            for (let tabButton of tabsButtons) {
                tabButton.click()
                await sleep(delayTimer / 2)

                marketBTNS = groupMarketContainer.querySelectorAll('.option-indicator')
                blockedMarketsCount += groupMarketContainer.querySelectorAll('.option-indicator.offline').length

                markets.push(...marketBTNS)
            }
        } else {
            marketBTNS = groupMarketContainer.querySelectorAll('.option-indicator')
            blockedMarketsCount += groupMarketContainer.querySelectorAll('.option-indicator.offline').length

            markets.push(...marketBTNS)
        }
    }
    console.log(markets)
    console.log(`${markets.length} (${markets.length - blockedMarketsCount}, ${blockedMarketsCount})`)
}

// Запускаем скрипт
async function startScript() {
    deleteStatistic()
    openAllGroups()
    await sleep(delayTimer * 10)
    clickShowMoreButtons()
    await countMarkets()
}

startScript()