const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class Game {
  constructor() {
    this.stacks = [[1,2,3], [], []];
  }

  promptMove(completionCallback) {
    console.log(this.stacks);
    let that = this;
    reader.question("Move to disk from X to Y? Enter with a space", function(ans) {
      let moves = ans.split(' ').map((el) => parseInt(el));
      let endTowerIdx = moves[1];
      let startTowerIdx = moves[0];
      if (that.move(startTowerIdx, endTowerIdx)) {
        if (!that.isWon()) {
          that.promptMove(completionCallback);
        } else {
          completionCallback();
          reader.close();
        }
      } else {
        that.promptMove(completionCallback);
      }
    });
  }

  isValidMove(start, end) {
    if (this.stacks[start].length === 0) {
      return false;
    } else if (this.stacks[end].length === 0) {
      return true;
    } else if (this.stacks[start][this.stacks[start].length - 1] > this.stacks[end][this.stacks[end].length - 1]) {
      return false;
    } else if (start == end) {
      return false;
    } else {
      return true;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
    return true;
    } else {
    return false;
    }
  }

  printthefreakingstackinaniceformat () {
    console.log(JSON.stringify(this.stacks));
  }

  isWon () {
    if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      return true;
    } else {
      return false;
    }
  }

  run (completionCallback) {
    this.promptMove(completionCallback);
  }

}
let game = new Game();
game.run(()=> console.log("Gratz"));
