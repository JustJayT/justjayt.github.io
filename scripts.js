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

    const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots (ring) {
	
	var slotAngle = 360 / SLOTS_PER_REEL;

	var seed = getSeed();

	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		
		slot.className = 'slot';

		// compute and assign the transform for this slot
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

		slot.style.transform = transform;

		// setup the number to show inside the slots
		// the position is randomized to 

		var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');

		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {
	//var txt = 'seeds: ';
	for(var i = 1; i < 6; i ++) {
		var oldSeed = -1;
		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
			console.log(oldSeed);
		}
		var seed = getSeed();
		while(oldSeed == seed) {
			seed = getSeed();
		}

		$('#ring'+i)
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}

	console.log('=====');
}

$(document).ready(function() {

	// initiate slots 
 	createSlots($('#ring1'));
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
 	createSlots($('#ring4'));
 	createSlots($('#ring5'));

 	// hook start button
 	$('.go').on('click',function(){
 		var timer = 2;
 		spin(timer);
 	})

 	// hook xray checkbox
 	$('#xray').on('click',function(){
 		//var isChecked = $('#xray:checked');
 		var tilt = 'tiltout';
 		
    if($(this).is(':checked')) {
 			tilt = 'tiltin';
 			$('.slot').addClass('backface-on');
 			$('#rotate').css('animation',tilt + ' 2s 1');

			setTimeout(function(){
			  $('#rotate').toggleClass('tilted');
			},2000);
 		} else {
      tilt = 'tiltout';
 			$('#rotate').css({'animation':tilt + ' 2s 1'});

			setTimeout(function(){
	 			$('#rotate').toggleClass('tilted');
	 			$('.slot').removeClass('backface-on');
	 		},1900);
 		}
 	})

 	// hook perspective
 	$('#perspective').on('click',function(){
 		$('#stage').toggleClass('perspective-on perspective-off');
 	})	
 });
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
