var start = function() {
  
  //Displays output on home page
  output("Welcome to the Voidzone! <br /><br />" +
    "Click on the VoidZone button above to enter.<br />");

  //prompts player for their name
  var getName = function() {
    player.name = prompt("Looks like we have fresh meat! Stranger what is your name?");
  }
  getName();

  //checks if the user has pressed the start button
  var ifPlayerName = function() {
    parent = document.getElementById("container");
    child = document.getElementById("start");

    parent.removeChild(child);
  }
  ifPlayerName();
};

//sets output to the txt on screen
var output = function(txt) {
  document.getElementById("game").innerHTML = txt;
};

add_output = document.getElementById("game");

//holds player locations visited
var first_vs_visit = 0;
var unlocked_battle = 0;

/****Player Information****/

var player = {
  name: "Unknown",
  
  location: voidZone,

  health: 100,

  strength: 2,

  soul: 0,

  abilities: [],
  
  hasHealth: function () {
    if(this.health < 0){
      this.health = 0;
    }
  }
};

/****End of player information****/

/****Voidzone****/

var voidZone = function() {
  //clears the game screen upon visit
  var clearUponVisit = function() {
    add_output.innerHTML = "";
  }
  clearUponVisit();

  //runs the first time the player enters voidzone
  var checkFirstVisit = function() {
    if (first_vs_visit === 0) {
      player.soul += 15;
      output("You enter total darkness but see light in the<br/> " + 
        "distance.<br /><br />" + "You see some floating light and touch it.<br />" +
        "You feel the light being absorbed into your<br />" +
        "hand!<br /><br />" +
        "Obtained 15 souls!<br><br>");

      first_vs_visit += 1;

    }
  }
  checkFirstVisit();

  //displays header text when you enter the voidzone
  var displayHeaderText = function() {
    add_output.innerHTML += "You step into the Voidzone, its complete<br />" +
      "darkness surrounded by light. <br /><br />";
  }
  displayHeaderText();

  if (first_vs_visit == 1) {
    add_output.innerHTML += "<button style='padding: 2em;' class = 'gameButton' onClick = 'theShop()'>Proceed in the Voidzone</button> <br/>";
  }

  //checks if the player own an ability if they do the battle arena unlocks
  var checkPlayerAbilities = function() {

    if (player.abilities.length >= 1 && unlocked_battle === 0) {
      document.getElementById("battleButton").style.display = "inline-block";

      add_output.innerHTML += "<br>*UPDATE*<br>";
      add_output.innerHTML += "<br>After learning a ability from the demon you <br />" +
      "approach a arena.<br><br>";
      add_output.innerHTML += "Time to use your new abilities and fight your <br />" +
      "way out.<br><br>";
      add_output.innerHTML += "*You unlocked the battle arena.*<br>";
      unlocked_battle += 1;
    }
  }
  checkPlayerAbilities();

};
/****End of Voidzone****/

/****Enemy infomration****/

enemies = [
  {
    id: 0,
    name: "Crazy Imp",
    
    health: 50,
    power: 4,
      
    soul: 30,
    strength: 1,
    
    speech: "I will defeat you! For Master!"
  },
  {
    id: 1,
    name: "Ranger Ildrieth",
    
    health: 120,
    power: 4,
      
    soul: 25,
    strength: 3,
    
    speech: "You shall feel the strength of my arrows!"
  },
  {
    id: 2,
    name: "Shadow Knight Silvera",
    
    health: 280,
    power: 3,
      
    soul: 50,
    strength: 10,
    
    speech: "I will show you true darkness!"
  },
  {
    id: 3,
    name: "Dark Lord Sethadis",
    
    health: 990,
    power: 10,
      
    soul: 500,
    strength: 35,
    
    speech: "You will never escape! You will die here!"
    
  }
];
/****End of enemy information****/

/****Battle Functions****/

