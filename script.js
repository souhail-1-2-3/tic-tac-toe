const cases = document.querySelectorAll('.case');
const joueurAffichage = document.getElementById('joueur');
const resetBtn = document.getElementById('reset');

let joueurActuel = 'X';
let tableauJeu = ['', '', '', '', '', '', '', '', ''];
let jeuActif = true;

const conditionsVictoire = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function verifierVictoire() {
  for (let condition of conditionsVictoire) {
    const [a, b, c] = condition;
    if (tableauJeu[a] && tableauJeu[a] === tableauJeu[b] && tableauJeu[a] === tableauJeu[c]) {
      alert(`Le joueur ${joueurActuel} a gagné !`);
      jeuActif = false;
      return;
    }
  }
}

function verifierMatchNul() {
  if (!tableauJeu.includes('') && jeuActif) {
    alert("Match nul !");
    jeuActif = false;
  }
}

function changerJoueur() {
  joueurActuel = (joueurActuel === 'X') ? 'O' : 'X';
  joueurAffichage.textContent = joueurActuel;
}

function clicCase(e) {
  const index = e.target.getAttribute('data-index');
  if (tableauJeu[index] !== '' || !jeuActif) {
    return;
  }
  tableauJeu[index] = joueurActuel;
  e.target.textContent = joueurActuel;
  verifierVictoire();
  verifierMatchNul();
  if (jeuActif) changerJoueur();
}

function recommencer() {
  joueurActuel = 'X';
  tableauJeu = ['', '', '', '', '', '', '', '', ''];
  jeuActif = true;
  joueurAffichage.textContent = joueurActuel;
  cases.forEach(c => c.textContent = '');
}

cases.forEach(c => c.addEventListener('click', clicCase));
resetBtn.addEventListener('click', recommencer);