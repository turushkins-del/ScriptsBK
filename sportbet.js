// Стату пока что не считает.
let delayTimer = 3000

let sectionList = document.querySelector('main > div > section > div.relative.isolate > div > div > div > section > div.items-center > div')

let marketsContainer = document.querySelector("main > div > section > div.relative.isolate > div > div > div > :nth-child(3) > div ")

let resultButtons = []

for (let section of [...sectionList.children]) {
    let sectionTitle = section.querySelector('span').textContent
    
    if (sectionTitle == 'Статистика') continue
    
    section.click()
    await new Promise(r => setTimeout(r, delayTimer))

    let btns;
    let sectionBtns = []
    for (let marketSection of [...marketsContainer.children]) {
        let marketGroup = marketSection.querySelector('section > div > div')
        btns = marketGroup.querySelectorAll('button[data-odd-active]')
        resultButtons.push(...btns)
        sectionBtns.push(...btns)
    }
    console.log(sectionTitle)
    console.log(sectionBtns.length)
}


console.log(resultButtons)
console.log(resultButtons.length)