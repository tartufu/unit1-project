

// ------------ MECHANICS SECTION ----------///
function diceRoll() {
    return (Math.floor(Math.random() * Math.floor(6)) + 1);
    //D6 Roll essentially. it rolls between 0 to 5, therefore you add a +1 to result;
}

function scoreCount() {
    var score = player.stamina + player.health + (player.defeated * 3) + (player.potions * 2);
    battleResult.innerHTML = `Your total score is ${score}!`
    attackButton.removeEventListener('click', attack);
    speedAttackButton.removeEventListener('click', speedAttack);
    potionButton.removeEventListener('click', potionUse);
    staminaButton.removeEventListener('click', staminaUse);
    return score;
} // this is called at the end of the game or when player.health === 0, buttons cannot be clicked after game ends.

function monsterKilled() {
    this.status = 'dead';
    enemyCount--;
    player.defeated++;
    spawnMonster();
}

function attackFailed() {
    player.health--;
    player.checkDead();
}

function checkEnemies() {
    remainingEnemies = enemyArray.filter(function (arr) {
        if (arr.status === 'alive') {
            return arr
        } ;
    }); // this filters out enemies that are dead.
}

function shakeScreen() {
    document.body.classList.add("shake");
    setTimeout(function() {
        document.body.classList.remove("shake");
    }, 500);
}; //this shakes the screen, when attack buttons are pressed for more player visual impact.

function healScreen() {
    var playerImage = document.getElementById("player-image");
    playerImage.classList.add("heal");
    setTimeout(function() {
        playerImage.classList.remove("heal");
    }, 500);
}

// -------- END OF MECHANICS SECTION ---------- //


//--------------- PLAYER CHARACTER SECTION ------------- //
var player = {
    name: "player",
    health: 3,
    stamina: 7,
    potions: 3,
    defeated: 0,
    score: 0,
    roll: 0,

    attack: function() {
        if (player.stamina > 0){
            player.roll = diceRoll();
            this.stamina--;
            return player.roll;
        } else {
            player.roll = diceRoll();
            this.health--;
            return player.roll;
            player.checkDead();
        } // if there's not enough stam, player uses health as resource
    },

    speedAttack: function() {
        if (player.stamina > 1 ) {
            player.roll = (2 * diceRoll());
            this.stamina-=2;
            return player.roll;
        } else {
            player.roll = (2 * diceRoll());
            this.health-=2;
            return player.roll;
            player.checkDead();
        } // if there's not enough stam, player uses health as resource

    }, //uses 2 stamina to roll 2D6

    restoreHealth: function() {
        if (player.potions === 0) {
           battleResult.innerHTML = `You don't have any potions left!`;
           return;
        } else {
            this.potions --;
            battleResult.innerHTML = `You restored 1 health!`;
            this.health++;
        }

        if (this.health > 3) {
            this.health = 3;
        } //this sets a max cap on health
    },

    restoreStamina: function() {
        if (player.potions === 0) {
           battleResult.innerHTML = `You don't have any potions left!`;
           return;
        } else {
            this.potions --;
            var potBoost = (Math.floor(Math.random() * Math.floor(3)) + 2) //ensures minimum stam is 2, max stam is 5.
            battleResult.innerHTML = `You restored ${potBoost} stamina!`;
            this.stamina+=potBoost;
        }

        if (this.stamina > 7) {
            this.stamina = 7;
        } //this sets a max cap on stamina
    },

    checkDead: function() {
        if (this.health <= 0) {
            var youDied = document.getElementById('title');
            youDied.innerHTML = "YOU DIED";
            youDied.style.fontSize = "200px";
            youDied.style.color = "red";
            youDied.style.position = "relative";
            youDied.style.top = "400px";
            youDied.style.zIndex = "5";
            var body = document.body;
            body.style.position = "relative";
            body.style.bottom = "200px";  //You died Font is shifted down, body is shifted upwards
            scoreCount();
        } // this is called after every event where health is deducted, it stops the game.
    },

};
// -------------- END OF PLAYER CHARACTER SECTION --------------//


// ---------------MONSTER SECTIION------------- //

var monsterDescription = document.getElementById('monster-ability');
var battleResult = document.getElementById('battle-result');

// this is the blue print for the monsters in the dungeon
class Monster {
    constructor(name,difficulty, image,dmg) {
        this.name = name;
        this.difficulty = difficulty;
        this.image = image;
        this.status = 'alive';
    }

    flee() {
        if (diceRoll() > 3) {
            battleResult.innerHTML = `You successfully escape! A new monster blocks your path!`;
            this.status = 'dead';
            enemyCount--;
            player.stamina --;
            spawnMonster();
        } else {
            player.roll = diceRoll();
            battleResult.innerHTML = `You failed to escape! You suffer 1 point of damage!`
            player.health--;
        }
    }
}

