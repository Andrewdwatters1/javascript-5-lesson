class Wpr38 {
  constructor(codeName, quantity, quality) {
    this.codeName = codeName;
    this.quantity = quantity;
    this.quality = quality;
  }

  calculateQualityOverQuantity() {
    this.qualityOverQuantity = this.quality/this.quantity;
    return this;
  }

  sayHi() {
    console.log(`hi ${this.codeName}`)
    return this;
  }

  graduate() {
    this.quantity = 0;
    return this;
  }
}

let wpr38 = new Wpr38('Buffalo', 24, 100)

console.log(wpr38.sayHi().calculateQualityOverQuantity().graduate().calculateQualityOverQuantity())
