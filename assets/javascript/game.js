// Star Wars RPG


// Global Variables
var message = '';
    playerName = '',
    playerAp = 0,
    playerHp = 0,
    originalPlayerAp = 0;
    terminated = 0,
    startOver = false;


// Characters Object
var characters = {
  // Create objects for each character with properties and values
  "Obi-Wan Kenobi": {
    "name": "Obi-Wan Kenobi",
    "image": "assets/images/obi_wan_kenobi_128x128",
    "Health Points": 120,
    "Attack Power": 8, //
    "Counter Attack Power": 30
  },
  "Luke Skywalker": {
    "name": "Luke Skywalker",
    "image": "assets/images/luke_skywalker_128x128",
    "Health Points": 100,
    "Attack Power": 20,
    "Counter Attack Power": 5 //
  },
  "Darth Sidious": {
    "name": "Darth Sidious",
    "image": "assets/images/darth_sidious_128x128",
    "Health Points": 150,
    "Attack Power": 4,
    "Counter Attack Power": 20 //
  },
  "Darth Maul": {
    "name": "Darth Maul",
    "image": "assets/images/darth_maul_128x128",
    "Health Points": 180,
    "Attack Power": 3,
    "Counter Attack Power": 25 //
  }
};


// $(document).ready() - The .ready() method specifies a callback function and waits for the DOM to be fully loaded before that function is executed.
$(document).ready(function() {
  // Display a message to the player explaining how to start the game by clicking an image.
  // Create an <h2> element
  message = $('<h2>');
  // Insert the content into the <h2> element.
  message.html('Click an image to select your character and start the game.');
  // Append the <h2> element to the <div> with id="message".
  $('#message').append(message);
  // Exexute setUp
  setUp();
}); // end document ready


// Set up the game and populate the DOM with the data in the object characters.
var setUp = function() {
  // If the player clicks the restart button, the startOver variable is set to true.
  if(startOver){
    // When the game restarts, the following elements are removed from the DOM or their child nodes / content are removed.
    $('.your-character').remove();
    $('.enemy').remove();
    $('.defender').remove();
    $('.player-log').empty();
    $('.defender-log').empty();
    $('.restart').remove();
    // StartOver is set to false.
    startOver = false;
  }
  // Loop over the characters object.
  for(character in characters) {
    // Create a <div> element with class="character" for each characters object
    var characterDiv = $('<div>').attr({
      'class': 'character'
    });
    // Create an <h2> element for each character's name.
    var characterH2 = $('<h2>').html(characters[character].name);
    // Create an <img> element for each character's image with src, width, height, and alt attributes.
    var characterImg = $('<img>').attr({
      'src': characters[character].image,
      'width': '128px',
      'height': '80px',
      'alt': characters[character].name
    });
    // Create a <p> element with class="health-points" to display each character's health points.
    var characterP = $('<p>').addClass('health-points').html(characters[character]["Health Points"]);
    // Append the characterH2, characterImg, and characterP elements to the characterDiv.
    characterDiv.append(characterH2);
    characterDiv.append(characterImg);
    characterDiv.append(characterP);
    // Append the characterDiv to the <div> element with the id="character-list".
    $('#character-list').append(characterDiv);
    // Execute yourCharacter()
    yourCharacter();
  } // end for loop over characters object
}; // end setUp()


// The player selects their character.
var yourCharacter = function() {
  // To start the game the player clicks on an image.
  // The clicked image becomes the player's character.
  $('.character').on('click', function() {
    // The player's character image is moved to the <div> with the id="player" under the heading 'Your Character.'
    $('#player').append(this); // 'this' refers to the <div> / image that was clicked.
    // Add the class 'your-character' to the element that was clicked.
    $(this).addClass('your-character');
    // All the other images / characters become the enemies and are moved to the <div> with the ID of enemies under the heading 'Enemies Available to Attack.'
    // Add class="enemy" to each image in the <div> element with id="enemies". Change the style of each image with css.
    $('#enemies').append($('.character').not(this).addClass('enemy').css('background-color', '#df1a1a'));
    // The click event for selecting a character is finished and removed.
    $('.character').off();
    //Execute enemyCharacter()
    enemyCharacter();
  }); // end .character click event anonymous function
}; // end yourCharacter()


// The player selects their opponent.
var enemyCharacter = function() {
  // Display a message to the player explaining how to continue the game.
  message.html('Click a red image from \'Enemies Available to Attack\' to select your opponent.');
  $('#message').append(message);
  // The clicked image becomes the player's opponent.
  $('.enemy').on('click', function() {
    // The enemy selected as the opponent is moved to the <div> with id="defender" under the heading 'Defender.'
    $('#defender').append(this);
    // Add class="defender" to the element that was clicked.
    $(this).addClass('defender');
    // Change the style of the defender image with css.
    $(this).css('background-color', '#000').css('color', '#fff');
    // The click event for selecting a character is finished and removed.
    $('.enemy').off();
    // Execute matchCharacter()
    attack();
  }); // end .enemy click event anonymous function
}; // end enemyCharacter()