class Goblin extends Monster {
        constructor(name,difficulty, image, ability) {
        super(name, difficulty,image,status); //super inherits from its parent class.
        this.ability = ability;
    }

    attack() {
         if (player.attack() >= this.difficulty) {
            if (player.roll < 4 ) {
                player.health--;
                player.checkDead();
            };
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();
        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }

    speedAttack() {
         if (player.speedAttack() >= this.difficulty) {
            if (player.roll < 4 ) {
                player.health--;
            };
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();
        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }
}

//Orc class is fast, so every attack consumes 1 extra stamina.
class Orc extends Monster {
    constructor(name,difficulty, image, ability) {
        super(name, difficulty,image,status);
        this.ability = ability;
    }

    attack() {
         if (player.attack() >= this.difficulty) {
            player.stamina --;
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();
        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            player.stamina --;
            attackFailed();
        }
    }

    speedAttack() {
         if (player.speedAttack() >= this.difficulty) {
            player.stamina --;
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
            monsterKilled()

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            player.stamina --;
            attackFailed();
        }
    }
}

// Minotaur class is brutal, so it does 2 dmg to player health.
class Minotaur extends Monster {
    constructor(name,difficulty, image, ability) {
        super(name, difficulty,image,status);
        this.ability = ability;
    }

    attack() {
         if (player.attack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 2 damage!`;
            player.health--;
            attackFailed();
        }
    }

    speedAttack() {
         if (player.speedAttack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 2 damage!`;
            player.health--;
            attackFailed();
        }
    }
}

// tortoise class is armored, so its impervious to speed attacks.
class Tortoise extends Monster {
    constructor(name,difficulty, image, ability) {
        super(name, difficulty,image,status);
        this.ability = ability;
    }

    attack() {
         if (player.attack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
            this.status = 'dead';
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }

    speedAttack() {
         if (player.speedAttack() - 12 >= this.difficulty) {
            player.roll = player.roll - 12;
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            player.roll = player.roll - 12;
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }

    flee() {
            battleResult.innerHTML = `You successfully escape! A new monster blocks your path!`;
            this.status = 'dead';
            enemyCount--;
            player.stamina --;
            spawnMonster();
    }
}

//Slime doesnt have any special abilities
class Slime extends Monster {
    constructor(name,difficulty, image, ability) {
        super(name, difficulty,image,status);
        this.ability = ability;
    }

    attack() {
         if (player.attack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }

    speedAttack() {
         if (player.speedAttack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! A new monster blocks your path!`;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }
}

class Mimic extends Monster {
    constructor(name,difficulty, image, ability) {
        super(name, difficulty,image,status);
        this.ability = ability;
    }

    attack() {
         if (player.attack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! You found a potion! A new monster blocks your path!`;
            player.potions++;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }

    speedAttack() {
         if (player.speedAttack() >= this.difficulty) {
            battleResult.innerHTML = `You rolled a ${player.roll}! ${this.name} defeated! You found a potion! A new monster blocks your path!`;
            player.potions++;
                this.status = 'dead';
                enemyCount--;
                player.defeated++;
                spawnMonster();

        } else {
            battleResult.innerHTML = `You rolled a ${player.roll} but failed to defeat it! You took 1 damage!`;
            attackFailed();
        }
    }
}

// generates monsters from classes by giving them names and difficulty
const goblin = new Goblin('Goblin', 1, "images/goblin.png", "Bomber: Roll above 4 or suffer 1 dmg!");
const goblin2 = new Goblin('Goblin2', 1, "images/goblin.png", "Bomber: Roll above 4 or suffer 1 dmg!");
const orc = new Orc('Orc', 3, "images/orc.png", "Fast: You consume 1 extra stam per attack!");
const orc2 = new Orc('Orc2', 3, "images/orc.png", "Fast: You consume 1 extra stam per attack!");
const minotaur = new Minotaur('Minotaur', 4, "images/minotaur.png", "Brutal: It does 2 dmg when it attacks!");
const minotaur2 = new Minotaur('Minotaur2', 4, "images/minotaur.png", "Brutal: It does 2 dmg when it attacks");
const mimic = new Mimic('Mimic', 6, "images/mimic.png", "Booty: A dangerous foe, but teeming with potential riches");
const mimic2 = new Mimic('Mimic2', 6, "images/mimic.png", "Booty: A dangerous foe, but teeming with potential riches");
const slime = new Slime('Slime', 5, "images/slime.png", "Hardy: This monster is not strong but requires effort to take down!");
const slime2 = new Slime('Slime2', 5, "images/slime.png", "Hardy: This monster is not strong but requires effort to take down!");
const tortoise = new Tortoise('Tortoise', 4, "images/tortoise.png", "Armored: This monster is impervious to speed attacks!");
const tortoise2 = new Tortoise('Tortoise2', 4, "images/tortoise.png", "Armored: This monster is impervious to speed attacks!");


var enemyArray = [goblin, goblin2, orc, orc2, minotaur, minotaur2, mimic, mimic2, slime, slime2, tortoise, tortoise2];

var enemyCount = enemyArray.length;

let remainingEnemies = enemyArray.filter(function (arr) {
    if (arr.status === 'alive') {
        return arr
    } ;
}); // this filters out enemies that are dead.

var currentEnemy = remainingEnemies[Math.floor(Math.random() * remainingEnemies.length)];
// chooses from monsters that are still alive.

//---------------END OF MONSTER SECTION------------------//


// --------------THIS IS BUTTON SECTIONS------------------ //
function playerStatsWeb() {
  var playerHealth = document.getElementById('player-health');
  playerHealth.innerHTML = "❤️ Health: " + player.health;

  var playerStamina = document.getElementById('player-stamina');
  playerStamina.innerHTML = "⚡ Stamina: " + player.stamina;

  var playerPots = document.getElementById('player-potion');
  playerPots.innerHTML = "🧪 Potions: " + player.potions;

  var playerMonsters = document.getElementById('remaining-monsters');
  playerMonsters.innerHTML = "👹 Enemies: " + (remainingEnemies.length - 1); // game ends when there's only 1 monster left.
} //this is run after every scene to update the screen.
playerStatsWeb();

// this section buttons have a removeEventListener that's tagged to scoreCount()
// this section buttons havec an addEventListener that's tagged to spawnmonster();

var attack = function() {
    currentEnemy.attack();
    playerStatsWeb();
    shakeScreen();
}
var attackButton = document.getElementById('atk-btn');

var speedAttack = function() {
    currentEnemy.speedAttack();
    playerStatsWeb();
    shakeScreen();
};
var speedAttackButton = document.getElementById('spd-atk-btn')

var potionUse = function() {
    player.restoreHealth();
    playerStatsWeb();
    healScreen();
}
var potionButton = document.getElementById('pot-btn');

var staminaUse = function() {
    player.restoreStamina();
    playerStatsWeb();
    healScreen();
}
var staminaButton = document.getElementById('stam-btn');

var fleeRoll = function() {
    console.log("TEST");
    currentEnemy.flee();
    playerStatsWeb();
}
var fleeButton = document.getElementById('flee-btn');
//------------END OF BUTTONS SECTION------------------- //


//------------GAME STARTING ------------//

function spawnMonster() {

    // the game buttons are here due to start screen, these buttons will only work once player clicks the door.
    attackButton.addEventListener('click', attack);
    speedAttackButton.addEventListener('click', speedAttack);
    potionButton.addEventListener('click', potionUse);
    staminaButton.addEventListener('click', staminaUse);
    fleeButton.addEventListener('click', fleeRoll);

    var body = document.querySelector(".monster-screen");
    body.style.backgroundImage = "url(images/dungeon-bg.jpg)"
    // this changes the background to inner dungeon bg once door is clicked.
    var monsterName = document.getElementById('monster-name');
    var monsterImage = document.getElementById('monster-image');
    checkEnemies();
    currentEnemy = remainingEnemies[Math.floor(Math.random() * remainingEnemies.length)]; // this refactors the variable so that it only chooses from the new filtered array.
    console.log(remainingEnemies);
    monsterName.innerHTML = currentEnemy.name;
    monsterDescription.innerHTML = `${currentEnemy.name} has a difficulty of ${currentEnemy.difficulty}. ${currentEnemy.ability}`; //the currentEnemy ability will show on the player screen.
    // monsterDescription.innerHTML = `${currentEnemy.name} has a difficulty of ${currentEnemy.difficulty}.`;

    monsterImage.src = currentEnemy.image
    if (remainingEnemies.length === 1) {
    monsterDescription.innerHTML = "Dungeon Cleared!";
    monsterName.innerHTML = "Congrats!";
    monsterImage.src = "images/chest.png";
    scoreCount();
    } // spawn monster is called each time a monster is killed.

}



function gameStart() {
    // recycled monster container for door.
    var body = document.querySelector(".monster-screen");
    var doorName = document.getElementById('monster-name');
    var doorImage = document.getElementById('monster-image');
    var doorDescription = document.getElementById('monster-ability');
    var openingText = document.getElementById('battle-result');

    body.style.backgroundImage = "url(images/stonewall.jpg)"
    doorName.innerHTML = "Click Door"
    doorDescription.innerHTML = "Roll equal or higher than monster difficulty to defeat them."
    doorImage.src ="images/dungeon-door.png";
    openingText.innerHTML= "Make your way past the monsters and survive the dungeon, traveler.";

    doorImage.addEventListener("click", function() {
        spawnMonster();
    }, { once: true });
//this only allows the thing to run once, so you cannot create multiple X.
// for reference, https://stackoverflow.com/questions/28610365/how-can-i-add-an-event-for-a-one-time-click-to-a-function

}

gameStart();