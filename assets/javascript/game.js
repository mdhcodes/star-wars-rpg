// Create objects for each character with properties and values

var characters = {
  "Obi-Wan Kenobi": {
    "name": "Obi-Wan Kenobi",
    "image": "assets/images/obi_wan_kenobi_128x128",
    "Health Points": 120,
    "Attack Power": 0,
    "Counter Attack Power": 8
  },
  "Luke Skywalker": {
    "name": "Luke Skywalker",
    "image": "assets/images/luke_skywalker_128x128",
    "Health Points": 100,
    "Attack Power": 0,
    "Counter Attack Power": 5
  },
  "Darth Sidious": {
    "name": "Darth Sidious",
    "image": "assets/images/darth_sidious_128x128",
    "Health Points": 150,
    "Attack Power": 0,
    "Counter Attack Power": 20
  },
  "Darth Maul": {
    "name": "Darth Maul",
    "image": "assets/images/darth_maul_128x128",
    "Health Points": 180,
    "Attack Power": 0,
    "Counter Attack Power": 25
  }
};


$(document).ready(function() {
  // Display a message to the player explaining how to start the game by clicking an image.
  $('#message').html('Click an image to select your character and start the game.');
  setUp();
}); // end document ready


// Set up the game and populate the DOM with the data in the object characters.
var setUp = function() {
  for(character in characters) {
    $('#character-list').append('<div class="character" id="' + characters[character].id + '">' +
      '<h2> ' + characters[character].name + ' </h2>' +
      '<img src="' + characters[character].image + '" width="128" height="80" alt="' + characters[character].name + '">' +
      '<p class="health-points">' + characters[character]["Health Points"] + '</p>' +
      '</div>'
    );
    // Execute yourCharacter()
    yourCharacter();
  } // end for loop over characters object
}; // end setUp()


