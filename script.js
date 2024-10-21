
const Gameboard = (function(){
    let board;
    function setBoard(){
        board = [['','',''],['','',''],['','','']];
    }

    function getBoard() {
        return board;
    }


    setBoard();
    return {setBoard,getBoard};
    }
)();


const GameController = (function(){
    let player1 = { name:"Player1", token: 'X', activePlayer:true };
    let player2 = { name:"Player2", token: 'O', activePlayer:false };
    let board = Gameboard.getBoard();
    let ifWon = false;

    function getOrSetPlayer(playernum, action, { name } = {}){
        if (playernum === 1){
        if (action ==="get"){
            return player1;
        } else if (action === "set"){
            player1.name = name;
        }
        } else if (playernum === 2){
            if (action ==="get"){
                return player2;
            } else if (action === "set"){
                player2.name = name;
            }
        }
    }


    function getActivePlayer(){
        if (player1.activePlayer){
            return player1;
        } else if (player2.activePlayer){
            return player2;
        }
    }


    function changeActivePlayer(){
        player1.activePlayer = !player1.activePlayer;
        player2.activePlayer = !player2.activePlayer;
    }

    let goToNextTurn = true;

    function addToken(row, column, player){
        if (Gameboard.getBoard()[row][column] === ''){
            Gameboard.getBoard()[row][column] = player.token;
            goToNextTurn = true;
        } else {
            alert("This cell is already occupied");
            goToNextTurn = false;
        }
    }

    function getIfWon(){
        return ifWon;
    }

    function setIfWon(boo){
        ifWon = boo;
    }

    function ifWinner(p1,p2) {
        let winner;
        const xWin = "X,X,X";
        const oWin = "O,O,O";
        const col1 = [board[0][0],board[1][0],board[2][0]];
        const col2 = [board[0][1],board[1][1],board[2][2]];
        const col3 = [board[0][0],board[1][0],board[2][0]];
        const diag1 = [board[0][0],board[1][1],board[2][2]];
        const diag2 = [board[0][2],board[1][1],board[2][0]];


        if (board[0].toString() === xWin || 
            board[1].toString() === xWin || 
            board[2].toString() === xWin || 
            col1.toString() === xWin || 
            col2.toString() === xWin || 
            col3.toString() === xWin ||
            diag1.toString() === xWin ||
            diag2.toString() === xWin){
                winner =  p1.name;
                setIfWon(true);
                document.getElementById('whose-turn-id').textContent=`You have won, ${winner}!`;
        } else if (board[0].toString() === oWin || 
            board[1].toString() === oWin || 
            board[2].toString() === oWin || 
            col1.toString() === oWin || 
            col2.toString() === oWin || 
            col3.toString() === oWin ||
            diag1.toString() === oWin ||
            diag2.toString() === oWin){
                winner =  p2.name;
                setIfWon(true);
                document.getElementById('whose-turn-id').textContent=`You have won, ${winner}!`;
            }
        }
    
    let activePlayerMoveRow;
    let activePlayerMoveColumn;

    function getBoardCell(id){
        if (id === "one"){
            activePlayerMoveRow = 0;
            activePlayerMoveColumn = 0;
        } else if (id === "two") {
            activePlayerMoveRow = 0;
            activePlayerMoveColumn = 1;
        } else if (id === "three") {
            activePlayerMoveRow = 0;
            activePlayerMoveColumn = 2;
        } else if (id === "four") {
            activePlayerMoveRow = 1;
            activePlayerMoveColumn = 0;
        } else if (id === "five") {
            activePlayerMoveRow = 1;
            activePlayerMoveColumn = 1;
        } else if (id === "six") {
            activePlayerMoveRow = 1;
            activePlayerMoveColumn = 2;
        } else if (id === "seven") {
            activePlayerMoveRow = 2;
            activePlayerMoveColumn = 0;
        } else if (id === "eight") {
            activePlayerMoveRow = 2;
            activePlayerMoveColumn = 1;
        } else if (id === "nine") {
            activePlayerMoveRow = 2;
            activePlayerMoveColumn = 2;
        }
    }

    function updateBoard(){
      if (Gameboard.getBoard()[0][0] !== ""){
        document.getElementById('one').textContent = Gameboard.getBoard()[0][0];
      } 
      if (Gameboard.getBoard()[0][1] !== ""){
        document.getElementById('two').textContent = Gameboard.getBoard()[0][1];
      }
      if (Gameboard.getBoard()[0][2] !== ""){
        document.getElementById('three').textContent = Gameboard.getBoard()[0][2];
      }
      if (Gameboard.getBoard()[1][0] !== ""){
        document.getElementById('four').textContent = Gameboard.getBoard()[1][0];
      }
      if (Gameboard.getBoard()[1][1] !== ""){
        document.getElementById('five').textContent = Gameboard.getBoard()[1][1];
      } 
      if (Gameboard.getBoard()[1][2] !== ""){
        document.getElementById('six').textContent = Gameboard.getBoard()[1][2];
      }
      if (Gameboard.getBoard()[2][0] !== ""){
        document.getElementById('seven').textContent = Gameboard.getBoard()[2][0];
      }
      if (Gameboard.getBoard()[2][1] !== ""){
        document.getElementById('eight').textContent = Gameboard.getBoard()[2][1];
      }
      if (Gameboard.getBoard()[2][2] !== ""){
        document.getElementById('nine').textContent = Gameboard.getBoard()[2][2];
      }
    }

    function playRound(event){
        getBoardCell(event.target.id);
        addToken(activePlayerMoveRow,activePlayerMoveColumn,getActivePlayer());
        if (goToNextTurn === true){
            updateBoard();
            console.log(Gameboard.getBoard());
            ifWinner(getOrSetPlayer(1,"get"),getOrSetPlayer(2,"get"));
            if (ifWon === false){
                if(Gameboard.getBoard().toString().length === 17){
                    document.getElementById('whose-turn-id').textContent=`You tied! Good game.`;
                } else{
                changeActivePlayer();
                document.getElementById('current-player').textContent = getActivePlayer().name;
                }
            }
        };
    }

    return {getIfWon,getOrSetPlayer,ifWinner,playRound};
})();

