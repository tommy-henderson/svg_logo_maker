// creates shape class using deconstructor and sets color
class Shape {
    constructor() {
      this.color = "";
    }
    setColor(colorVar) {
      this.color = colorVar;
    }
  }

// creates/renders triangle class using shape class
  class Triangle extends Shape {
    render() {
      return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
  }
  
  // creates/renders square class using shape class
  class Square extends Shape {
    render() {
      return `<rect x="73" y="40" width="160" height="160" fill="${this.color}" />`;
    }
  }

  // creates/renders circle class using shape class
  class Circle extends Shape {
    render() {
      return `<circle cx="150" cy="115" r="80" fill="${this.color}" />`;
    }
  }
  
  // exports shape classes
  module.exports = { Triangle, Square, Circle };
