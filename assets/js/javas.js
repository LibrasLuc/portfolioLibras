//animação de deslizar
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
        
            entry.target.classList.add('show');
          } else {
           
            entry.target.classList.remove('show');
          }
        });
      },
      {
        threshold: 0.3, // % que essa bomba aparece
      }
    );

    
    const section = document.querySelector('.animate');
    observer.observe(section);
  });






  document.addEventListener('DOMContentLoaded', () => {
    let segundos = 0;

    // dividindo essa bomba de segundo para min,hr
    function formatarTempo(segundos) {
      const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
      const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
      const segs = String(segundos % 60).padStart(2, '0');
      return `${horas}:${minutos}:${segs}`;
    }

    //add um seg a int 
    function atualizarTempo() {
      segundos++;
      document.getElementById('tempoSite').textContent = formatarTempo(segundos);
    }

    //inicia o trem
    setInterval(atualizarTempo, 1000);

 
  
  });

// DISGRETA DO JOGO DAVEIA


  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  
  const cells = document.querySelectorAll('.cell');
  const statusText = document.getElementById('status');
  
  function handleCellClick(event) {
      const clickedCellIndex = event.target.id.split('-')[1];
  
      if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
          return;
      }
  
      gameBoard[clickedCellIndex] = currentPlayer;
      event.target.textContent = currentPlayer;
  
      if (checkWinner()) {
          statusText.textContent = `Jogador ${currentPlayer} venceu!`;
          gameActive = false;
      } else if (gameBoard.every(cell => cell !== '')) {
          statusText.textContent = 'Empate!';
          gameActive = false;
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          statusText.textContent = `Vez do Jogador ${currentPlayer}`;
      }
  }
  
  function checkWinner() {
      const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Linhas
          [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Colunas
          [0, 4, 8], [2, 4, 6]              // Diagonais
      ];
  
      return winPatterns.some(pattern => {
          const [a, b, c] = pattern;
          return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
      });
  }
  
  function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      statusText.textContent = 'Vez do Jogador X';
      cells.forEach(cell => {
          cell.textContent = '';
      });
  }
  
  cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
  });
  

  function abrirPopup(projetoId) {
    document.getElementById(`popup-${projetoId}`).style.display = 'block';
  }
  
  function fecharPopup(projetoId) {
    document.getElementById(`popup-${projetoId}`).style.display = 'none';
  }
  
  // Fechar pop-up ao clicar fora do conteúdo
  window.addEventListener('click', function (e) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
  