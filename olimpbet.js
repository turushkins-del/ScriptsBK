// ‼ Как только зашли на сайт справа сверху будет кнопка свернуть все, нужно кликнуть на нее два раза, чтобы расскрыть все маркеты 

let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'желты', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'автор', 'забьёт последний гол', 'створ', 'фол', 'от ворот', 'кто забьет']

let marketTitles = document.querySelectorAll('.headerContainer--SZ3oD4')

for (marketTitle of [...marketTitles]) {
    marketContainer = marketTitle.parentElement
    marketTitle = marketTitle.textContent.toUpperCase()
    
    if (statisticWords.some(word => marketTitle.includes(word.toUpperCase()))) {
        // 
        console.log('УДАЛЕН: ', marketTitle)
        // 
        marketContainer.remove()
    }
}

console.log(document.querySelectorAll('.root--FX9E7i'))
console.log(document.querySelectorAll('.root--FX9E7i').length)