var battleWorld = function (enemyID) {
    //checks player if they have less than 1 health, if so health = 0;
    player.hasHealth();
  
    var gameScreen = document.getElementById("game");
    gameScreen.innerHTML = "";
        
    //if player is in Battle
    if(player.inBattle && enemyID != undefined){
        
        userInBattle(enemyID);
        
    } 
    
    //if not in battle
    else {
        
        //creates holding divs
        var displaySelectScreen = function () {
            gameScreen.innerHTML += "<div id='select'>SELECT OPPONENT</div>";
            gameScreen.innerHTML += "<br /> <div id='opponentList'></div>"
        };
        displaySelectScreen();
        
        //generates opponent buttons and inBattle function
        var generateOpponents = function () {
            var opponentDiv = document.getElementById("opponentList");
            
            for(var i = 0; i<enemies.length; i++){
                opponentDiv.innerHTML += "<br /><br /><button style ='padding: 0.8em; 'onClick = 'inBattle("+enemies[i].id+")' class = 'enemyButtons'>"+enemies[i].name+"<br /> Level: "+enemies[i].health/10+"</button>";
            }
        };
        generateOpponents();
        
        inBattle = function (enemyID) {
            player.inBattle = true;
            
            //sends enemyID to battleworld
            battleWorld(enemyID);
        
        }
    
    };
    
    //User in battle
    userInBattle = function(enemyID){
        var gameScreen = document.getElementById("game");
        var enemy = enemies[enemyID];
        
        
        //creates battle screen
        var displayBattleScreen = function () {
            gameScreen.innerHTML += "*BATTLE MODE*";
            gameScreen.innerHTML += "<div 'abilitiesAvailable'></div>";
        }
        displayBattleScreen();
        
        //display enemy information
        var displayEnemy = function (id) {
            gameScreen.innerHTML += "<br /><br />Fighting: " + enemy.name;
            gameScreen.innerHTML += "<br /><br /><div id = 'enemyHealthBar'></div>";
            gameScreen.innerHTML += "<div id = 'enemyHealth'></div>";
            gameScreen.innerHTML += "<br /> \"" + enemy.speech +"\"";
            
        }
        displayEnemy(enemyID);
        
        //display player information
        var displayPlayerInfo = function () {
            
            var createPlayerHealthBar = function (){
                gameScreen.innerHTML += "<div id = 'playerHealthBar'></div>";
                gameScreen.innerHTML += "player health";
                healthBar = document.getElementById("playerHealthBar");
                if(player.health > 0){
                healthBar.style.width = player.health+'%';
                } else {
                healthBar.style.width = 1 + '%';
                }
                healthBar.style.height = 2+'%';
                healthBar.style.borderRadius = '15px 15px'
                
                healthBar.style.margin = 'auto'
                
                healthBar.style.backgroundColor = 'lime';
                
                healthBar.style.display = 'block';
                
            }
            createPlayerHealthBar();
            
            
        };
        displayPlayerInfo();
        
        //creates abilites buttons
        var displayAbilitiesAvailable = function(){
        gameScreen = document.getElementById("game");
        gameScreen.innerHTML += "<br />";
          //creates enemy HealthBar
          var createEnemyHealthBar = function (){
            var enemyHealthBar = document.getElementById('enemyHealthBar');

            enemyHealthBar.style.height = 2+'%';
            enemyHealthBar.style.borderRadius = '15px 15px'

            enemyHealthBar.style.margin = 'auto'

            enemyHealthBar.style.backgroundColor = 'red';

            enemyHealthBar.style.display = 'block';
          }
          createEnemyHealthBar();
        
        //Updating battle information per click on abilites buttons
        for(var x in player.abilities){
            gameScreen.innerHTML += "  <button style = 'padding: 1em;' onClick = 'updateBattleInformation("+player.abilities[x].id+")'>"+player.abilities[x].name+"<br />Attack Damage: "+player.abilities[x].power+"</button>";
        }

        };
        displayAbilitiesAvailable();
        
        //setting length of healthbar
        healthBar = {
            length: 50,
        }
        
        // Storing current enemy information
        currentEnemyInfo = {
            health: enemies[enemyID].health,
            max_health: enemies[enemyID].health,
            power: enemies[enemyID].strength,
            
            soul: enemies[enemyID].soul,
            strength: enemies[enemyID].strength
        }
        
        //Getting abilites information for ability buttons
        updateBattleInformation = function(abilityID){

            var playerDamage = abilityList[abilityID].power*(player.strength/10);
            var playerHealth = player.health;
            var max_health = currentEnemyInfo.max_health;

            
            var enemyHealth = currentEnemyInfo.health;
            var enemyPower = currentEnemyInfo.power;
            
            //updated enemy health
            enemyHealth -= playerDamage; 
            
            //updated player health
            playerHealth -= enemyPower; 
          
  
            
            //if enemey or player hits 0 health
            if(enemyHealth <= 0){
                playerWin(currentEnemyInfo.soul, currentEnemyInfo.strength);
            } 
            else if (playerHealth <= 0){
                player.health = 0;
                playerLost();
            }
            
            
            //Enemey health bar update
            if(document.getElementById("enemyHealthBar")){
                         document.getElementById("enemyHealthBar").style.maxWidth = '100%';
            document.getElementById("enemyHealthBar").style.width = (enemyHealth/max_health)*100 + "%";
            }
            
            currentEnemyInfo.health -= playerDamage;
            player.health = playerHealth;

            
            //Player health bar update
            if(playerHealth >= 0 && document.getElementById('playerHealthBar')){
            if(playerHealth){
            document.getElementById('playerHealthBar').style.width = player.health + '%';
            } else{
            document.getElementById('playerHealthBar').style.width = 1 + '%';
            }
            }
        }
        
    }
    
    //Player wins
    var playerWin = function (soul, strength) {
        document.getElementById("game").innerHTML = "Congratulations you won! <br /> soul: " + soul + " - strength: " + strength;
        document.getElementById("game").innerHTML += "<br /> <button style='padding: 2em;' onClick = 'battleWorld()'>Return</button>";

   
        player.soul += soul;
        player.strength += strength;
        
        player.inBattle = false;
    };
    
    //Player loses
    var playerLost = function () {
        gameScreen = "";
      
        document.getElementById("game").innerHTML = "You lost...";
        document.getElementById("game").innerHTML += "<br/ ><button style ='padding: 1em;' onClick = 'battleWorld()'>Return</button>";
        
        player.inBattle =false;
        console.log("You lost");
    }

}
/****End of battle functions****/

