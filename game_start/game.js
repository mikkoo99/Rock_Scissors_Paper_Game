const gameResult = {
    numberOfGames: 0,
    wins: 0,
    loses: 0,
    draws: 0
}
const game = {
    playerOption: null,
    aiOption: null,
}

//Pobranie listy węzłów opcji
const hands = document.querySelectorAll('.select img')

//Wybór dłoni
const handSelection = function () {
    game.playerOption = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = '')
    this.style.boxShadow = '0 0 0 4px yellow'
}
hands.forEach(hand => hand.addEventListener('click', handSelection))

//Wybór komputera
const aiSelection = function () {
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

//Opcje wyników gry
function checkResult(player, ai) {
    if (player === ai) {
        return 'draws'
    } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyczki') || (player === 'nożyczki' && ai === "papier")) {
        return 'win'
    } else return 'loss'
}

//Publikacja wyniku w grze
const publishResult = (player, ai, result)=>{
    document.querySelector('[data-summary="your-choice"]').textContent = player
    document.querySelector('[data-summary="ai-choice"]').textContent = ai
    document.querySelector('p.numbers span').textContent =  ++gameResult.numberOfGames
    if(result === 'win'){
        document.querySelector('p.wins span').textContent =  ++gameResult.wins
        document.querySelector('[data-summary="who-win"]').textContent = "wygrałeś"
    }else if(result ==='loss'){
        document.querySelector('p.losses span').textContent =  ++gameResult.loses
        document.querySelector('[data-summary="who-win"]').textContent = "przegrałeś"

    }else{
        document.querySelector('p.draws span').textContent =  ++gameResult.draws
        document.querySelector('[data-summary="who-win"]').textContent = "remis"

    }
}
//Zakończenie gry
const endGame = ()=>{
    document.querySelector(`[data-option=${game.playerOption}]`).style.boxShadow = ""
    game.playerOption = null
}

//Funkcja Sterująca
const startGame = function () {
    if (game.playerOption) {
        game.aiOption = aiSelection()
    } else return alert('WYBIERZ DŁOŃ')
    const gameResult = checkResult(game.playerOption, game.aiOption)
    publishResult(game.playerOption, game.aiOption, gameResult)
    endGame()
}
document.querySelector('.start').addEventListener('click', startGame)