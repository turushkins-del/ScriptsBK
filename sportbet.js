let delayTimer = 3000
 
let sectionList = document.querySelector('main > div > section > div.flex > div > div > div > div > section > div > div > div > div > div.items-center > div') // Матч, таймы
let [, ...sectionListItems] = sectionList.children // Убираем первый элемент - избранные исходы
     
let resultButtons = []

for (let section of sectionListItems) {
    let sectionTitle = section.querySelector('span').textContent
 
    if (sectionTitle == 'Статистика') continue
 
    section.click()
    await new Promise(r => setTimeout(r, delayTimer))
    
    let marketsContainer = document.querySelector("main > div > section > div.flex > div > div > div > div > div.flex > div > div")
    let btns = marketsContainer.querySelectorAll('button[data-odd-active]:not(button[disabled])')

    resultButtons.push(...btns)
    console.log(sectionTitle)
    console.log(btns.length)
}
 
 
console.log(resultButtons)
console.log(resultButtons.length)
 