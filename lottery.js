let selectedNumbers = []; // Declare selectedNumbers as a global variable

function generateNumbers() {
  const minNumber = 1;
  const maxNumber = 36;
  const totalNumbers = 7;
  
  selectedNumbers = []; // Reset selectedNumbers array
  
  while (selectedNumbers.length < totalNumbers) {
      let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      
      if (!selectedNumbers.includes(randomNumber)) {
          selectedNumbers.push(randomNumber);
      }
  }

  animateReels(selectedNumbers);

  // Enable input fields before generating numbers
  const numberInputs = document.querySelectorAll('.number-input');
  numberInputs.forEach(input => {
    input.disabled = false;
  });
}


function animateReels(numbers) {
  const reels = document.querySelectorAll('.reel');
  reels.forEach((reel, index) => {
      setTimeout(() => {
          reel.style.transform = `translateY(-500px)`;
          setTimeout(() => {
              reel.textContent = numbers[index];
              reel.style.transform = `translateY(0)`;
          }, 1500);
      }, index * 200);
  });
}
// Show loader when page is loading
document.getElementById('loader-wrapper').style.display = 'flex'; // Show the loader

// Hide loader and show slot machine when page is loaded
window.onload = function() {
  document.querySelector('.slot-machine').style.display = 'block';
  document.getElementById('loader-wrapper').style.display = 'none'; // Hide the loader
}
// Function to check if the entered numbers match the generated numbers
function checkNumbers() {
  const enteredNumbers = [];
  for (let i = 1; i <= 7; i++) {
      const input = document.getElementById('number' + i);
      const value = parseInt(input.value);
      if (isNaN(value) || value < 1 || value > 36) {
          alert('Please enter valid numbers between 1 and 36.');
          return;
      }
      enteredNumbers.push(value);
      // Lock the input field after checking the numbers
      input.disabled = true;
  }

  if (JSON.stringify(enteredNumbers.sort()) === JSON.stringify(selectedNumbers.sort())) {
      // Numbers matched, trigger victory animation
      document.getElementById('result').innerText = 'Congratulations! You have won!';
      // Add code for victory animation here
  } else {
      document.getElementById('result').innerText = 'Sorry, your numbers did not match. Try again.';
  }
}
