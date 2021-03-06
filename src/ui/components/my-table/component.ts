import Component, { tracked } from "@glimmer/component";

function _random(max) {
  return Math.round(Math.random()*1000)%max;
}

var startTime;
var lastMeasure;
var startMeasure = function(name) {
    startTime = performance.now();
    lastMeasure = name;
};
var stopMeasure = function() {
    window.setTimeout(function() {
        var stop = performance.now();
        console.log(lastMeasure+" took "+(stop-startTime));
    }, 0);
};


class Store {
  @tracked rows = [];
  @tracked selected = undefined;
  @tracked id = 1;

  run() {
    this.rows = this.buildData();
    this.selected = undefined;
  }

  add(count = 1000) {
    this.rows = this.rows.concat(this.buildData(count));
  }

  update() {
    this.updateData();
  },

  select(id) {
    this.selected = id;
  },

  runLots() {
    this.rows = this.buildData(10000);
    this.selected = undefined;
  },

  clear() {
    this.rows = [];
    this.selected = undefined;
  },

  swapRows() {
    if(this.rows.length > 10) {
  	  let d4 = this.rows[4];
  	  let d9 = this.rows[9];

  	  var rows = this.rows.map(function(rows, i) {
  	    if(i === 4) {
  	    	return d9;
  	    }
  	    else if(i === 9) {
  	    	return d4;
  	    }
  	    return rows;
  	  });
      this.rows = rows;
  	}
  }

  buildData(count = 1000) {
    var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
    var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
    var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
    var data = [];
    for (var i = 0; i < count; i++)
        data.push({id: this.id++, label: adjectives[_random(adjectives.length)] + " " + colours[_random(colours.length)] + " " + nouns[_random(nouns.length)] });
    return data;
  }

  updateData(mod = 10) {
    for (let i=0;i<this.rows.length;i+=10) {
      //TODO: GJ: this doesn't seem to rerender correctly
      this.rows[i] = Object.assign({}, this.rows[i], {label: this.rows[i].label + ' !!!'});
    }
    this.rows = this.rows;
  }
}

export default class MyComponent extends Component {

  @tracked store = new Store();

  create() {
    startMeasure('run');
    this.store.run();
    stopMeasure();
  }

  runLots() {
    startMeasure('runLots');
    this.store.runLots()
    stopMeasure();
  }

  add() {
    startMeasure('add');
    this.store.add();
    stopMeasure();
  }

  addTwo() {
    startMeasure('addTwo');
    this.store.add(2);
    stopMeasure();
  }

  update() {
    startMeasure('update');
    this.store.update();
    stopMeasure();
  }

  clear() {
    startMeasure('clear');
    this.store.clear();
    stopMeasure();
  }

  swapRows() {
    startMeasure('clear');
    this.store.swapRows();
    stopMeasure();
  }

  select(id) {
    startMeasure('select');
    //TODO: GJ: waiting for actions to be implemented
    console.log('select', id);
    stopMeasure();
  }

  remove(id) {
    startMeasure('remove');
    //TODO: GJ: waiting for actions to be implemented
    console.log('remove', id);
    stopMeasure();
  }
}
