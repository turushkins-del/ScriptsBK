// ‼ ДЛЯ РАБОТЫ СКРИПТА: Расскрыть маркеты полносью 
// Для подсчета всех маркетов нужно переходить по вкладкам и суммировать их 
// "Основной" -> "1-й тайм" -> "2-й тайм" и т.д.

console.log(document.querySelector('sport-european-view').shadowRoot.querySelectorAll('.dg_euv_stake'))
console.log(document.querySelector('sport-european-view').shadowRoot.querySelectorAll('.dg_euv_stake').length)