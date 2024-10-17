
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

    function startGame(){
        console.log("Welcome to Tic Tac Toe");
        console.log("You know how to play. The board begins empty.");
        console.log(Gameboard.getBoard());
        console.log("One of you will be Player 1 and one of you will be Player 2. Player 1 will go first. What's your name, Player 1?");
        let pNameInput = prompt("Player 1, please enter your name:");
        if (pNameInput === null) {pNameInput = getOrSetPlayer(1,"get").name};
        getOrSetPlayer(1,"set",{name: pNameInput});
        console.log(`Welcome ${getOrSetPlayer(1,"get").name}!`);
        console.log("What's your name, Player 2?");
        pNameInput = prompt("Player 2, please enter your name:");
        if (pNameInput === null) {pNameInput = getOrSetPlayer(2,"get").name};
        getOrSetPlayer(2,"set",{name: pNameInput});
        console.log(`Welcome ${getOrSetPlayer(2,"get").name}!`);
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
        //I need to do something to re-render the game later maybe.
    }

    function getIfWon(){
        return ifWon;
    }

    function setIfWon(boo){
        ifWon = boo;
    }

    //need to check for winner every turn.
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

    startGame();
    return {getIfWon,getOrSetPlayer,ifWinner,playRound};
})();



while (GameController.getIfWon() === false) {
    GameController.playRound();
}