//Creates Stats button
displayStats = function() {
  clearGameWindow();
  var hold = [];
  for (var i = 0; i < player.abilities.length; i++) {
    hold.push(" " + player.abilities[i].name)
  };
  //Diplays stat information
  output(
    "Name: " + player.name + "<br/>" +
    "Strength: " + player.strength + "<br>" +
    "Souls: " + player.soul + "<br>" +
    "Health: " + player.health + "<br />"+
    "Abilities: " + hold
  );
};

//clears text from game
var clearGameWindow = function() {
  document.getElementById("game").innerHTML = "";
};

//displays shop button
theShop = function() {

  if (first_vs_visit == 1) {
    document.getElementById("shopButton").style.display = "inline-block";
    first_vs_visit += 1;
  
  clearGameWindow();
  //displays output
  output("While procceeding through the voidzone you see <br />" +
    "chained up demon. <br /><br />" +
    "Hello stranger I sense you have souls, I will <br />" +
    "teach you great abilities in exchange for your <br />" +
    "souls. <br /><br />" +
    "Please approach and see what abilities I can <br />" +
    "teach.");
  add_output.innerHTML += "<br /><br />*UPDATE*";

  add_output.innerHTML += ("<br /><br /> You unlocked the Armory!");
  }

};


/****Shop Functions****/

