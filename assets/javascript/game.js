// Star Wars RPG

// Global variables
let message = '',
    playerName = '',
    opponentName = '',
    playerIndex = '',
    opponentIndex = '',
    playerAp = 0,
    playerHp = 0,
    opponentCap = 0,
    opponentHp = 0,
    originalPlayerAp = 0,
    selectNewOpponent = false;

// Game Object
const game = {

  characters: [
    // Create objects for each character with properties and values
    {
      "name": "Obi-Wan Kenobi",
      "image": "assets/images/obi_wan_kenobi_128x128",
      "Health Points": 120,
      "Attack Power": 8,
      "Counter Attack Power": 30
    },
    {
      "name": "Luke Skywalker",
      "image": "assets/images/luke_skywalker_128x128",
      "Health Points": 100,
      "Attack Power": 20,
      "Counter Attack Power": 5
    },
    {
      "name": "Darth Sidious",
      "image": "assets/images/darth_sidious_128x128",
      "Health Points": 150,
      "Attack Power": 4,
      "Counter Attack Power": 20
    },
    {
      "name": "Darth Maul",
      "image": "assets/images/darth_maul_128x128",
      "Health Points": 180,
      "Attack Power": 3,
      "Counter Attack Power": 25
    }
  ],

  // Set up the game and populate the DOM with the data in the game object.
  setUp: function() {
    // If the player clicks the restart button, the following elements are removed from the DOM and the variables are reset.
    $('#message').remove();
    $('#game-characters').remove();
    $('#player').remove();
    $('#enemies').remove();
    $('#fight').remove();
    $('#opponent').remove();
    $('#game-status').remove();
    playerName = '';
    opponentName = '';
    playerIndex = '';
    opponentIndex = '';
    playerAp = 0;
    playerHp = 0;
    opponentCap = 0;
    opponentHp = 0;
    originalPlayerAp = 0;

    // Display a message to the player explaining how to select their character by clicking an image.
    // Create an <h2> element
    message = $('<h2>').attr('id', 'message');
    // Insert the content into the <h2> element.
    message.text('Click an image to select your character.');
    // Append the <h2> element to the <main> element.
    $('main').append(message);

    // Create a <div> to display the game characters.
    let gameCharactersDiv = $('<div>').attr('id', 'game-characters');
    // Loop over the game.characters object.
    for(character in game.characters) {
      // Create a <div> element with class="character" for each object in the characters array.
      let characterDiv = $('<div>').attr({
        'class': 'character',
        'data-index': character
      });
      // Create an <h2> element for each character's name.
      let characterH2 = $('<h2>').html(game.characters[character].name);
      // Create an <img> element for each character's image with src, width, height, and alt attributes.
      let characterImg = $('<img>').attr({
        'src': game.characters[character].image,
        'width': '128px',
        'height': '80px',
        'alt': game.characters[character].name
      });
      // Create a <p> element with class="health-points" to display each character's health points.
      let characterP = $('<p>').addClass('health-points').html(game.characters[character]["Health Points"]);
      // Append the characterH2, characterImg, and characterP elements to the characterDiv.
      characterDiv.append(characterH2);
      characterDiv.append(characterImg);
      characterDiv.append(characterP);
      // Append the characterDiv to the gameCharactersDiv.
      gameCharactersDiv.append(characterDiv);
      // Append the gameCharactersDiv to the <main> element.
      $('main').append(gameCharactersDiv);
    } // end for loop over game.characters object

    // Create a <div> for the player's character.
    let playerDiv = $('<div>').attr('id', 'player');
    // Create a heading for this <div>.
    let playerH2 = $('<h2>').text('Your Character');
    // Append playerH2 to the playerDiv.
    playerDiv.append(playerH2);
    // Append the playerDiv to the <main> element.
    $('main').append(playerDiv);

    // Create a <div> for the player's enemies.
    let enemiesDiv = $('<div>').attr('id', 'enemies');
    // Create a heading for this <div>.
    let enemiesH2 = $('<h2>').text('Enemies Available to Attack');
    // Append enemiesH2 to the enemiesDiv.
    enemiesDiv.append(enemiesH2);
    // Append the enemiesDiv to the <main> element.
    $('main').append(enemiesDiv);

    // Create a <div> for the fight.
    let fightDiv = $('<div>').attr('id', 'fight');
    // Create a heading for this <div>.
    let fightH2 = $('<h2>').text('Fight Section');
    // Create a button for the attack / counter attack.
    let fightBtn = $('<button>').attr('class', 'attack').text('Attack');
    // Append fightH2 to fightDiv.
    fightDiv.append(fightH2);
    // Append the fightBtn to the fightDiv.
    fightDiv.append(fightBtn);
    // Append the fightDiv to the <main> element.
    $('main').append(fightDiv);

    // Create a <div> for the player's opponent.
    let opponentDiv = $('<div>').attr('id', 'opponent');
    // Create a heading for this <div>.
    let opponentH2 = $('<h2>').text('Your Opponent');
    // Append opponentH2 to the opponentDiv.
    opponentDiv.append(opponentH2);
    // Append the opponentDiv to the <main> element.
    $('main').append(opponentDiv);

    // Create the game status <div> to track and log game data.
    let gameStatusDiv = $('<div>').attr('id', 'game-status');
    // Create playerLog <h3> to track and log player attack power.
    let playerLog = $('<h3>').attr('class', 'player-log');
    // Create opponentLog <h3> to track and log opponent counter attack power.
    let opponentLog = $('<h3>').attr('class', 'opponent-log');
    // Append the playerLog and opponentLog <h3> elements to the gameStatus <div>.
    gameStatusDiv.append(playerLog);
    gameStatusDiv.append(opponentLog);
    // Append the gameStatusDiv to the <main> element.
    $('main').append(gameStatusDiv);

    // Create the restart button.
    let restartBtn = $('<button>').text('Restart').addClass('restart');
    // Append the restart button to the <div> with id="game-status".
    $('#game-status').append(restartBtn);
    // Hide restart button
    $('.restart').css('display', 'none');
  }, // end game.setUp()

  // The player selects their character.
  selectYourCharacter: function() {
    // The player clicks an image to select their character.
    $(document).on('click', '.character', function() {
      // The player's character image is moved to the <div> with the id="player" under the heading 'Your Character.'
      $('#player').append(this); // 'this' refers to the <div> / image that was clicked.
      // Add the class="your-character" to the element that was clicked.
      $(this).addClass('your-character');
      // All the other images / characters become the enemies and are moved to the <div> with id="enemies" under the heading 'Enemies Available to Attack.'
      // Add class="enemy" to each image in the <div> element with id="enemies". Change the style of each image with css.
      $('#enemies').append($('.character').not(this).addClass('enemy').css('background-color', '#df1a1a'));

      // Display a message to the player explaining how to continue the game.
      $('#message').text('Click a red image from \'Enemies Available to Attack\' to select your opponent.');

      // The click event for selecting a character is finished and removed.
      $(document).off('click', '.character');

      // Store the player's name, data-index, and health points in variables named playerName, playerIndex, and playerHp.
      playerName = $('.your-character h2').text();
      playerIndex = $('.your-character').attr('data-index');
      playerHp = parseInt($('.your-character p.health-points').text());
      // Set the player's attack power equal to the value given in the game.characters array.
      playerAp = game.characters[playerIndex]['Attack Power'];
    }); // end .character click event
  }, // end game.selectYourCharacter()

  // The player selects their opponent.
  selectEnemyCharacter: function() {
    // The clicked image becomes the player's opponent.
    $(document).on('click', '.enemy', function() {
      // When new opponent is chosen, selectNewOpponent = false.
      selectNewOpponent = false;
      // The enemy selected as the opponent is moved to the <div> with id="opponent" under the heading 'Opponent.'
      $('#opponent').append(this);
      // Add class="opponent" to the element that was clicked.
      $(this).addClass('opponent');
      // Change the style of the opponent image with css.
      $(this).css('background-color', '#000').css('color', '#fff');

      // Display a message to the player explaining how to continue the game.
      message.html('Click the attack button to fight.');

      // The click event for selecting an enemy character is finished and removed.
      $(document).off('click', '.enemy');

      // Store the opponent's name, data-index, and health points in variables named opponentName, opponentIndex, and opponentHp.
      opponentName = $('.opponent h2').text();
      opponentIndex = $('.opponent').attr('data-index');// Store the opponent's health points in a variable named opponentHp.
      opponentHp = parseInt($('#opponent p.health-points').text());
      // Set the opponent's counter attack power equal to the value given in the game.characters array.
      opponentCap = game.characters[opponentIndex]['Counter Attack Power'];

      // Clear the .player-log if there is any text displayed.
      $('.player-log').html('');
    }); // end .enemy click event
  }, // end game.selectEnemyCharacter()

  // The player attacks the opponent and the opponent makes a counter attack.
  fight: function() {
    // When the player clicks the attack button, the attack decreases the oppenent's health points and a counter attack decreases the player's health points.
    // The player attacks the opponent and the opponentHp decreases by the value of the player's attack power.
    // Ensure no attack if opponentHp <= 0.
    if($('.opponent').length > 0) {
      opponentHp -= playerAp;
    }

    // Display attack data.
    $('.player-log').html('You attacked ' + opponentName + ' and lowered his health points by ' + playerAp + '.');

    // The player's attack power increases after every attack (attack button click) by the base or original attack power set in the game.characters array.
    // If base is 6 each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on)
    // Player's attack power doesn't increase if opponent's health points are 0 or below.
    if($('.opponent').length !== 0) { // The playerAp is increased before the element is removed and the attack button will no longer increase playerAp or is deactivated.
      originalPlayerAp = game.characters[playerIndex]['Attack Power'];
      playerAp += originalPlayerAp;
    }

    // Opponent makes a counter attack and playerHp decreases. Ensure no counter attack if opponentHp <= 0.
    if(opponentHp > 0) {
      // Opponent counter attacks and the playerHp decreases by the value of the opponent's counter attack power which remains constant throughout the game.
      playerHp -= opponentCap;
    }

    // Display counter attack data.
    $('.opponent-log').html(opponentName + ' counter attacked you and lowered your health points by ' + opponentCap + '.');

    // Update the DOM with the current health points.
    $('.your-character p.health-points').text(playerHp);
    $('#opponent p.health-points').text(opponentHp);
  }, // end game.fight()

  // Determine if the player has won the game.
  checkStatus: function() {
    // If playerHp > 0, there is no opponent, and there are no enemies to fight, the player has won the game.
    if(playerHp > 0 && $('.opponent').length === 0 && $('.enemy').length === 0) {
      // Display the winning game status.
      $('.player-log').text('You Won!!!');

      // Clear the text of the following elements.
      $('#message').html('');
      $('.opponent-log').html('');

      // The click event for the attack / counter attack is finished and removed.
      $(document).off('click', '.attack');

      // Execute game.restart()
      game.restart();
    } // end if(playerHp > 0 && $('.opponent').length === 0 && $('.enemy').length === 0) statement
  }, // end game.checkStatus()

  // Play the game.
  play: function() {
    // Play the game by clicking the attack button.
    $(document).on('click', '.attack', function() {

      // Execute game.fight()
      game.fight();

      // If enemies are available and a new opponent has not been selected before the attack button is clicked, make sure a new opponent is selected before the game resumes.
      if(selectNewOpponent) {
        // Display the game status.
        $('.player-log').html('There is no enemy to fight here. Please select another opponent by clicking a red image from "Enemies to Attack."');
        $('.opponent-log').html('');
        // The click event for the attack / counter attack is finished and removed.
        $(document).off('click', '.attack');

        // Execute the following functions.
        game.selectEnemyCharacter();
        game.play();

      } else {

      // If the player's health points are equal to 0 or below, the player loses the game.
      if(playerHp <= 0) {

      // Display the game status.
      $('.player-log').html('You\'ve been defeated . . . GAME OVER!!!');

      // Clear the text of the following elements.
      $('#message').html('');
      $('.opponent-log').html('');

        // The click event for the attack / counter attack is finished and removed.
        $(document).off('click', '.attack');

        // Execute game.restart
        game.restart();

      }

      // If the opponent's health points are equal to 0 or below, the opponent looses and is removed from the game and the player must choose another enemy to fight if one is present.
      if(opponentHp <= 0 && $('.enemy').length !== 0) {
        // Clear the text of the following elements.
        $('#message').html('');
        $('.opponent-log').html('');

        // Turn off the 'attack' click event and stop health points from being subtracted.
        $(document).off('click', '.attack');

        // Remove the enemy from the opponent <div>.
        $('.opponent').remove();

        // The player must select a new opponent to fight, selectNewOpponent === true.
        selectNewOpponent = true;

        // Display the game status.
        $('.player-log').html('You\'ve defeated ' + opponentName + '! You may choose to fight another opponent by clicking a red image from "Enemies to Attack."');

        // Execute the following functions.
        game.selectEnemyCharacter();
        game.play();

      } // end if(opponentHp <= 0 && $('.enemy').length !== 0) statement
    } // end if(selectNewOpponent) statement

      // Execute game.checkStatus() to determine if the player won.
      game.checkStatus();
    }); // end .attack click event
  }, // end game.play()

  // Restart the game.
  restart: function() {
    // Display the restart button.
    $('.restart').css('display', 'block');
    // When the restart button is clicked, restart the game.
    $(document).one('click', '.restart', function() {
      // Remove the restart button
      $('.restart').css('display', 'none');
      // Execute setUp()
      game.setUp();
      game.selectYourCharacter();
      game.selectEnemyCharacter();
      game.play();
    }); // end .restart click event
  } // end game.restart()

}; // end game object


// The .ready() method accepts a callback function and waits for the DOM to be fully loaded before that function is executed.
// $(document).ready()
$(document).ready(function() {
  // Execute game.setUp()
  game.setUp();
  game.selectYourCharacter();
  game.selectEnemyCharacter();
  game.play();

}); // end document.ready()
