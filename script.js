
const Gameboard = (function(){
    const board = [['','',''],['','',''],['','','']];

    function getBoard() {
        return board;
    }


    return {getBoard};
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

    function addToken(row, column, player){
        if (Gameboard.getBoard()[row][column] === ''){
            Gameboard.getBoard()[row][column] = player.token;
        } else {
            console.log("This cell is already occupied");
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
                console.log(`You have won, ${winner}!`);
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
                console.log(`You have won, ${winner}!`);
            }
        }

    function playRound(){
        console.log(`It's time to make the first move ${getActivePlayer().name}.`);
        let activePlayerMoveRow = prompt("Which row do you want to place a token?");
        activePlayerMoveRow = parseInt(activePlayerMoveRow);
        let activePlayerMoveColumn = prompt("Which column do you want to place a token?");
        activePlayerMoveColumn = parseInt(activePlayerMoveColumn);
        // Update Gameboard.
        addToken(activePlayerMoveRow,activePlayerMoveColumn,getActivePlayer());
        // Show updated Gameboard.
        console.log(Gameboard.getBoard());
        // Check for winner.
        ifWinner(getOrSetPlayer(1,"get"),getOrSetPlayer(2,"get"));
        changeActivePlayer();
    }

    return {getIfWon,getOrSetPlayer,ifWinner,playRound};
})();



// while (GameController.getIfWon() === false) {
//     GameController.playRound();
// }


const popUp = document.getElementById('overlay');
const submitButton = document.getElementById('form-submit');
submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        const p1Name = document.getElementById('player1-name').value;
        const p2Name = document.getElementById('player2-name').value;

       if (p1Name) { // Validate that the fields are not empty
        GameController.getOrSetPlayer(1,"set",{name: p1Name});
        document.getElementById('p1-nametag').textContent = GameController.getOrSetPlayer(1,"get").name;

    }

    if (p2Name) { // Validate that the fields are not empty
        GameController.getOrSetPlayer(2,"set",{name: p2Name});
        document.getElementById('p2-nametag').textContent = GameController.getOrSetPlayer(1,"get").name;
    } 
    popUp.style.display = "none";
    }
    
 
)