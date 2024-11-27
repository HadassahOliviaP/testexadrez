// chess.js
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("chessboard");
  
    const pieces = {
      pawn: "♟", knight: "♞", bishop: "♝", rook: "♜", queen: "♛", king: "♚",
      whitePawn: "♙", whiteKnight: "♘", whiteBishop: "♗", whiteRook: "♖", whiteQueen: "♕", whiteKing: "♔"
    };
  
    const initialPosition = [
      ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
      ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
      ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ];
  
    let selectedPiece = null;
  
    // Função para renderizar o tabuleiro
    function renderBoard() {
      board.innerHTML = ''; // Limpa o tabuleiro antes de renderizar
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = document.createElement("div");
          square.className = "square " + ((row + col) % 2 === 0 ? "light" : "dark");
          
          // Coloca as peças no tabuleiro
          if (initialPosition[row][col]) {
            const piece = document.createElement("div");
            piece.textContent = initialPosition[row][col];
            piece.className = "piece";
            piece.dataset.row = row;
            piece.dataset.col = col;
            square.appendChild(piece);
            
            // Adiciona o evento de clique para selecionar a peça
            piece.addEventListener("click", selectPiece);
          }
          
          square.dataset.row = row;
          square.dataset.col = col;
          square.addEventListener("click", movePiece);
          
          board.appendChild(square);
        }
      }
    }
  
    // Função para selecionar a peça
    function selectPiece(e) {
      if (selectedPiece) {
        selectedPiece.classList.remove("selected");
      }
      selectedPiece = e.target;
      selectedPiece.classList.add("selected");
    }
  
    // Função para mover a peça
    function movePiece(e) {
      if (!selectedPiece) return;
      
      const targetSquare = e.target;
      const targetRow = targetSquare.dataset.row;
      const targetCol = targetSquare.dataset.col;
  
      // Só permite mover se a célula estiver vazia ou tiver uma peça do oponente
      if (!targetSquare.classList.contains("piece")) {
        // Atualiza a posição da peça no tabuleiro
        initialPosition[targetRow][targetCol] = selectedPiece.textContent;
        initialPosition[selectedPiece.dataset.row][selectedPiece.dataset.col] = "";
  
        renderBoard();
      }
    }
  
    // Inicializa o tabuleiro
    renderBoard();
  });
  