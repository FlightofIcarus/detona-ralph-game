const gameState = {
    gameViews: {
        timer: document.querySelector('.timer-left'),
        score: document.querySelector('.score-points'),
        lives: document.querySelector('.lives-left'),
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
    },
    gameData: {
        timeInterval: 1000,
        score: 0,
        activeSquare: null,
        lives: 5,
        timeRemains: 60,
        pontuacaoMaxima: 0
    },
    gameActions: {

        hitSuccess: () => {
            const hitSuccessSound = new Audio('./src/audios/hit.m4a');
            hitSuccessSound.play();
        }
    }
};

/**
 * Define um quadrado aleatório como o quadrado inimigo ativo.

 * Essa função itera por todos os quadrados, remove a classe 'enemy' de cada um e, em seguida, seleciona aleatoriamente um quadrado para se tornar o inimigo ativo. O quadrado selecionado é atribuído a `gameState.gameData.activeSquare` e tem a classe 'enemy' adicionada a ele.

 * @param {object} gameState - O objeto de estado do jogo, contendo propriedades como `gameViews` e `gameData`.
 * @returns {void} - Não retorna nenhum valor.
 */
function setRandomSquare() {
    gameState.gameViews.squares.forEach((square) => {
        square.classList.remove('enemy');
    });
    const squareActive = Math.floor(Math.random() * (gameState.gameViews.squares.length - 1));
    gameState.gameData.activeSquare =  gameState.gameViews.squares[squareActive];
    gameState.gameData.activeSquare.classList.add('enemy');1
}


/**
 * Inicializa o timer do jogo.
 *
 * Essa função cria um intervalo de tempo que decrementa o valor de `gameState.gameData.timeRemains` a cada segundo e
 * atualiza a visualização do tempo restante na tela. Se o tempo restante chegar a zero, a função `newGame` é chamada.
 *
 * @returns {void} - Não retorna nenhum valor.
 */
function timerInit() {
    const timeLapse = setInterval(() => {
        gameState.gameData.timeRemains--;
        gameState.gameViews.timer.textContent = gameState.gameData.timeRemains;
        if(gameState.gameViews.timer.textContent < '0') {
            clearInterval(timeLapse);
            newGame();
        }
    }, gameState.gameData.timeInterval);

    

    return
}

/**
 * Incrementa a pontuação do jogador e atualiza a
 * visualização da mesma na tela. Além disso, remove
 * a classe 'enemy' do quadrado que estava ativado.
 */
function scoreVerification() {
    gameState.gameData.score++;
    gameState.gameViews.score.textContent = gameState.gameData.score;
    gameState.gameData.activeSquare = null;   
};


/**
 * Função que reseta o estado do jogo, mostrando o alerta 
 * com a pontuação do jogador e a pontuação máxima, e 
 * redefinindo o timer, a pontuação e as vidas do jogador.
 * 
 * Caso a pontuação do jogador seja maior que a pontuação
 * máxima, a pontuação máxima recebe o valor da pontuação
 * do jogador.
 */
const newGame = () => {
    
    if(Number(gameState.gameViews.score.textContent) > gameState.gameData.pontuacaoMaxima){
        gameState.gameData.pontuacaoMaxima = Number(gameState.gameViews.score.textContent)
        alert(`Game Over!
Sua pontuação foi: ${gameState.gameViews.score.textContent}.
Parabéns! A nova pontuação máxima é sua!`);} else {

            alert(`Game Over!
Sua pontuação foi: ${gameState.gameViews.score.textContent}.
A pontuação maxima atual é: ${gameState.gameData.pontuacaoMaxima}`);
        };

    gameState.gameData.score = 0;
    gameState.gameData.lives = 5;
    gameState.gameData.timeRemains = 60;
    gameState.gameViews.score.textContent = gameState.gameData.score;
    gameState.gameViews.lives.textContent = gameState.gameData.lives;
    gameState.gameViews.timer.textContent = gameState.gameData.timeRemains;
    
    timerInit()
}


/**
 * Verifica se o jogador ainda tem vidas disponíveis,
 * decrementa o número de vidas e atualiza a visualização
 * da mesma na tela. Se o jogador não tiver mais vidas,
 * a função newGame() é chamada.
 */
function livesVerification() {
    if(gameState.gameData.lives === 0) { 
        newGame()
    }else{
        gameState.gameData.lives--;
        gameState.gameViews.lives.textContent = gameState.gameData.lives;
        }
}


/**
 * Adiciona um ouvinte de eventos 'mousedown' a cada quadrado na visualização do jogo.

 * Quando um quadrado é clicado:

 * - Se o ID do quadrado clicado corresponder ao ID do quadrado ativo em `gameState.gameData.activeSquare`:
 *     - Chama a função `scoreVerification` (provavelmente para verificar e atualizar a pontuação).
 *     - Chama a função `hitSuccess` de `gameState.gameActions` (provavelmente para lidar com a lógica de acerto).
 * - Caso contrário:
 *     - Chama a função `livesVerification` (provavelmente para lidar com erros e possivelmente diminuir vidas).

 * Essa função é provavelmente usada para implementar a mecânica de detecção de acertos em um jogo onde os jogadores clicam em quadrados específicos.

 * @param {object} gameState - O objeto de estado do jogo, contendo propriedades como `gameViews` e `gameData`.
 * @returns {void} - Não retorna nenhum valor.
 */
function addHitBoxLinstener() {
    gameState.gameViews.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if(square.id === gameState.gameData.activeSquare.id) { 
                scoreVerification();
                gameState.gameActions.hitSuccess();
            } else {
                livesVerification();
            }
        })

    })
}


/**
 * Função que inicializa o estado do jogo, definindo a 
 * quantidade de vidas iniciais do jogador, setando o 
 * timer, e adicionando um listener para quando o 
 * jogador clica em um quadrado. Além disso, a função 
 * setInterval é usada para setar um intervalo de tempo 
 * para a chamada da função setRandomSquare, que é 
 * responsável por setar um quadrado aleatório como 
 * inimigo.
 */
function gameInit () {
    gameState.gameViews.lives.textContent = gameState.gameData.lives;
    gameState.gameViews.timer.textContent = gameState.gameData.timeRemains;
    timerInit();
    setInterval(setRandomSquare, gameState.gameData.timeInterval)
    addHitBoxLinstener();
};

gameInit();