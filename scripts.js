document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const betAmountElement = document.getElementById('betAmount');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const gameResultElement = document.getElementById('gameResult');
    const spinBtn = document.getElementById('spinBtn');
    const slotResultElement = document.getElementById('slotResult');

    let balance = 1000;

    rollDiceBtn.addEventListener('click', () => {
        const betAmount = parseInt(betAmountElement.value);

        if (isNaN(betAmount) || betAmount <= 0) {
            alert('Please enter a valid bet amount.');
            return;
        }

        if (betAmount > balance) {
            alert('You do not have enough balance to place this bet.');
            return;
        }

        const diceRoll = Math.floor(Math.random() * 6) + 1;

        if (diceRoll >= 4) {
            balance += betAmount;
            gameResultElement.textContent = `You rolled a ${diceRoll}. You win! Your new balance is ${balance} coins.`;
        } else {
            balance -= betAmount;
            gameResultElement.textContent = `You rolled a ${diceRoll}. You lose. Your new balance is ${balance} coins.`;
        }

        balanceElement.textContent = balance;

        if (balance <= 0) {
            alert('You have run out of coins. Please refresh the page to start over.');
            rollDiceBtn.disabled = true;
        }
    });

    const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓', '🍍'];
    const reels = [];
    for (let i = 1; i <= 7; i++) {
        reels.push(document.getElementById('reel' + i));
    }

    spinBtn.addEventListener('click', () => {
        const betAmount = parseInt(betAmountElement.value);

        if (isNaN(betAmount) || betAmount <= 0) {
            alert('Please enter a valid bet amount.');
            return;
        }

        if (betAmount > balance) {
            alert('You do not have enough balance to place this bet.');
            return;
        }

        const results = [];
        reels.forEach(reel => {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            results.push(symbol);
            animateReel(reel, symbol);
        });

        setTimeout(() => {
            const fruitCounts = countFruits(results);

            let winAmount = 0;
            for (let fruit in fruitCounts) {
                if (fruitCounts[fruit] >= 3) {
                    switch (fruitCounts[fruit]) {
                        case 3:
                            winAmount = betAmount;
                            break;
                        case 4:
                            winAmount = betAmount * 1.5;
                            break;
                        case 5:
                            winAmount = betAmount * 2;
                            break;
                        case 6:
                            winAmount = betAmount * 5;
                            break;
                        case 7:
                            winAmount = betAmount * 20;
                            break;
                        default:
                            winAmount = 0;
                    }
                }
            }

            if (winAmount > 0) {
                balance += winAmount;
                slotResultElement.textContent = `Congratulations! You win ${winAmount} coins! Your new balance is ${balance} coins.`;
                slotResultElement.classList.add('winning');
            } else {
                balance -= betAmount;
                slotResultElement.textContent = `You lose. Your new balance is ${balance} coins.`;
                slotResultElement.classList.remove('winning');
            }

            balanceElement.textContent = balance;

            if (balance <= 0) {
                alert('You have run out of coins. Please refresh the page to start over.');
                spinBtn.disabled = true;
            }
        }, 1500);
    });

    function animateReel(reel, result) {
        const numberElement = reel.querySelector('.number');
        numberElement.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            numberElement.textContent = result;
            numberElement.style.transform = 'translateY(100%)';
            setTimeout(() => {
                numberElement.style.transform = 'translateY(0)';
            }, 100);
        }, 1400);
    }

    function countFruits(results) {
        const fruitCounts = {};
        results.forEach(fruit => {
            if (!fruitCounts[fruit]) {
                fruitCounts[fruit] = 0;
            }
            fruitCounts[fruit]++;
        });
        return fruitCounts;
    }
});
const movingElements = document.querySelectorAll('.greg');
const initialTop = 50;
const initialLeft = 50;
const finalTop = 300;
const finalLeft = 300;
const btnR = document.querySelector('.btn-right');
const btnL = document.querySelector('.btn-left');
const tracks = document.querySelector('.tracks');
const tracksW = tracks.scrollWidth;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / documentHeight;

    const newTop = initialTop + (finalTop - initialTop) * scrollFraction;
    const newLeft = initialLeft + (finalLeft - initialLeft) * scrollFraction;

    movingElements.forEach(element => {
        element.style.top = `${newTop}px`;
        element.style.left = `${newLeft}px`;
});
});


btnR.addEventListener('click', _ => {
  tracks.scrollBy({
    left: tracksW / 2,
    behavior: 'smooth'
  });
});

btnL.addEventListener('click', _ => {
  tracks.scrollBy({
    left: -tracksW / 2,
    behavior: 'smooth'
  });
});


let observer = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) {
    document.body.classList.add("reveal");
  } else {
    document.body.classList.remove("reveal");
  }
});
observer.observe(document.querySelector("#top-of-site-pixel-anchor"));