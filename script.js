console.log("hello");

function diceRoll() {
    return (Math.floor(Math.random() * Math.floor(6)) + 1);
    //D6 Roll essentially. it rolls between 0 to 5, therefore you add a +1 to result;
}


function scoreCount() {
    var score = player.stamina + player.health + (player.defeated * 3);
    return score;
}


var player = {
    name: "player",
    health: 5,
    stamina: 7,
    potions: 2,
    defeated: 0,
    score: 0,
    roll: 0,

    attack: function() {
        player.roll = diceRoll();
        this.stamina--;
        return player.roll;
        console.log(`diceroll is ${player.roll}`);
    },

    speedAttack: function() {
        var playerRoll = (2 * diceRoll());
        this.stamina-=2;
        return playerRoll;
    },

    restoreHealth: function() {
        this.potions --;
        this.health++;

        if (this.health > 3) {
            this.health = 3;
        } //this sets a max cap on health
    },

    restoreStamina: function() {
        this.potions --;
        var potBoost = (diceRoll()) + 2;
        console.log(potBoost);
        this.stamina+=potBoost;

        if (this.stamina > 7) {
            this.stamina = 7;
        } //this sets a max cap on stamina
    },

    checkDead: function() {
        if (this.health <= 0) {
            alert('YOU DIED!');
            alert('you scored ' + scoreCount() + ' point!');
            var youDied = document.getElementById('title');
            youDied.innerHTML = "YOU DIED";
            youDied.style.fontSize = "100px";
            youDied.style.position = "relative";
            youDied.style.top = "300px";
            youDied.style.zIndex = "5";
        }
    },

    checkStamina: function() {
        if (this.stamina <= 0) {
            alert('You dont have any stamina left!');
        }
    }

};

var enemyCount = 3;



class Monster {
    constructor(name,difficulty) {
        this.name = name;
        this.difficulty = difficulty;
        status = 'alive';
    }

    attack() {
        if (player.attack() >= this.difficulty) {
            console.log('enemy defeated');
            this.status = 'dead';
            enemyCount--;
            player.defeated++;
        } else {
            player.health--;
            player.checkDead();
        }
    }

    speedAttack() {
         if (player.speedAttack() >= this.difficulty) {
            console.log('enemy defeated');
            this.status = 'dead';
            enemyCount--;
            player.defeated++;
        } else {
            player.health--;
            player.checkDead();
        }
    }
}

const goblin = new Monster('goblin', 4);
console.log(goblin);
goblin.attack();
console.log(enemyCount);
console.log(player.health);
console.log(player.roll);
console.log(player.attack());


const orc = new Monster('orc', 13);
const orc2 = new Monster('orc2', 3);
const orc3 = new Monster('orc3', 14);

orc.attack();
console.log(player);
orc2.attack();
console.log(player);
orc3.speedAttack();
console.log(player);

console.log(scoreCount());
console.log(player);

var enemyArray = [goblin, orc, orc2, orc3];
console.log(enemyArray);

function playerStatsWeb() {
  var playerHealth = document.getElementById('player-health');
  playerHealth.innerHTML = "Health: " + player.health;

  var playerStamina = document.getElementById('player-stamina');
  playerStamina.innerHTML = "Stamina: " + player.stamina;

  var playerPots = document.getElementById('player-potion');
  playerPots.innerHTML = "Potions: " + player.potions;
} //this is run after every scene to update the screen.

playerStatsWeb();

var attackButton = document.getElementById('atk-btn');

attackButton.addEventListener('click', function() {
    orc.attack();
    playerStatsWeb();
})

var speedAttackButton = document.getElementById('spd-atk-btn')

speedAttackButton.addEventListener('click', function(){
    player.checkStamina();
    orc3.speedAttack();
    playerStatsWeb();
})

var potionButton = document.getElementById('pot-btn');

potionButton.addEventListener('click', function(){
    player.restoreHealth();
    playerStatsWeb();
});

var staminaButton = document.getElementById('stam-btn');

staminaButton.addEventListener('click', function() {
    player.restoreStamina();
    playerStatsWeb();
});