import palavras from './palavras';
import React, {useEffect} from 'react';

export default function Layout() {

    //array do alfabeto
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
    "v", "w", "x", "y", "z"];

    /////////////////////Variáveis/////////////////////

    //variável que controla se o jogo já foi iniciado
    const [gameStarted, setGameStarted] = React.useState(false);
    //variável que contém a palavra escolhida para a partida
    const [drawnWord, setDrawnWord] = React.useState([]);
    //variável que armazena quantos erros o jogador já cometeu
    let[errorCount, setErrorCount] = React.useState(0);
    //variável que armazena a imagem da forca de acordo com os erros
    const[imagemForca, setImagemForca] = React.useState(<img src={`./assets/forca${errorCount}.png`} data-test="game-image"/>)
    //variável que armazena quantos acertos o jogador já fez
    let[acertosCount, setAcertosCount] = React.useState(0);
    //variável que armazena o chute de palavra do jogador
    const[guess, setGuess] = React.useState('');
    //variável que controla as letras já escolhidas da partida
    const[letrasEscolhidas, setLetrasEscolhidas] = React.useState([]);
    //variável que controla a palavra conforme progresso de acertos e mostra na tela
    let gameWord = drawnWord.map((letter, index) => letrasEscolhidas.includes(drawnWord[index]) ? `${letter}` : '_ ');
    //variável que controla a cor da palavra final: vermelho ou verde
    const [finalWordColor, setFinalWordColor] = React.useState("");
    //variável que controla se o jogo já acabou ou não
    const [gameDone, setGameDone] = React.useState(false);
    
    /////////////////////Funções/////////////////////

    function startGame(){
        setDrawnWord([]);
        setErrorCount(0);
        setAcertosCount(0);
        setGuess('');
        setLetrasEscolhidas([]);
        setFinalWordColor('');
        setImagemForca(<img src={`./assets/forca0.png`} />);
        setGameDone(false);
        setGameStarted(true);
        console.log('Jogo iniciado!')
        //chamamos a função que embaralha as palavras
        palavras.sort(shuffleWords);
        //escolhemos a palavra escolhida da partida após o embaralhamento (escolhido aleatoriamente a palavra na posição 30)
        setDrawnWord(palavras[30].split(""));
        console.log(palavras[30].split(""));
    }

    function shuffleWords(){
        return Math.random() - 0.5;
    }

    function chosenLetter(l){
        console.log(`letra escolhida: ${l}`);
        //adiciona a letra escolhida na lista de letras escolhidas
        setLetrasEscolhidas([...letrasEscolhidas, l]);
        //caso a palavra contenha a letra escolhida, aumenta um acerto
        console.log(letrasEscolhidas);
        if(drawnWord.includes(l)){
            setAcertosCount(acertosCount += 1);
            console.log('acertos: '+acertosCount);

        }else{ //caso não tenha, aumenta um erro
            setErrorCount(errorCount += 1);
            console.log('erros: '+errorCount);
            //atualiza a imagem da forca correspondente ao número de erros
            setImagemForca(<img src={`./assets/forca${errorCount}.png`} data-test="game-image"/>);
            if(errorCount === 5){
                //caso estoure o limite de erros, usuário perde o jogo
                gameOver();
            }
        }
        console.log('letrasEscolhidas: '+letrasEscolhidas);
    }

    function guessed(){
        setGameStarted(false);
        console.log(`chutou!`);
        const palavraCheck = drawnWord.join('');
        if(guess === palavraCheck){
            gameWin();
        }else{
            gameOver();
        }
    }

    function gameOver(){
        setGameDone(true);
        setImagemForca(<img src={`./assets/forca6.png`} data-test="game-image"/>);
        setFinalWordColor('red');
        gameWord = drawnWord;
        console.log(`Você perdeu o jogo!`);
    }

    function gameWin(){
        setGameDone(true);
        setFinalWordColor('green');
        console.log('Você venceu o jogo!');
    }

    function verifyWinByLetter(){
        console.log('gameWord: '+gameWord.join(''));
        console.log('drawnWord: '+drawnWord.join(''));
        //verifica se vencemos por letras
        if(gameWord.join('') === drawnWord.join('')){
            gameWin();
        }
    }

    useEffect(() => {verifyWinByLetter()}, [gameWord, drawnWord]);

    /////////////////////Retorno/////////////////////

    return(
        <>
            <div className='main-container'>
                <div className = 'forca'>
                    {imagemForca}
                    <div className = "smallContainer">
                        <button onClick={startGame} data-test="choose-word">
                            Escolher Palavra
                        </button>
                        <div className={gameDone === false ?'gameWord' : 'hidden'} data-test="word">
                            {gameWord}
                        </div>
                        <div className={gameDone === true ?`gameWord ${finalWordColor}` : 'hidden'} data-answer={drawnWord}>
                            {drawnWord}
                        </div>             
                    </div>
                </div>
                <div className="letras">
                    {letters.map((letra, index) =>
                        <button 
                            key={index}
                            disabled={gameStarted === true ? (letrasEscolhidas.includes(letra) === true ? true : null) : true}
                            onClick={() => chosenLetter(letra)}
                            className={gameStarted === true ? (letrasEscolhidas.includes(letra) === true ? 'letrasDisabled' : 'letrasEnabled') : 'letrasDisabled'}
                            data-test="letter"
                        >
                        {letra}    
                        </button>
                    )}
                </div>
                <div className="chute">
                    <div>
                        <p>Já sei a palavra!</p>
                    </div>
                    <div>
                        <input disabled = {!gameStarted} type = 'text' onChange={event => setGuess(event.target.value.toLowerCase())} data-test="guess-input"/>
                    </div>
                    <div>
                        <button 
                            onClick={guessed} 
                            disabled={!gameStarted}
                            className="guessButton"
                            data-test="guess-button"
                        >
                            Chutar!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}