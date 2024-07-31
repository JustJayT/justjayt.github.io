document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const betAmountElement = document.getElementById('betAmount');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const gameResultElement = document.getElementById('gameResult');
    const spinBtn = document.getElementById('spinBtn');
    const slotResultElement = document.getElementById('slotResult');
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');

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

    const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🍇'];

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

        const spinReel = () => symbols[Math.floor(Math.random() * symbols.length)];

        const result1 = spinReel();
        const result2 = spinReel();
        const result3 = spinReel();

        reel1.textContent = result1;
        reel2.textContent = result2;
        reel3.textContent = result3;

        if (result1 === result2 && result2 === result3) {
            const winAmount = betAmount * 5;
            balance += winAmount;
            slotResultElement.textContent = `You got ${result1}${result2}${result3}. You win ${winAmount} coins! Your new balance is ${balance} coins.`;
        } else {
            balance -= betAmount;
            slotResultElement.textContent = `You got ${result1}${result2}${result3}. You lose. Your new balance is ${balance} coins.`;
        }

        balanceElement.textContent = balance;

        if (balance <= 0) {
            alert('You have run out of coins. Please refresh the page to start over.');
            spinBtn.disabled = true;
        }
    });
});
