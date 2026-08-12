let allMarketGroups = document.querySelectorAll('section[class^="bb-"')

let allMarketButtons = []
let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'кто забьет', 'забьёт гол', 'автор', 'забьёт последний гол', 'забьёт и исход', 'карточки', 'забьёт 1-й', 'стартовый состав', 'число карточек']

if (allMarketGroups[0].classList[0] != allMarketGroups[allMarketGroups.length-1].classList[0]) allMarketGroups[0].remove()

for (let marketGroup of [...allMarketGroups]) {
    
    let marketTitles = marketGroup.firstElementChild.firstElementChild.children[1]
    let marketGroupTitle = marketTitles.children[0].textContent.toUpperCase()
    let marketGroupSubTitle = marketTitles.children[1] == undefined ? 'undefined' : marketTitles.children[1].textContent.toUpperCase()
    
    if (statisticWords.some(word => marketGroupTitle.includes(word.toUpperCase())) 
        || statisticWords.some(word => marketGroupSubTitle.includes(word.toUpperCase()))) {
            console.log('УДАЛЕНО: ', marketGroupTitle, ' | ', marketGroupSubTitle, '\n')
            marketGroup.remove()
            continue
    }

    if (marketGroup.children[1] == undefined) continue
    let buttons = marketGroup.children[1].querySelectorAll('button')
    allMarketButtons.push(...buttons)
}

console.log(allMarketButtons)
console.log(allMarketButtons.length)