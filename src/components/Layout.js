import palavras from './palavras'
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
    const[imagemForca, setImagemForca] = React.useState(<img src={`./assets/forca${errorCount}.png`} />)
    //variável que armazena quantos acertos o jogador já fez
    let[acertosCount, setAcertosCount] = React.useState(0);
    //variável que armazena o chute de palavra do jogador
    const[guess, setGuess] = React.useState('');
    //variável que controla as letras já escolhidas da partida
    const[letrasEscolhidas, setLetrasEscolhidas] = React.useState([]);
    //variável que controla a palavra conforme progresso de acertos e mostra na tela
    const gameWord = drawnWord.map((letter, index) => letrasEscolhidas.includes(drawnWord[index]) ? ` ${letter} ` : '_ ');

    /////////////////////Funções/////////////////////

    function startGame(){
        console.log('Jogo iniciado!')
        //setamos a variável que controla se o jogo já foi iniciado para 'true'
        setGameStarted(true);
        //chamamos a função que embaralha as palavras
        palavras.sort(shuffleWords);
        //escolhemos a palavra escolhida da partida após o embaralhamento (escolhido aleatoriamente a palavra na posição 30)
        setDrawnWord(...drawnWord, palavras[30].split(""));
        console.log(...drawnWord, palavras[30].split(""));
    }

    function shuffleWords(){
        return Math.random() - 0.5;
    }

    function chosenLetter(l){
        console.log(`letra escolhida: ${l}`);
        //caso o usuário selecione uma letra que pode ter variações, temos que tratar este caso aqui
        if(l === 'a'){
            setLetrasEscolhidas([...letrasEscolhidas, 'a', 'á', 'â', 'ã']);
        }
        if(l === 'e'){
            setLetrasEscolhidas([...letrasEscolhidas, 'e', 'é', 'ê']);
        }
        if(l === 'i'){
            setLetrasEscolhidas([...letrasEscolhidas, 'i', 'í']);
        }
        if(l === 'o'){
            setLetrasEscolhidas([...letrasEscolhidas, 'o', 'ó', 'ô', 'õ']);
        }
        if(l === 'u'){
            setLetrasEscolhidas([...letrasEscolhidas, 'u', 'ú']);
        }
        if(l === 'c'){
            setLetrasEscolhidas([...letrasEscolhidas, 'c', 'ç']);
        }
        //adiciona a letra escolhida na lista de letras escolhidas
        setLetrasEscolhidas([...letrasEscolhidas, l]);
        console.log('letrasEscolhidas:'+letrasEscolhidas);
        //caso a palavra contenha a letra escolhida, aumenta um acerto
        if(drawnWord.includes(l)){
            setAcertosCount(acertosCount += 1);
            console.log('acertos:'+acertosCount);
        }else{ //caso não tenha, aumenta um erro
            if(errorCount === 5){
                //caso estoure o limite de erros, usuário perde o jogo
                gameOver();
            }
            setErrorCount(errorCount += 1);
            console.log('erros:'+errorCount);
            //atualiza a imagem da forca correspondente ao número de erros
            setImagemForca(<img src={`./assets/forca${errorCount}.png`} />);
        }
        
    }

    function guessed(){
        console.log(`chutou!`);
    }

    function gameOver(){
        console.log(`perdeu o jogo!`);
    }

    //useEffect(()=> startGame(),[])

    /////////////////////Retorno/////////////////////

    return(
        <>
            <div className='main-container'>
                <div className = 'forca'>
                    {imagemForca}
                    <div className = "smallContainer">
                        <button onClick={startGame} disabled={gameStarted}>
                            Escolher Palavra
                        </button>
                        <div className="gameWord">
                            {gameWord}
                        </div>
                    </div>
                </div>
                <div className="letras">
                    {letters.map((letra, index) =>
                        <button 
                            key={index}
                            disabled={!gameStarted}
                            onClick={() => chosenLetter(letra)}
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
                        <input type = 'text' onChange={event => setGuess(event.target.value.toLowerCase())}/>
                    </div>
                    <div>
                        <button 
                            onClick={guessed} 
                            disabled={!gameStarted}
                            className="guessButton"
                        >
                            Chutar!
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}