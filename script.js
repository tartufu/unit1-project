console.log("hello");

function diceRoll() {
    return (Math.floor(Math.random() * Math.floor(6)) + 1);
    //D6 Roll essentially. it rolls between 0 to 5, therefore you add a +1 to result;
}

var player = {
    name: "player",
    health: 3,
    stamina: 7,
    potions: 2,
    defeated: 0,

    attack: function() {
        diceRoll();
        this.stamina--;
    },

    speedAttack: function() {
        (2 * diceRoll());
        this.stamina-=2;
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
    }

};

var orc = {
    difficulty: 2;
}

// console.log(player.attack());
// console.log(player.stamina);
// console.log(player.speedAttack());
// console.log("stamina is " + player.stamina);

// console.log(player.restoreHealth());
// console.log("health is" + player.health);

console.log(player.restoreStamina());
console.log("stamina is " + player.stamina);