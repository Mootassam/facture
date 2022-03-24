class Calcule {
  CheckValues(quantity, prix) {
    if (quantity && prix) {
      this.CalculeHT(quantity, prix);
    }
  }

  static CalculeHT(quantity, prix) {
    let HT = 0;
    HT = quantity && prix ? quantity * prix : 0;
    return HT;
  }
  static CalculeHtWithDiscount(quantity, prix, discount, typeDiscount) {
    let HT = 0;
    if (typeDiscount === "€") {
      HT = quantity * prix - discount;
    } else if (typeDiscount === "%") {
      HT = quantity * prix - (quantity * prix * discount) / 100;
    } else {
      HT = quantity * prix - (quantity * prix * discount) / 100;
    }
    return HT;
  }
  static CalculeTTC(quantity, prix, tva) {
    let TTC = 0;
    TTC = quantity * prix + (quantity * prix * tva) / 100;
    return TTC;
  }

  static CalculeTotale(quantity, prix, tva, discount, typeDiscount) {
    let HT = 0;
    if (typeDiscount === "%") {
      HT = quantity * prix - (quantity * prix * discount) / 100;
    } else if (typeDiscount === "€") {
      HT = quantity * prix - discount;
    }

    return HT;
  }
  static round(numb) {
    let rnd = Math.round((numb + Number.EPSILON) * 100) / 100;
    return rnd;
  }

  static CalculeGeneral(remise, value, type) {
    let THT = [];
    let RemiseGeneral = 0;
    let TTC = [];
    let THTF = 0;
    let TVAG = [];
    if (THT < 0 || TTC < 0 || TVAG < 0 || THTF < 0) {
      THT = 0;
      TTC = 0;
      TVAG = 0;
      THTF = 0;
    }
    value.map((item) => THT.push(item.HT));
    THT = THT.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante
    );
    THTF = THT;
    value.map((item) => TTC.push(item.TTC));
    TTC = TTC.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante
    );
    if (remise) {
      if (type === "%") {
        TTC = this.round(TTC - (TTC * remise) / 100);
        THTF = this.round(THT - (THT * remise) / 100);
        RemiseGeneral = this.round((THT * remise) / 100);
      } else if (type === "€") {
        TTC = this.round(TTC - remise);
        THTF = this.round(THT - remise);
        RemiseGeneral = remise;
      }
    }
    TVAG = TTC - THT;
    TVAG = this.round(TVAG);
    return {
      THT,
      RemiseGeneral,
      TTC,
      TVAG,
      THTF,
    };
  }

  static calcule(i, newFormValues) {
    let TTC = 0;
    let HT = 0;

    if (newFormValues[i]["quantity"] && newFormValues[i]["prix"]) {
      TTC = this.CalculeHT(
        newFormValues[i]["quantity"],
        newFormValues[i]["prix"]
      );
      HT = TTC;
    }
    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["discount"] &&
      !newFormValues[i]["tva"]
    ) {
      TTC = this.CalculeHtWithDiscount(
        newFormValues[i]["quantity"],
        newFormValues[i]["prix"],
        newFormValues[i]["discount"],
        newFormValues[i]["typeDiscount"]
      );
      HT = TTC;
    }

    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["tva"] &&
      !newFormValues[i]["discount"]
    ) {
      TTC = this.CalculeTTC(
        newFormValues[i]["quantity"],
        newFormValues[i]["prix"],
        newFormValues[i]["tva"]
      );
    }
    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["tva"] &&
      newFormValues[i]["discount"]
    ) {
      HT = this.CalculeTotale(
        newFormValues[i]["quantity"],
        newFormValues[i]["prix"],
        newFormValues[i]["tva"],
        newFormValues[i]["discount"],
        newFormValues[i]["typeDiscount"]
      );
      HT = this.round(HT);
      TTC = HT + (HT * newFormValues[i]["tva"]) / 100;
      TTC = this.round(TTC);
    }
    return { TTC, HT };
  }
}
export default Calcule;