// The game begins and the player is able to attack the opponent and the opponent is able to counter attack.
var attack = function() {
  // Display a message to the player explaining how to continue the game.
  message.html('Click the attack button to fight.');
  // Append the message to the <div> with id="message".
  $('#message').append(message);
  // Store the player's name in a variable named playerName. Access the name from the element with class="your-character".
  playerName = $('.your-character h2').text();
  // Store the opponent's name in a variable named defenderName. Access the name from the element with class="defender".
  var defenderName = $('.defender h2').text();
  // Store the player's health points in a variable named playerHp.
  playerHp = parseInt($('.your-character p.health-points').text());
  // Store the opponent's health points in a variable named defenderHp.
  var defenderHp = parseInt($('#defender p.health-points').text());
  // Set the player's attack power equal to the value given in the characters object.
  playerAp = characters[playerName]['Attack Power'];
  // Set the opponent's attack power equal to the value given in the characters object.  // Increases by base. If base is 6 each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on)
  var defenderCap = characters[defenderName]['Counter Attack Power'];
    // When the player clicks the attack button, the attack decreases the oppenent's health points and a counter attack decreases the player's health points.
    $('.attack').click(function() {
        // Player attacks the defender and the defenderHp decreases by the value of the player's attack power.
        defenderHp -= playerAp;
        // Display attack power.

        //******* Append to the DOM ***********

        $('.player-log').html('You attacked ' + defenderName + ' and lowered his health points by ' + playerAp + '.');
        // var playerLog = $('<h3>');
        // playerLog.html('You attacked ' + defenderName + ' and lowered his health points by ' + playerAp + '.');
        // $('#defender').append(playerLog);
        // The player's attack power increases after every attack / click by the base or original attack power set in the characters object.
        originalPlayerAp = characters[playerName]['Attack Power'];
        playerAp += originalPlayerAp;
        // Update the DOM with the current health points
        $('#defender p.health-points').text(defenderHp);
        // Defender makes a counter attack and playerHp decreases. Ensure no counter attack if defenderHp <= 0.
        if(defenderHp > 0) {
          // Defender counter attacks the player and the playerHp decreases by the value of the defender's counter attack power which remains constant throughout the game.
          playerHp -= defenderCap;
        }
        // Display counter attack power.
        $('.defender-log').html(defenderName + ' counter attacked you and lowered your health points by ' + defenderCap + '.');
        // var defenderLog = $('<h3>');
        // defenderLog.html(defenderName + ' counter attacked you and lowered your health points by ' + defenderCap + '.');
        // $('#defender').append(defenderLog);
        // Update the DOM with the current health points
        $('.your-character p.health-points').text(playerHp);
        // If the player's health points are equal to 0 or below, the player loses the game.
        if(playerHp <= 0) {
          // The click event for the attack / counter attack is finished and removed.
          $('.attack').off();
          // Display the game status.
          $('.player-log').html('You\'ve been defeated . . . GAME OVER!!!');
          // the following elements are removed from the DOM or heir child nodes / content removed.
          // The child nodes and content of the following element are removed from the DOM.
          $('.defender-log').empty();
          // Create the restart button.
          var restartBtn = $('<button>').text('Restart').addClass('restart');
          // Append the restart button to the <div> with id="defender".
          $('#defender').append(restartBtn);

          // When the restart button is clicked, restart the game.
          $('.restart').click(function() {
            // The startOver variable is set to true.
            startOver = true;
            // Execute setUp(startOver)
            setUp(startOver);
          });
      }
      // If the defender's health points are equal to 0 or below, the player is winning the game.
      if(defenderHp <= 0) {
        // Clear the message displayed to the player.
        $('#message').html('');
        // Turn off the click event and stop health points from being subtracted.
        $('.attack').off();
        // Remove the enemy from the defender <div>.
        $('.defender').remove();
        // Keep track of how many enemies are left to be defeated.
        terminated++;
        // Display the game status.
        $('.player-log').html('You\'ve defeated ' + defenderName + '! You can choose to fight another enemy by clicking a red image from "Enemies to Attack."');
        // The child nodes and content of the following element are removed from the DOM.
        $('.defender-log').empty();
        // If the attack button is clicked again, a new message appears on screen.
        $('.attack').click(function() {
          // Display the game status.
          $('.player-log').html('There is no enemy to fight here. Please select another enemy by clicking a red image from "Enemies to Attack."');
          // The click event for the attack / counter attack is finished and removed.
          $('.attack').off();
        });
        // Execute selectNextOpponent()
        selectNextOpponent();
      }
    });
};


