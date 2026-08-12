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
let allMarkets = document.getElementsByClassName('dops-item-row__block-right')
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
console.log(document.getElementsByClassName('dops-item-row__block-right'))