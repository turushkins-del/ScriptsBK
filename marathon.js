// ‼ Мобильная версия сайта не удаленка
// Скрипт нужно запустить два раза, тк при первом запуске он не успевает посчитать маркеты 
// Для подсчета всех маркетов нужно переходить по вкладкам и суммировать их 
// Не нужно запускать из раздела "Популярное", тк там дублируются исходы из других разделов 

let statisticWords = ['грок', 'углов', 'ЖЁЛТЫЕ', 'фолы', 'удары', 'офсайд', 'аут', 'сейв', 'отбор', 'передач', 'кто забьет', 'желтых']

let marketPages, marketGroups, resultCount

function getMarketCount() {
    let marketBTN = document.querySelectorAll('.styles_coeff__pvKty')
    console.log(marketBTN)
    console.log(marketBTN.length)
}

function pageOpenAllMarkets() {
    if (document.querySelector('.style_markets__OzjJX')) document.querySelector('.style_markets__OzjJX').remove()
        
    marketGroups = document.querySelectorAll('.style_container__8ZOwF')
    for (let marketGroup of marketGroups) {
        if (!(marketGroup.firstElementChild.classList.value.includes('styles_row--expanded__cTgyc') || 
        statisticWords.some(word => marketGroup.firstElementChild.firstElementChild.textContent.toUpperCase().includes(word.toUpperCase())))) {
            marketGroup.firstElementChild.click()
        }
    }
}


pageOpenAllMarkets()

getMarketCount()