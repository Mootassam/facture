class Calcule {
  CheckValues(quantity, prix) {
    if (quantity && prix) {
      this.CalculeHT(quantity, prix);
    }
  }

  CalculeHT(quantity, prix) {
    let HT = 0;
    HT = quantity && prix ? quantity * prix : 0;
    return HT;
  }

  CalculeTTC() {}
}
export default Calcule;
