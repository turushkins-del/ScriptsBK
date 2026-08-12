// ‼️ ВАЖНО: НУЖНО ПЕРЕКЛЮЧИТЬ КОНТЕКСТ В КОНСОЛИ РАЗРАБОТЧИКА С top на main (!rt_home(4).html). В случае если его нет, может помочь перезапуск консоли через правый клик по области маркетов.


// LIVE: 
let allMarkets = document.querySelectorAll('span[id^="op"]').length
let disabled = 0;
 
const now = new Date();
const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
 
console.log(`[${hours}:${minutes}:${seconds}]: ${allMarkets} (${allMarkets - disabled}, ${disabled})`);
 
// ПРОВЕРКА
console.log(document.querySelectorAll('span[id^="op"]'));

// ---------------------------------------------------------------------------------------------------------------------------------------------

// PREMATCH

let allMarkets = document.querySelectorAll('a#p:not(td > b > a)').length
let disabled = 0;
 
const now = new Date();
const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
 
console.log(`[${hours}:${minutes}:${seconds}]: ${allMarkets} (${allMarkets - disabled}, ${disabled})`);
 
// ПРОВЕРКА
console.log(document.querySelectorAll('a#p:not(td > b > a)'));