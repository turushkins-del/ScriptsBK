let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'желты', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'автор', 'каркас', 'штрафной', 'количество ударов', 'штанг', 'забьет последний гол', 'створ', 'фол', 'от ворот']

let containers = document.querySelectorAll('._aFN2')
let marketContainersChildrens = []
containers.forEach(el => {
    marketContainersChildrens.push(...el.children)
})

for (let market of marketContainersChildrens) {
    let marketGroupTitle = market.querySelector('span._aFOV').textContent.toUpperCase()
    if (statisticWords.some(word => marketGroupTitle.includes(word.toUpperCase()))) {
        console.log('УДАЛЕН: ', marketGroupTitle)
        
        let odds = market.querySelectorAll('span[data-test-el="sportline-runner-name"]')
        let oddsText = 'ИСХОДЫ: '
        odds.forEach(element => { 
            oddsText += element.textContent + ' | '   
        });

        console.log(oddsText + '\n\n')
        market.remove()
        continue
    }
}

let allButtons = document.querySelectorAll('button._aFPd[data-sportline-runner]')
let resultButtons = []

for (let btn of [...allButtons]) {
    if (btn.dataset.testAttrLocked == 'false') {
        resultButtons.push(btn)
        continue
    } 
}

console.log(resultButtons)
console.log(resultButtons.length)