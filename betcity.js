// Нужно зайти на страницу матча. Скрипт будет некорректно работать на странице со всеми событиями

let statisticNames = ['гроки']
let marketGroups = document.querySelectorAll('.dops-item__title')
for (let marketGroup of [...marketGroups]) {
    if (statisticNames.some(word => marketGroup.innerHTML.includes(word))) {
        console.log(marketGroup.parentElement)
        marketGroup.parentElement.remove()
    }
}
 
// удаление статы
let lineMarkets = document.querySelectorAll('app-line-main-dops-container > div > button')
let mainMarkets = document.getElementsByClassName('dops-item-row__block-right')
let allMarkets = [...lineMarkets, ...mainMarkets]
let counterDisabledMarkets = 0;
for (market of allMarkets) {
    if (market.disabled) counterDisabledMarkets++;
}
 
const now = new Date();
 
const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

// ДЛЯ ПРОВЕРКИ:
console.log(allMarkets)

console.log(`[${hours}:${minutes}:${seconds}]: ${allMarkets.length} (${allMarkets.length - counterDisabledMarkets}, ${counterDisabledMarkets})`);