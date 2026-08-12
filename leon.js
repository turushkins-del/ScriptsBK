let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'желты', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'автор', 'забьёт последний гол', 'створ', 'фол', 'от ворот']

let marketContainer = document.querySelectorAll('.markets-list-content__column_Rc3so')[0]

for (let market of [...marketContainer.children]) {
    let marketGroupTitle = market.querySelector('span.market-group-title__label_3nQx3').textContent.toUpperCase()
    if (statisticWords.some(word => marketGroupTitle.includes(word.toUpperCase()))) {
        console.log('УДАЛЕН: ', marketGroupTitle)
        
        let odds = market.querySelectorAll('span.sportline-group-market-runner__coefficient--left_uVMe5')
        let oddsText = 'ИСХОДЫ: '
        odds.forEach(element => { 
            oddsText += element.textContent + ' | '   
        });

        console.log(oddsText + '\n\n')
        market.remove()
        continue
    }
}

let allButtons = document.querySelectorAll('.sport-event-details-item__runner_bQQS2')
let resultButtons = []

for (let btn of [...allButtons]) {
    if (btn.dataset.testAttrLocked == 'false') {
        resultButtons.push(btn)
        continue
    } 

    // На случай, если нужно считать маркеты под замком
    isLocked = btn.querySelector('span[data-test-el=sportline-runner-mask]') == undefined ? false : true

    if (isLocked) {
        resultButtons.push(btn)
        continue
    }
}

console.log(resultButtons)
console.log(resultButtons.length)