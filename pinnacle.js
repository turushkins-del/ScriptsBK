// ‼ ДЛЯ РАБОТЫ СКРИПТА: Расскрыть маркеты полносью 

//let allMarketGroups = [];
const statisticWords = ['offside']


const allMarketGroups = document.querySelectorAll('div[class^="marketGroups"')[0]
//console.log('allMatchupMarketGroups: ', allMarketGroups)

for (let mainMarketGroup of [...allMarketGroups.children]) {
    //console.log('mainMarketGroup: ', mainMarketGroup)

    for (let marketGroup of [...mainMarketGroup.children]) {
        //console.log('marketGroup: ', marketGroup)

        let marketTitles = marketGroup.firstElementChild.firstElementChild.textContent.toUpperCase()

        if (statisticWords.some(word => marketTitles.includes(word.toUpperCase()))) {
            console.log('УДАЛЕНО: ', marketTitles, '\n')
            marketGroup.remove()
            continue
        }
        console.log('ОСТАЕТСЯ: ', marketTitles, '\n')

        let buttons = Array.from(marketGroup.querySelectorAll('button'))
        let targetButton = buttons.find(el => el.textContent.trim() === 'See more')
        
        if (targetButton == undefined) continue
        
        targetButton.click()
        //console.log('targetButton: ', targetButton, '\n')
    }
}

const allMarketButtons = document.getElementsByClassName('market-btn')
console.log(allMarketButtons)
console.log(allMarketButtons.length)
