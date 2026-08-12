if (document.getElementsByClassName('ww-tabs__item--active')[0].innerHTML.includes('Все')) {
    let statisticNames = ['Угловые', 'Карточки', 'Игроки']
    let marketGroups = document.querySelectorAll('.market-group__title')
    for (let marketGroup of [...marketGroups]) {
        if (statisticNames.some(word => marketGroup.innerHTML.includes(word))) {
            console.log(marketGroup.nextElementSibling)
            marketGroup.nextElementSibling.remove()
        }
    }
}
 
let allMarkets = document.getElementsByClassName('market__row-btn market-row-btn ng-star-inserted')
let counterDisabledMarkets = 0;
for (market of allMarkets) {
    if (market.disabled) counterDisabledMarkets++;
}
 
const now = new Date();
 
const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
 
console.log(`[${hours}:${minutes}:${seconds}]: ${allMarkets.length} (${allMarkets.length - counterDisabledMarkets}, ${counterDisabledMarkets})`);
 
// ДЛЯ ПРОВЕРКИ: 
// console.log(document.getElementsByClassName('market__row-btn market-row-btn ng-star-inserted'))