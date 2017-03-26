import Component, { tracked } from "@glimmer/component";

function _random(max) {
  return Math.round(Math.random()*1000)%max;
}

//TODO: add `startMeasure` and `stopMeasure`
class Store {
  @tracked rows = [];
  @tracked selected = undefined;
  @tracked id = 1;

  run() {
    this.rows = this.buildData();
    this.selected = undefined;
  }

  add() {
    this.rows = this.rows.concat(this.buildData(1000));
  }

  update() {
    this.rows = this.updateData();
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
}

export default class MyComponent extends Component {

  @tracked store = new Store();

  constructor() {
    super();

    this.create = () => {
      this.store.run();
    }

    this.runLots = () => {
      this.store.runLots()
    }

    this.add = () => {
      this.store.add();
    }

    this.update = () => {
      this.store.update();
    }

    this.clear = () => {
      this.store.clear();
    }

    this.swapRows = () => {
      this.store.swapRows();
    }

    this.select = (identifier) => {
      //TODO: GJ: waiting for actions
      console.log('select', identifier);
    }

    this.remove = (identifier) => {
      //TODO: GJ: waiting for actions
      console.log('remove', identifier);
    }
  }
}
