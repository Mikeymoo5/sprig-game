/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
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
addText("<<<<", {
  x: 0,
  y: 1,
  color: color`3`
});

// Stats
class Character {
  constructor(max_stamina, max_health, text_info) {
    this.max_stamina = max_stamina;
    this.max_health = max_health;
    this.text_info = text_info
    
    this.health = this.max_health
    this.stamina = this.stamina
    this.sprite_type = this.text_info["sprite"]
    addSprite(this.text_info["pos"][0], this.text_info["pos"][1], this.sprite_type)

    // For some reason, addSprite does not return the sprite, so you have to get it with getFirst()
    this.sprite = getFirst(this.sprite_type)
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
actionToTake = {
  "action_type": "none",
  "action_data": {

  }
};

onInput("d", () => {
  actionToTake = {
    "action_type": "move",
    "action_data": {
      "move": 1
    }
  }
});

// The main game loop
interval = -1
function gameLoop() {
  clearText();
  interval += 1;
  time = 3 - interval;
  addText(time.toString(), {
    x: 10,
    y: 13,
    color: color`2`
  });
  
  if(interval >= 3) {
    interval = -1
    if(actionToTake["action_type"] == move) {
      
      player.x += actionToTake["action_data"]["move"]
    }
  }

}

// Run gameLoop once every second
setInterval(gameLoop, 1000);
