document.addEventListener('DOMContentLoaded', () => {
    const balanceElement = document.getElementById('balance');
    const betAmountElement = document.getElementById('betAmount');
    const rollDiceBtn = document.getElementById('rollDiceBtn');
    const gameResultElement = document.getElementById('gameResult');

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
});