const popUp = document.getElementById('overlay');
const enterNamesButton = document.getElementById('enter-names');

enterNamesButton.addEventListener("click", function(event) {
    event.preventDefault();
    popUp.style.display = "block";
}
);

const submitButton = document.getElementById('form-submit');

submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const p1Name = document.getElementById('player1-name').value;
        const p2Name = document.getElementById('player2-name').value;

       if (p1Name) { 
        GameController.getOrSetPlayer(1,"set",{name: p1Name});
        document.getElementById('p1-nametag').textContent = GameController.getOrSetPlayer(1,"get").name;
        document.getElementById('current-player').textContent = GameController.getOrSetPlayer(1,"get").name;

    }

    if (p2Name) { 
        GameController.getOrSetPlayer(2,"set",{name: p2Name});
        document.getElementById('p2-nametag').textContent = GameController.getOrSetPlayer(2,"get").name;
    } 
    popUp.style.display = "none";
    }    
);

const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener("click", function(event) {
    event.preventDefault();
    Gameboard.setBoard();
    document.getElementById('one').textContent = "";
    document.getElementById('two').textContent = "";
    document.getElementById('three').textContent = "";
    document.getElementById('four').textContent = "";
    document.getElementById('five').textContent = "";
    document.getElementById('six').textContent = "";
    document.getElementById('seven').textContent = "";
    document.getElementById('eight').textContent = "";
    document.getElementById('nine').textContent = "";
}
);

const boardButtons = document.querySelectorAll('.board-btn');
boardButtons.forEach(button => {
    button.addEventListener('click', GameController.playRound);
});