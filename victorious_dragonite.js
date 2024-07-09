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
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [ enemy_sprite, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
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

var player = new Character(3, 3, {
  "pos": [0, 0], 
  "direction": "l"
})

var enemy = new Character(3, 3, {
  "pos": [0, 0], 
  "direction": "l"
})


// Stats
class Character {
  constructor(max_stamina, max_health, text_info) {
    this.max_stamina = max_stamina;
    this.max_health = max_health;
    this.text_info = text_info
    
    this.health = this.max_health
    this.stamina = this.stamina
  }
}

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
  y: 0,
  color: color`3`
});

function loop() {

}