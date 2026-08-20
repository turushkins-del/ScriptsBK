// ‼ КОНСОЛЬ ДОЛЖНА БЫТЬ ОТКРЫТА СНИЗУ; ЕСЛИ КОНСОЛЬ ОТКРЫТА СЛЕВА/СПРАВА, ВЕРСТКА САЙТА МЕНЯЕТСЯ НА МОБИЛЬНУЮ И СКРИПТ ПЕРЕСТАЕТ РАБОТАТЬ
 
let martketContainer, marketButtons, closedButtons, truncateMarketsButtons;
let isAllMarketsOpened, isAllTruncateClicked;
 
function clickAllTruncateButtons() {
    if (truncateMarketsButtons.length == 0) return
 
    [...truncateMarketsButtons].forEach(el => el.click())
    isAllTruncateClicked = true;
}
 
function checkTruncateState() {
    if (isAllTruncateClicked && [...truncateMarketsButtons].every(el => el.innerHTML == 'Скрыть')) {
        truncateObserver.disconnect();
        showResult()
    } else if (isAllTruncateClicked) {
        truncateObserver.disconnect();
        buttonObserver.disconnect();
        start();
    }
}
 
function checkButtonState() {
    if (isAllMarketsOpened && [...closedButtons].every(el => el.ariaExpanded)) {
 
        truncateMarketsButtons = martketContainer.querySelectorAll('span.truncate');
        if (!(truncateMarketsButtons.length == 0)) {
            [...truncateMarketsButtons].forEach(el => {
                truncateObserver.observe(el, {
                    subtree: true,
                    characterData: true
                    })
            })
            clickAllTruncateButtons();
        } else {
            showResult();
            truncateObserver.disconnect();
        }
        buttonObserver.disconnect();
    } else if (isAllMarketsOpened) {
        isAllMarketsOpened = false;
        openAllMarkets();
    }
}
 
let truncateObserver = new MutationObserver(checkTruncateState)
let buttonObserver = new MutationObserver(checkButtonState)
 
function openAllMarkets() {
    closedButtons.forEach(button => {
        if (button.dataset.state == 'closed') {
            button.click()
        }
    });
    isAllMarketsOpened = true;
}
 
function showResult() {
    marketButtons = martketContainer.querySelectorAll('button[outcomeid]');
    counterDisabledMarkets = 0;
    
    for (let marketButton of marketButtons) {
        if (marketButton.getAttribute('outcomeid') == '-1') counterDisabledMarkets ++
    }
 
    const now = new Date();
 
    const hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    
    console.log(`[${hours}:${minutes}:${seconds}]: ${marketButtons.length} (${marketButtons.length - counterDisabledMarkets}, ${counterDisabledMarkets})`);
}
 
function start() {
    isAllMarketsOpened, isAllTruncateClicked = false;
 
    martketContainer = document.getElementsByClassName('full-event-markets--YCk')[0]
 
    let activeTab = document.getElementsByClassName('bg-surface-action-fixed color-icotex-normal-fixed hover:color-icotex-normal-fixed event-tabs__tab-HXm-')[0];
    if (activeTab.firstElementChild.firstElementChild.innerHTML == 'Все') {
        statisticWords = ['. Угловые', '. Жёлтые карточки', 'Игроки', 'Фолы', 'Вброс аутов', 'Удары от ворот', 'Офсайды']
    
        for (let groupMarket of [...martketContainer.childNodes]) {
            if (statisticWords.some(word => groupMarket.dataset.tPartTime.toUpperCase().includes(word.toUpperCase()))) {
                martketContainer.removeChild(groupMarket)
            }
        }
    }
 
    closedButtons = martketContainer.querySelectorAll('button[aria-expanded=false]');
    
    truncateMarketsButtons = martketContainer.querySelectorAll('span.truncate');
    if (closedButtons.length == 0) {
        isAllMarketsOpened = true;
        buttonObserver.disconnect();
        if (!(truncateMarketsButtons.length == 0)) {
                [...truncateMarketsButtons].forEach(el => {
                truncateObserver.observe(el, {
                        subtree: true,
                        characterData: true
                    })
                })
            clickAllTruncateButtons();
        } else {
            isAllTruncateClicked = true;
            showResult();
            truncateObserver.disconnect();
        }
    } else {
        [...closedButtons].forEach(el => {
            buttonObserver.observe(el, {
                attributes: true,
                attributeFilter: ['aria-expanded']
            })
        })
    }
 
    openAllMarkets();
}
 
start()
 
// ДЛЯ ПРОВЕРКИ
console.log(document.getElementsByClassName('full-event-markets--YCk')[0].querySelectorAll('button[outcomeid]'))