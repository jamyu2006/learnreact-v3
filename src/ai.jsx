export function two_in_a_row(squares, symbol) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] === symbol && squares[b] === symbol && squares[c] === null) {
            return c;
        } else if (squares[a] === symbol && squares[b] === null && squares[c] === symbol) {
            return b;
        } else if (squares[a] === null && squares[b] === symbol && squares[c] === symbol) {
            return a;
        }
    }
    return null;
}

export function getAImove(squares) {
    const emptySquares = squares
        .map((val, index) => (val === null ? index : null))
        .filter(val => val !== null);

    if (emptySquares.length === 8) {
        if (emptySquares.includes(4)) {
            return 4;
        } else {
            return 0;
        }
    } else if (emptySquares.length === 6) {
        //handle edge cases
        if (squares[4] === 'X' && squares[8] === 'X') {
            return 2;
        } else if (squares[0] === 'X' && squares[8] === 'X') {
            return 1;
        } else if (squares[2] === 'X' && squares[6] === 'X') {
            return 3;
        }
        //edge around center case
        else if (squares[1] === 'X' && squares[3] === 'X') {
            return 0;
        } else if (squares[1] === 'X' && squares[5] === 'X') {
            return 8;
        } else if (squares[5] === 'X' && squares[7] === 'X') {
            return 2;
        } else if (squares[7] === 'X' && squares[3] === 'X') {
            return 6;
        }
    }

    const findWin = two_in_a_row(squares, 'O');
    if (findWin !== null) {
        return findWin; // Return the win if there's one
    }

    const blockMove = two_in_a_row(squares, 'X');
    if (blockMove !== null) {
        return blockMove; // Return the block move if there's one
    }

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
}