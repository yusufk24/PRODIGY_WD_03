const state = {
    scores: {
        player1: 0,
        player2: 0
    },
    squares: Array(9).fill(null),
    xIsNxt: true,
};

function calculateWinner(squares){
    const winning_Lines =[
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],
        [1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    for (let i = 0; i <winning_Lines.length; i++) {
        const [a,b,c] = winning_Lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            showWinner(squares[a]);
            setTimeout(() => resetBoard(squares[a]),1000);
            return squares[a];
        }  
    }

    if (!squares.includes(null)) {
        showWinner(null);
        setTimeout(() => resetBoard(null), 1000)
        return
    }
    return null;
}

function resetBoard(winner){
    if (winner) {
        winner === 'X' ? state.scores.player1++ : state.scores.player2++;
        }
    
    state.squares = Array(9).fill(null);
    state.xIsNxt = true;
    $("#player1Score").text(state.scores.player1);
    $("#player2Score").text(state.scores.player2);
    renderBoard();
}

function showWinner(winner){
    const alertBox = $("#alert-box");
    if (winner) {
        winner = winner ==='X' ? 'Player 1': 'Player 2';
        alertBox.html(`${winner} <strong> Won! </strong>`)
    }else{
        alertBox.html(`It's a Draw!`)
    }
    
    alertBox.slideDown();
    setTimeout(() => alertBox.slideUp(), 1000);
    
}

function renderSquare(index){
    const val= state.squares[index] ? state.squares[index] : '&nbsp;';
    return `<div value=${index} class="box col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="boxClick(${index})">${val}</div>`
}

function renderBoard(){
    let board_html = '';
    for (let i = 0; i < 9; i++) {
        board_html += renderSquare(i);
    }
    $("#board").html(board_html);
    calculateWinner(state.squares);
}

function boxClick(index){
    const squares= state.squares;
    if (calculateWinner(squares) || squares[index]) {
        return;
    }

    squares[index]= state.xIsNxt ? 'X' : '0';
    state.squares= squares;
    state.xIsNxt= !state.xIsNxt;
    renderBoard();
}
function resetGame(){
    state.scores.player1 = 0;
    state.scores.player2 = 0;
    resetBoard(null);
}

$(() =>{
    renderBoard();
    $("#alert-box").slideUp(0.0001);
    $("#clear").on("click", () => resetBoard(null));
    $("#reset").on("click", () => resetGame());
});