//  ОБЯЗАТЕЛЬНО СТРАНИЦУ НУЖНО ПРОКУРТИТЬ ВНИЗ, ИНАЧЕ НЕ ВСЕ МАРКЕТЫ СТАТИСТИКИ УДАЛЯТСЯ
 
let marketContainer = document.querySelectorAll('.EC_EE')[0]
let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'кто забьет']
 
// Раскрываем маркеты и удаляем стату
 
for (let marketGroups of [...marketContainer.children]) {
    if (marketGroups.querySelectorAll('.EC_HZ')[0] === undefined) continue
 
    let marketGroupTitle = marketGroups.querySelectorAll('.EC_HZ')[0].firstElementChild.innerText.toUpperCase()
    if (statisticWords.some(word => marketGroupTitle.includes(word.toUpperCase()))) {
        console.log('УДАЛЕН', marketGroupTitle)
        marketGroups.remove()
    }
 
    isOpened = marketGroups.querySelectorAll('.EC_Fw').length
    if (isOpened == 0) {
        marketGroups.querySelectorAll('div[role=button]')[0].click()
    }
}
 
// Считаем все маркеты
 
console.log(document.querySelectorAll('span.EC_JE'))
console.log(document.querySelectorAll('span.EC_JE').length)