// The player selects their character.
var yourCharacter = function() {
  // To start the game the player clicks on an image.
  // The clicked image becomes the player's character.
  $('.character').on('click', function() {
    // The player's character image is moved to the <div> with the ID of player under the heading 'Your Character.'
    $('#player').append(this); // 'this' refers to the <div> / image that was clicked.
    // Add the class 'your-character' to the element that was clicked.
    $(this).addClass('your-character');
    // All the other images / characters become the enemies and are moved to the <div> with the ID of enemies under the heading 'Enemies to Attack.'
    // Add class 'enemy' to each image in the <div> element with the ID of enemies. Change the style of each image with css.
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
  $('#message').html('Click a red image from \'Enemies Available to Attack\' to select your opponent.');
  // The clicked image becomes the player's opponent.
  $('.enemy').on('click', function() {
    // The enemy selected as the opponent is moved to the <div> with the ID of defender under the heading 'Defender.'
    $('#defender').append(this);
    // Add the class 'defender' to the element that was clicked.
    $(this).addClass('defender');
    // Change the style of the defender image with css.
    $(this).css('background-color', '#000').css('color', '#fff');
    // The click event for selecting a character is finished and removed.
    $('.enemy').off();
    // Execute matchCharacter()
    matchCharacter();
  }); // end .enemy click event anonymous function
}; // end enemyCharacter()


// Match the selected player and defender with the characters in the object characters.
var matchCharacter = function() {
  // Get the player's name
  var playerName = $('.your-character h2').text();
  console.log("Player: " + playerName);
  //Get the defender's name
  var defenderName = $('.defender h2').text();
  console.log("Defender: " + defenderName);
    // Match playerName to the object with the same name.
    if (playerName === " Obi-Wan Kenobi ") { // (playerName !== "Obi-Wan Kenobi")
      var playerHp = characters["Obi-Wan Kenobi"]["Health Points"];
      var playerAp = characters["Obi-Wan Kenobi"]["Attack Power"];
    } else if(playerName === " Luke Skywalker ") {
      var playerHp = characters["Luke Skywalker"]["Health Points"];
      var playerAp = characters["Luke Skywalker"]["Attack Power"];
    } else if(playerName === " Darth Sidious ") {
      var playerHp = characters["Darth Sidious"]["Health Points"];
      var playerAp = characters["Darth Sidious"]["Attack Power"];
    } else {
      var playerHp = characters["Darth Maul"]["Health Points"];
      var playerAp = characters["Darth Maul"]["Attack Power"];
    }
    // Match playerName to the object with the same name.
    if (defenderName === " Obi-Wan Kenobi ") {
      var defenderHp = characters["Obi-Wan Kenobi"]["Health Points"];
      var defenderCap = characters["Obi-Wan Kenobi"]["Counter Attack Power"];
    } else if(defenderName === " Luke Skywalker ") {
      var defenderHp = characters["Luke Skywalker"]["Health Points"];
      var defenderCap = characters["Luke Skywalker"]["Counter Attack Power"];
    } else if(defenderName === " Darth Sidious ") {
      var defenderHp = characters["Darth Sidious"]["Health Points"];
      var defenderCap = characters["Darth Sidious"]["Counter Attack Power"];
    } else {
      var defenderHp = characters["Darth Maul"]["Health Points"];
      var defenderCap = characters["Darth Maul"]["Counter Attack Power"];
    }
    // Execute attack()
    attack();
}; // end matchCharacter()


var attack = function() {
  // Display a message to the player explaining how to continue the game.
  $('#message').html('Click the attack button to fight.');
  // Match playerName with data from the characters object with the same name.
  var playerName = $('.your-character h2').text();
  // Match defenderName with data from the characters object with the same name.
  var defenderName = $('.defender h2').text();

    if (playerName === " Obi-Wan Kenobi ") {
      var playerHp = characters["Obi-Wan Kenobi"]["Health Points"];
      var playerAp = characters["Obi-Wan Kenobi"]["Attack Power"];
      var playerCap = characters["Obi-Wan Kenobi"]["Counter Attack Power"];
    } else if(playerName === " Luke Skywalker ") {
      var playerHp = characters["Luke Skywalker"]["Health Points"];
      var playerAp = characters["Luke Skywalker"]["Attack Power"];
      var playerCap = characters["Luke Skywalker"]["Counter Attack Power"];
    } else if(playerName === " Darth Sidious ") {
      var playerHp = characters["Darth Sidious"]["Health Points"];
      var playerAp = characters["Darth Sidious"]["Attack Power"];
      var playerCap = characters["Darth Sidious"]["Counter Attack Power"];
    } else {
      var playerHp = characters["Darth Maul"]["Health Points"];
      var playerAp = characters["Darth Maul"]["Attack Power"];
      var playerCap = characters["Darth Maul"]["Counter Attack Power"];
    }

    if (defenderName === " Obi-Wan Kenobi ") {
      var defenderHp = characters["Obi-Wan Kenobi"]["Health Points"];
      var defenderCap = characters["Obi-Wan Kenobi"]["Counter Attack Power"];
    } else if(defenderName === " Luke Skywalker ") {
      var defenderHp = characters["Luke Skywalker"]["Health Points"];
      var defenderCap = characters["Luke Skywalker"]["Counter Attack Power"];
    } else if(defenderName === " Darth Sidious ") {
      var defenderHp = characters["Darth Sidious"]["Health Points"];
      var defenderCap = characters["Darth Sidious"]["Counter Attack Power"];
    } else {
      var defenderHp = characters["Darth Maul"]["Health Points"];
      var defenderCap = characters["Darth Maul"]["Counter Attack Power"];
    }

    // The player can click the attack button to attack the opponent.
    $('.attack').on('click', function() {
      // Display an attack message if there is one.
      if($('.attack-message')) {
        $('.attack-message').html('');
      }

    // When the attack button is clicked, the player's HP will decrease by the defender's attackPower.
    playerHp -= defenderCap;
    console.log("Player Hp: " + playerHp);
    // Update the health points below the player's image.
    $('.your-character .health-points').text(playerHp);

    // When the attack button is clicked, the defender's HP will decrease by the player's attackPower.
    // The player's attackPower will increase by their counter attack value each time the attack button is clicked.
    defenderHp -= (playerAp += playerCap);
    console.log("Defender Hp: " + defenderHp);
    // Update the health points below the defender's image.
    $('.defender .health-points').text(defenderHp);

    // Add a message that explains every attack and health point calculation.
    // Create a new <p> element.
    var p = $('<p class="attack-message">');
    // Append the <p> element to the end of the <div> with the ID of defender.
    $('#defender').append(p);
    // Add the content to the <p> element.
    p.html('You attacked ' + defenderName + ' reducing his health by ' + playerAp + ' points. <br>' + defenderName + ' counter attacked you reducing your health by ' + defenderCap + ' points.');

    // If the player's health points are less than or equal to zero, the game ends.
    if(playerHp <= 0) {
      // Hide initial message to the player.
      $('#message').html('');
      console.log(playerName + " HP is " + playerHp);
      // Attack button click event is turned off.
      $('.attack').off();
      // Update the attack message.
      p.html('You\'ve been defeated . . . GAME OVER!');
      // Create a new <button> element.
      var button = $('<button class="restart">');
      // Add the content to the <button> element.
      button.html('Restart');
      // Append the restart button to the end of the <div> with the ID of defender.
      $('#defender').append(button);

      // If restart is clicked, the game will reset and start again.
      $('.restart').on('click', function() {
        // Remove the elements with the classes your-character, enemy and defender.
        $('.your-character').remove();
        $('.enemy').remove();
        $('.defender').remove();
        // Execute setUp()
        setUp();
        // The click event for restarting the game is finished and removed.
        $('.restart').off();
        // Remove the restart <button> element.
        $('.restart').remove();
        // Remove the attack message.
        $('.attack-message').text('');
      }); // end .restart click event anonymous function
    } // end if(playerHp <= 0)

    // If the defender's HP is less than or equal to 0, the character disappears and the player can select a new enemy.
    if(defenderHp <= 0) {
      // Hide initial message to the player.
      $('#message').html('');
      console.log(defenderName + " HP is " + defenderHp);
      // When the defender's HP is reduced to zero or below, remove the enemy from the defender area.
      $('.defender').remove();
      // Keep track of player's current attackPower
      //playerApNextGame = playerAp;
      //console.log(typeof playerApNextGame);
      // The click event for attack is finished and removed.
      $('.attack').off();
      // Update the attack message.
      p.html('You\'ve defeated' + defenderName + '. You can choose to fight another enemy.').css('margin-top', '180px');
      // If the attack button is pressed again, inform player that there is 'No enemy here.'
      $('.attack').on('click', function() {
        p.html('No enemy here.');
      });

      // The player can click an .enemy character to select the next opponent.
      $('.enemy').on('click', function() {
          // Clear the attack message and move it back to its original position.
          p.html('').css('margin-top', '0');
          // Move the clicked .enemy element to the <div> with the ID of defender.
          $('#defender').append(this);
          // Add the class 'defender' to the element that was clicked.
          $(this).addClass('defender');
          // Change the style of the defender image with css.
          $(this).css('background-color', '#000').css('color', '#fff');
          // The click event for enemy is finished and removed.
          $('.enemy').off();

          //console.log("Before matchCharacter " + playerApNextGame);

          // Execute matchCharacter()
          matchCharacter();
      }); // end .enemy click event anonymous function
    } // end if(defenderHp <= 0)
  }); // end .attack click event anonymous function
}; // end attack()
