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

    attack: function() {
        var playerRoll = diceRoll();
        this.stamina--;
        return playerRoll;
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
        if (this.health === 0) {
            alert('YOU DIED!');
            alert('you scored ' + scoreCount() + ' point!');
        }
    }

};

var enemyCount = 3;

var orc = {
    difficulty: 13,
    status: 'alive',
    attack: function() {
        if (player.attack() >= this.difficulty) {
            console.log('enemy defeated');
            this.status = 'dead';
            enemyCount--;
            player.defeated++;
        } else {
            player.health--;
            player.checkDead();
        }
    },

    speedAttack: function() {
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


var orc2 = {
    difficulty: 13,
    status: 'alive',
    attack: function() {
        if (player.attack() >= this.difficulty) {
            console.log('enemy defeated');
            this.status = 'dead';
            enemyCount--;
            player.defeated++;
        } else {
            player.health--;
            player.checkDead();
        }
    },

    speedAttack: function() {
         if (player.speedAttack() >= this.difficulty) {
            console.log('enemy defeated');
            this.status = 'dead';
            enemyCount--;
            player.defeated++;
        } else {
            player.health--;
        }
    }
}

var orc3 = {
    difficulty: 13,
    status: 'alive',

    attack: function() {
        if (player.attack() >= this.difficulty) {
            console.log('enemy defeated');
            this.status = 'dead';
            enemyCount--;
            player.defeated++;
        } else {
            player.health--;
        }
    },

    speedAttack: function() {
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

orc.attack();
orc2.attack();
orc3.speedAttack();

console.log(scoreCount());
console.log(player);

function playerStatsWeb() {
  var playerHealth = document.getElementById('player-health');
  playerHealth.innerHTML = "Health: " + player.health;

  var playerStamina = document.getElementById('player-stamina');
  playerStamina.innerHTML = "Stamina: " + player.stamina;

  var playerPots = document.getElementById('player-potion');
  playerPots.innerHTML = "Potions: " + player.potions;
}

playerStatsWeb();

var attackButton = document.getElementById('attack-button');

attackButton.addEventListener('click', function() {
    orc.attack();
    playerStatsWeb();
})

// var diceTest = console.log("your roll is " + player.attack());

// var diceTest2 = player.attack();
// console.log(diceTest2);

// if (diceTest2 > orc.difficulty) {
//     console.log("enemy defeated!")
// } else {
//     console.log("enemy is still alive!");
// }

// console.log(player.attack());
// console.log(player.stamina);
// console.log(player.speedAttack());
// console.log("stamina is " + player.stamina);

// console.log(player.restoreHealth());
// console.log("health is" + player.health);

// console.log(player.restoreStamina());
// console.log("stamina is " + player.stamina);