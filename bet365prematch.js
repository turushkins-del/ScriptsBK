// CONFIG
const delayTimer = 300
const statisticWords = ['corner', 'yellow', 'foul', 'shot', 'goalscorers', 'player', 'card', 'goal scorer', 'promoted build a bet', 'booked', 'multi scorers', 'score or ']

// rrb-48 - default group
// sbz-52 - betboost
// rrb-3c4 - ai generated
// rso - выпадающий div 
// список будет пополняться 


let allMarkets = new Map()

// default - обычная группа
// range - диапозон 
// ...

async function countMarkets(betGroup, betGroupTitle, type = 'default') {
    switch (type) {
        case "range":
            betGroup.querySelector('button[class^="rrb"]').click()
            await new Promise(r => setTimeout(r, delayTimer))
            let betGroupRangeOptions = document.querySelector('div[class^="rso"] > div > div')
            let betGroupRangeOptionNumber = 0
            for (let betGroupRangeOption of betGroupRangeOptions.children) {
                if (document.querySelector('div[class^="rso"] > div > div') == null) betGroup.querySelector('button[class^="rrb"]').click()
                await new Promise(r => setTimeout(r, delayTimer))
                document.querySelector('div[class^="rso"] > div > div').children[betGroupRangeOptionNumber].click()
                await new Promise(r => setTimeout(r, delayTimer))
                _addMarkets(betGroup, betGroupTitle + ' ' + betGroupRangeOption.textContent)
                betGroupRangeOptionNumber++;
            }
        case "default":
            _addMarkets(betGroup, betGroupTitle)
    }
}

function _addMarkets(betGroup, betGroupTitle) {
    let betGroupMarkets = betGroup.querySelectorAll('div[class*="rgl"]:has(> span[class*="rgl"]), div[class*="sct"]:has(> span[class*="sct"])')

    if ((allMarkets.has(betGroupTitle)) && betGroupMarkets.length <= allMarkets.get(betGroupTitle)[0]) {
        console.log('УЖЕ ЕСТЬ ' + betGroupTitle + ': ' + allMarkets.get(betGroupTitle)[0])
        return
    }
    allMarkets.set(betGroupTitle, [betGroupMarkets.length, betGroupMarkets])
    console.log('ДОБАВИЛИ ' + betGroupTitle + ': ' + allMarkets.get(betGroupTitle)[0])
}

// const BetContainer = document.querySelector('.cr-d')
let btnsTitles = document.querySelector('nav[class^="rct"]').querySelectorAll('div[class^="rct"] > button')


btnsTitles = [...btnsTitles].filter((el, i) => el.classList.length == 1 || i == 0)


for (let btnTitle of btnsTitles) {
    let btnTitle_name = btnTitle.querySelector('span').textContent.toUpperCase()
    if (statisticWords.some(word => btnTitle_name.includes(word.toUpperCase()))) {
        console.log('НЕ УЧИТЫВАЕМ ГРУППУ: ' + btnTitle_name)
        continue
    }
 
    // btnTitle.click()
    await new Promise(r => setTimeout(r, delayTimer))

    let betContainer = document.querySelector('div:not([class]) > div:not([class]) > div[class^="cr-"')
    for (let betGroup of betContainer.children) {
        if (betGroup.className.startsWith('sbz')) {
            console.log('НЕ УЧИТЫВАЕМ: BETBOOST')
            betGroup.remove()
            continue
        } else if (betGroup.classList.length == 3) {
            console.log('НЕ УЧИТЫВАЕМ: MATCH ISIGHTS AI GENERATED')
            betGroup.remove()
            continue
        }

        let betGroupTitle = betGroup.querySelector('span[class^="rrb"]').textContent.toUpperCase()
        if (statisticWords.some(word => betGroupTitle.includes(word.toUpperCase()))) {
            console.log('НЕ УЧИТЫВАЕМ: ' + betGroupTitle)
            betGroup.remove()
            continue
        }

        // Проверяем, открыта ли группа
        let isBetGroupClosed = betGroup.querySelector('div[class^="pgu"]') == null || betGroup.querySelector('div[class^="pgu"] > div').innerHTML == ''
        if (isBetGroupClosed) {
            betGroup.querySelector('div[role="button"]').click()
            // console.info('ОТКРЫЛИ ГРУППУ ' + betGroupTitle)
            await new Promise(r => setTimeout(r, delayTimer))
        }
        // All, Show More, диапозон без All...

        let betGroupTabListButtons = betGroup.querySelectorAll('div[class^="rrb-"] > div[role="button"]')
        let isBetGroupTabListHaveAll = false;
        // Смотртим, есть ли таблист, потом смотрим, есть ли там All. Если есть - кликаем на него. Подразумевается, что под All будут все ставки. Ваще все. Также, не сразу кликаем на вторую кнопку втупую, тк возмонжо, что они могут этим таблистом разделить матч/1й тайм/2й тайм
        if (betGroupTabListButtons.length != 0) {
            Array.from(betGroupTabListButtons).some(el => {
                if (el.textContent == 'All') {
                    el.click()
                    isBetGroupTabListHaveAll = true;
                }
            })
            await new Promise(r => setTimeout(r, delayTimer))
        }
        
        // Теперь - нажимаем show More и считаем маркеты <------------------------------------------------- Переместить в каунтмаркетс
        // Дальше будем проверять еще на наличие других элементов внутри группы, если они есть - нажимать и считать

        let betGroupShowMoreBTN = betGroup.querySelector('button[type="button"][class^="pgu-"]')
        if (betGroupShowMoreBTN != null) {
            betGroupShowMoreBTN.click()
            await new Promise(r => setTimeout(r, delayTimer))
        }
        
        // Проверяем, есть ли выпадающий список с диапозонами
        let isBetGroupHaveChangeRange = betGroup.querySelector('button[class^="rrb"]:not(:has(span)):has(> div[class^="rrb"])') != null
        if (isBetGroupHaveChangeRange) await countMarkets(betGroup, betGroupTitle, type = 'range')
        else countMarkets(betGroup, betGroupTitle)

    }
    break
}
let allMarketsCount = 0
let allMarketsElements = [];
allMarkets.forEach(val => allMarketsCount+=val[0])
allMarkets.forEach(val => allMarketsElements.push(...val[1]))
console.log(allMarketsElements)
console.log(allMarketsCount)
