# unit1-project
GA Unit 1 Project, 18 card solitaire

Dungeon Survival

Overview: 

A simple 18-card solitaire game where the player has fight off or escape monsters to get to the exit. Monsters are defeated from dice rolling. Points are calculated from monsters defeated, and remaining health/stamina. 

Languages:

HTML to build the site framework and structure. 
CSS to style the site. 

Javascript to utilize game logic, store changes in game state, pull data from the monsters and calculate scores. DOM manipulation to show changes on site and replace monster images. 

Mechanics
Player is an object with property name, stamina, health, potions and monsters defeated.

List of monstersList are within an array? That gets .pop out each turn. When monstersList.length === 0, game ends and scores are calculated. 

Monster is an object with property dicenumber, passive.

diceRoll mechanic -> rolls a D6 if its normal attack and stamina -- . If It’s a speed attack roll 2D6 and stamina -2. 

Potion mechanic -> drinks a poition and regain D6 + 2 stamina. 


Agile Principle -> get the game logic working by working on it on JS and console.log results to test if working. Start with character, health, stamina and 3 monsters first. 