// The player must select another opponent to continue the game.
var selectNextOpponent = function() {
// Player selects another opponent.
$('.enemy').click(function() {
  // The child nodes and content of the following element are removed from the DOM.
  $('.player-log').empty();
    // The next enemy selected as the opponent is moved to the <div> with id="defender" under the heading 'Defender.'
    var nextDefender = $('#defender').append(this);
    // Add class="defender" to the element that was clicked.
    $(this).addClass('defender');
    // Change the style of the defender image with css.
    $(this).css('background-color', '#000').css('color', '#fff');
    // The click event for selecting a character is finished and removed.
    $('.enemy').off();
    // Execute nextAttack();
    nextAttack();
  }); // end .enemy click event anonymous function
};


// Continue the game with attacks and counter attacks.
var nextAttack = function() {
  // When the player clicks the attack button, the attack decreases the oppenent's health points and a counter attack decreases the player's health points.
  $('.attack').click(function() {
    // Create variables to store the nextDefender's name, health points, and counter attack points.
    var nextDefenderName = $('.defender h2').text();
    var nextDefenderHp = parseInt($('.defender p.health-points').text());
    var nextDefenderCap = characters[nextDefenderName]['Counter Attack Power'];
    // Player attacks the nextDefender and nextDefender health points decrease.
    nextDefenderHp -= playerAp;
    // Display attack power.
    $('.player-log').html('You attacked ' + nextDefenderName + ' and lowered his health points by ' + playerAp + '.');
    // The player's attack points keep increasing throughout the game from one attack to the next.
    playerAp += originalPlayerAp;
    // Update the DOM with the current health points.
    $('#defender p.health-points').text(nextDefenderHp);
    // The defender makes a counter attack and playerHp decreases as long as the nextDefenderHp is not 0 or below.
    if(nextDefenderHp > 0) {
      playerHp -= nextDefenderCap;
    }
    // Display counter attack power.
    $('.defender-log').html(nextDefenderName + ' counter attacked you and lowered your health points by ' + nextDefenderCap + '.');
    // Update the DOM with the current health points
    $('.your-character p.health-points').text(playerHp);
    // If the nextDefender's health points are equal to 0 or below, the player is winning the game.
    if(nextDefenderHp <= 0) {
      // Turn off click event and stop points from being subtracted.
      $('.attack').off();
      // Remove the enemy from the defender area.
      $('.defender').remove();
      // Keep track of how many enemies are left to be defeated.
      terminated++;
      // Display the game status.
      $('.player-log').html('You\'ve defeated ' + nextDefenderName + '! You can choose to fight another enemy by clicking a red image from "Enemies to Attack."');
      // The child nodes and content of the following element are removed from the DOM.
      $('.defender-log').empty();
      // If the attack button is clicked again, a new message appears on screen.
      $('.attack').click(function() {
        // Display the game status.
        $('.player-log').html('There is no enemy to fight here. Please select another enemy by clicking a red image from "Enemies to Attack."');
        // The click event for the attack / counter attack is finished and removed.
        $('.attack').off();
      });
      // Player selects another opponent.
      $('.enemy').click(function() {
        // The child nodes and content of the following element are removed from the DOM.
        $('.player-log').empty();
          // The enemy selected as the next opponent is moved to the <div> with id="defender" under the heading 'Defender.'
          var nextDefender = $('#defender').append(this);
          // Add the class 'defender' to the element that was clicked.
          $(this).addClass('defender');
          // Change the style of the defender image with css.
          $(this).css('background-color', '#000').css('color', '#fff');
          // The click event for selecting a character is finished and removed.
          $('.enemy').off();
          // Execute nextAttack()
          nextAttack();
        }); // end .enemy click event anonymous function
    }
        // Player wins by defeating all enemy characters.
        // If terminated === 3, there are no more enemies to fight and the player wins.
        if(terminated === 3) {
          // Update the game status and reveal to the player that they won the game.
          $('.player-log').html('You Won!!! Game Over!!!');
          // Player may choose to restart the game.
          $('.attack').off();
          // Create the restart button.
          var restartBtn = $('<button>').text('Restart').addClass('restart');
          // Append the restart button to the <div> with id="defender".
          $('#defender').append(restartBtn);
          // When the restart button is clicked, restart the game.
          $('.restart').click(function() {
            // The startOver variable is set to true.
            startOver = true;
            // The terminated variable is set to 0.
            terminated = 0;
            // Execute setUp(startOver)
            setUp(startOver);
          });
        }
  });
};