var shopWorld = function () {
  //sets the player locations to the armory
  if(player.location != "theShop"){
    player.location = 'theShop';
  }
  
  //if player location is set to shopWorld 
  console.log(player.location);
  
  var shop = document.getElementById("game");
  var clearShop = function () {shop.innerHTML = "";}
  clearShop();
  
  if(player.location === "theShop"){
    var shop = document.getElementById("game");
    var abilities = abilityList;
        
    //display soul
    shop.innerHTML += "<div id ='shopsoul'>Souls: "+player.soul+"</div><br />";
    
    
    //display each ability
    for(var x in abilities){
      console.log(player.abilities[x]);
        if(player.abilities[x] == undefined){
        shop.innerHTML += "   <button onclick='purchase("+x+")'style='padding: 0.3em; font-size: 80%; font-family: Monospace;'>"+abilities[x].name+"<br /> Damage: "+abilities[x].power+"<br />Cost: "+abilities[x].cost+"</button>";
        }
      
    }
    
    //setting style for font red for warning player if they dont have enough green if its all good.
    game.innerHTML += "<br /><div style='font-size: 80%;' id = 'warning'></div>";
    game.innerHTML += "<br /><div style='color: lime;' id='allGood'></div>";
    
    //if player selects an ability then this runs and if player owns the ability then it displays results
    purchase = function (id) {
      var warning = document.getElementById('warning');
      var allGood = document.getElementById('allGood');
      var shopsoul = document.getElementById('shopsoul');
      
      //if player owns more than 1 ability check and see if player already owns the ability
      checkIfOwned = function () {
        for(var x in player.abilities){
          if(player.abilities[x].id == abilityList[id].id){
            //break is here so console doesn't log, was having issues with undefined
            return false;
            break;
          }
        }
        return true;
      };
      checksoul = function () {
        if(player.soul < abilityList[id].cost){
          return false;
        }
        return true;
      }
      
      
      if(!checkIfOwned()){
        
        warning.innerHTML = "Sorry, you already own " + abilityList[id].name;
        allGood.innerHTML = "";
        
      } else if (!checksoul()) {
        warning.innerHTML = "Sorry you don't have enough souls to purchase " + abilityList[id].name;
        allGood.innerHTML = "";
      }
      else {
        //displays green text
        allGood.innerHTML = "You purchased " + abilityList[id].name
    
        //player.soul - ability cost
        player.soul -= abilityList[id].cost;   
        
        //soul updates
        shopsoul.innerHTML = "Souls : " + player.soul;
      
        //ability bought will push to player abilities
        player.abilities.push(abilityList[id]);
      }
      
      
    }
    
    //creates a div for health and everything health display goes here
    var displayHealthShop = function () {
      game.innerHTML += "<div id = 'healthUpdate'>Health: " + player.health + "</div>";
      game.innerHTML += "<br /><div id = 'healShop'></div>";
      var healthDiv = document.getElementById('healShop');
           
      healthDiv.innerHTML += "<button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(25, 5)'>Heal: 25 Health<br />Cost: 5 Souls</button>";
      
      healthDiv.innerHTML += "   <button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(50, 10)'>Heal: 50 Health<br />Cost: 10 Souls</button>";
      
      healthDiv.innerHTML += "   <button style = 'font-family: monospace; padding: 0.2em;' onclick='buyHealth(100, 30)'>Heal: 100 Health<br />Cost: 30 Souls</button>";
      
         if(player.health >= 100){
        document.getElementById('healShop').style.display = "none";
      }
      
    }
    displayHealthShop();
  }
  
  //buy health
  buyHealth = function (health, cost) {
     
    //checks if player has max health or no health
    //if player has soul and doesn't exceed health
    if((player.health+health) <= 100 && player.soul >= cost){
      
      player.health += health;
      player.soul -= cost;
      
      
      document.getElementById('allGood').innerHTML = "Health +" + health;
      document.getElementById('healthUpdate').innerHTML = "Health: " + player.health;
      
    }
    //if player has less soul or health
    else {
      //less soul
      if(player.soul < cost){
        document.getElementById('warning').style.color = 'red';
      document.getElementById('warning').innerHTML = "<br />Souls: " + player.soul + " - purchase something less than " + cost + " souls...";
      } 
      //less health
      else{
      document.getElementById('warning').style.color = 'red';
      document.getElementById('warning').innerHTML = "<br />Health: " + player.health + " - purchase something less than " + health + " health...";
      }
    }
    
    }
  
};
/****End of Shop Functions****/

/****Abilities****/

var Ability = function(id, name, type, power, stamina_cost, cost, text) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.power = power;
  this.cost = cost;
  this.text = text; 
  
  this.checkStamina = function () {
    if(player.stamina < this.stamina_cost){
      console.log("Sorry you don't have enough power to use this!");
      this.power = 0;
    };
  }
};

abilityList = [
//(ID, name, type, power, stamina cost, cost, text)
new Ability(0, "Soul fire", "fire", 10, 3, 15, "You channel flames!"),
new Ability(1, "Soul Spike", "ice", 10, 2, 15, "You shoot many ice shards!"),
  new Ability(2, "Soul Absorb", "item", 20, 10, 40, "Small wand made out of darkness *Absorbs souls to do damage*"),
  new Ability(3, "Soul Eater", "item", 40, 1, 45, "Scythe that eat souls *slice and hollow*")
  ];
  
/****End of Abilites****/

document.getElementById('game').style.overflow = 'hidden';