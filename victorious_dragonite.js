/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: Michael
@tags: []
@addedOn: 2024-00-00

HOW TO PLAY:
The goal of the game is to knock out the red square - There are no attacks yet though
There are two numbers beneath the grass: Time until move (top), and cycle (bottom)
Your stats are in the top left, labeled [H] for health and [S] for stamina, and the red squares are in the top right
You can queue a move action by pressing either A (left) or D (right), which will queue your character to move in that direction 1 square
You can modify a movement queue by pressing S, which will make it move 2 squares in the previously queued direction
Your queued movement will take place once the time until move reaches zero, and will reduce your stamina by the number of squares moved. Your move will be canceled if you do not have enough stamina.

After every move, even if you or the red square did not make a move, the cycle counter will tick up. When the cycle counter reads 3, you will heal after that cycle's movement timer. The cycle will then reset to 1.
*/

// Characters
const player_sprite = "1";
const enemy_sprite = "2";

// Tiles
const grass_sprite = "q";
const dirt_sprite = "w";

setLegend(
  [ player_sprite, bitmap`
7777777777777777
7777777777777777
7722277777722277
7720077777700277
7720077777700277
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7770777777770777
7770777887770777
7777000000007777
7777777777777777
7777777777777777
7777777777777777`],
  [ enemy_sprite, bitmap`
3333333333333333
3330003333000333
3322230330322233
3320030330300233
3320033333300233
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3330000000000333
3303333388333033
3303333338333033
3333333333333333
3333333333333333`],
  [ grass_sprite, bitmap`
4444444444444444
4444444444444444
444F4444444D4FF4
F4F44D4DDD4FDDDD
DD44DFFCCFFFFCCC
FCFDCFCCFFCCCFFC
CFFCCCCCCCCCCCCF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ dirt_sprite, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ]
);

maps = [
   map`
..........
..........
..........
..........
..........
qqqqqqqqqq
wwwwwwwwww
wwwwwwwwww`
];

setMap(maps[0]);


// Stats
class Character {
  constructor(max_stamina, max_health, info) {
    this.max_stamina = max_stamina;
    this.max_health = max_health;
    this.info = info;
    
    this.health = this.max_health;
    this.stamina = this.max_stamina;
    this.sprite_type = this.info["sprite"];
    addSprite(this.info["pos"][0], this.info["pos"][1], this.sprite_type);

    // For some reason, addSprite does not return the sprite, so you have to get it with getFirst()
    this.sprite = getFirst(this.sprite_type);
  }

  updatePositionOnScreen() {
    var pos = this.info["pos"]; // [x, y]
    this.sprite.x = pos[0];
    this.sprite.y = pos[1];
  }

  heal() {
    this.stamina += 1;
    this.health +=1;

    // Not a very good way to do this, but it caps the health and stamina
    if(this.stamina > this.max_stamina) {
      this.stamina = this.max_stamina;
    }
    if(this.health > this.max_health) {
      this.health = this.max_health;
    }
  }
}

var player = new Character(3, 3, {
  "pos": [1, 4], 
  "direction": "l",
  "sprite": player_sprite
}) ;

var enemy = new Character(3, 3, {
  "pos": [8, 4], 
  "direction": "l",
  "sprite": enemy_sprite
});
// Handle player movement
noAction = {
  "action_type": "none",
  "action_data": {

  }
};
actionToTake = noAction

onInput("d", () => {
  actionToTake = {
    "action_type": "move",
    "action_data": {
      "dash": "no",
      "move": 1
    }
  }
});

onInput("a", () => {
  actionToTake = {
    "action_type": "move",
    "action_data": {
      "dash": "no",
      "move": -1
    }
  }
});

onInput("s", () => {
  if(actionToTake != noAction) {
    actionToTake["action_data"]["dash"] = "yes";
    actionToTake["action_data"]["move"] *= 2;
  }
});

// Map health & stamina values to colors
colormap = {
  3: color`4`,
  2: color`6`,
  1: color`9`,
  0: color`3`
};

// Draw the health & stamina bar for both the player and the bot
function drawStats() {
  // Player health
  addText("<<< " + player.health + "H", {
    x: 0,
    y: 0,
    color: colormap[player.health]
  });
  // Player stamina
  addText("<<< " + player.stamina + "S", {
    x: 0,
    y: 1,
    color: colormap[player.stamina]
  });

  // Enemy health
  addText(enemy.health + "H" + " >>>", {
    x: 14,
    y: 0,
    color: colormap[enemy.health]
  });
  // Enemy stamina
  addText(enemy.stamina + "S" + " >>>", {
    x: 14,
    y: 1,
    color: colormap[enemy.stamina]
  });
}
// Set the interval - how many times has the loop run, 0-3, rolls over
interval = 0
// Set the cycle = 1-3, heals stamina and health on 3
cycle = 1
// The main game loop
function gameLoop() {
  clearText();
  drawStats();
  time = 3 - interval;
  
  if(interval >= 3) {
    interval = -1;
    time = "!";
    if(actionToTake["action_type"] == "move") {
      staminaCost = Math.abs(actionToTake["action_data"]["move"]);
      if(player.stamina >= staminaCost) {
        // TODO: CHECK FOR COLLISIONS
        player.info["pos"][0] += actionToTake["action_data"]["move"];
        player.updatePositionOnScreen();
        player.stamina -= staminaCost;
      } else {
        addText("STAMINA LO", {
          x: 0,
          y: 11,
          color: color`3`
        });
      }
    }

    // drawStats();
    // Cycle +1, and heal characters if it is a third cycle
    if(cycle >=3) {
        player.heal();
        enemy.heal();
        cycle = 0;
    }
      cycle += 1;
    actionToTake = noAction;
    drawStats();
  }
  
  addText(time.toString(), {
      x: 10,
      y: 12,
      color: color`2`
  });
  addText(cycle.toString(), {
      x: 10,
      y: 14,
      color: color`2`
  });
  
  interval += 1;
}

// Run gameLoop once every second
setInterval(gameLoop, 1000);
