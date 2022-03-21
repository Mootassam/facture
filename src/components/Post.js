import React, { useState } from "react";
import Calcule from "../Utils/Calcule";
import PDF from "./PDF";
import "./Post.css";
const Post = () => {
  const [submited, setSubmited] = useState(false);
  const [form, setForm] = useState([
    {
      type: "",
      quantity: "",
      prix: "",
      tva: "",
      discount: "",
      HT: "",
      TTC: "",
      description: "",
    },
  ]);
  const [general, setGenerale] = useState({});

  const calcule = (i) => {
    let TTC = 0;
    let HT = 0;

    let newFormValues = [...form];
    if (newFormValues[i]["quantity"] && newFormValues[i]["prix"]) {
      TTC = Calcule.CheckValues(
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
      TTC =
        newFormValues[i]["quantity"] * newFormValues[i]["prix"] -
        (newFormValues[i]["quantity"] *
          newFormValues[i]["prix"] *
          newFormValues[i]["discount"]) /
          100;

      HT = TTC;
    }

    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["tva"] &&
      !newFormValues[i]["discount"]
    ) {
      TTC =
        newFormValues[i]["quantity"] * newFormValues[i]["prix"] +
        (newFormValues[i]["quantity"] *
          newFormValues[i]["prix"] *
          newFormValues[i]["tva"]) /
          100;
    }
    if (
      newFormValues[i]["quantity"] &&
      newFormValues[i]["prix"] &&
      newFormValues[i]["tva"] &&
      newFormValues[i]["discount"]
    ) {
      HT =
        newFormValues[i]["quantity"] * newFormValues[i]["prix"] -
        (newFormValues[i]["quantity"] *
          newFormValues[i]["prix"] *
          newFormValues[i]["discount"]) /
          100;
      TTC = HT + (HT * newFormValues[i]["tva"]) / 100;
    }
    return { TTC, HT };
  };
  const round = (numb) => {
    let rnd = Math.round((numb + Number.EPSILON) * 1000) / 1000;
    return rnd;
  };
  const calculeGenerale = (e) => {
    let TTC = [];
    let THT = [];
    let RemiseGeneral = 0;
    let THTF = 0;
    let TVAG = [];

    let newFormValues = [...form];
    let value = Object.values(newFormValues);

    value.map((item) => THT.push(item.HT));
    THT = THT.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante
    );
    THTF = THT;
    value.map((item) => TTC.push(item.TTC));
    TTC = TTC.reduce(
      (accumulateur, valeurCourante) => accumulateur + valeurCourante
    );
    if (e) {
      TTC = TTC - (TTC * e.target.value) / 100;
      THTF = THT - (THT * e.target.value) / 100;
    }
    TVAG = TTC - THT;
    THT = round(THT);
    TTC = round(TTC);
    TVAG = round(TVAG);
    THTF = round(THTF);
    if (THT < 0 || TTC < 0 || TVAG < 0 || THTF < 0) {
      THT = 0;
      TTC = 0;
      TVAG = 0;
      THTF = 0;
    }
    const global = {
      THT,
      TTC,
      TVAG,
      THTF,
      RemiseGeneral,
    };
    setGenerale(global);
  };

  let handleChange = async (i, e) => {
    let newFormValues = [...form];
    newFormValues[i][e.target.name] = e.target.value;
    const { TTC, HT } = await calcule(i);
    let TC = round(TTC);
    let HTS = round(HT);
    // newFormValues[i]["HT"] = (Math.round(HT * 100) / 100).toFixed(2);
    // newFormValues[i]["TTC"] = (Math.round(TTC * 100) / 100).toFixed(2);
    newFormValues[i]["HT"] = HTS;
    newFormValues[i]["TTC"] = TC;
    setForm(newFormValues);
    await calculeGenerale();
  };

  let addFormFields = () => {
    setForm([
      ...form,
      {
        type: "",
        quantity: "",
        prix: "",
        tva: "",
        discount: "",
        HT: "",
        TTC: "",
        description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...form];
    newFormValues.splice(i, 1);
    setForm(newFormValues);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(form));
  };

  return (
    <>
      {submited === false ? (
        <div className='app__form'>
          <form action='' className='form'>
            <div className='form-destinataire'>
              <div className='form-devis-title'>
                <h3>Destinataire</h3>
              </div>
              <div className='form-devis-destinataire'>
                <select name='' id=''>
                  <option value=''>FTDES</option>
                  <option value=''>Topnet</option>
                  <option value=''>Steg</option>
                </select>
              </div>
            </div>
            <div className='form-informations'>
              <div className='form-devis-title'>
                <h3>Informations</h3>
              </div>
              <div className='form-informations-duree'>
                <div className='duree'>
                  <input type='number' name='' id='' />
                  <label htmlFor=''> Jours</label>
                </div>
              </div>
            </div>
            <div className='form-articles'>
              <div className='article-title'>
                <h3>Articles</h3>
              </div>
              {form.map((item, index) => (
                <div className='article-form' key={index + "key"}>
                  <div className='form-left'>
                    <div className='form-left-numbers'>
                      <span>{index + 1}</span>
                    </div>
                    <div className='form-left-icons'>
                      <span>U</span>
                      <span>D</span>
                    </div>
                    <div className='form-left-hr' />
                  </div>
                  <div className='form-right'>
                    <div className='services'>
                      <div className='form-right-service'>
                        <label htmlFor=''> Type</label>
                        <select onChange={(e) => handleChange(e)}>
                          <option value='Service'>Service</option>
                          <option value='Heures'>Heures</option>
                          <option value='Jours'>Jours</option>
                          <option value='Produit'>Produit</option>
                        </select>
                      </div>
                      <div className='form-right-icons'>
                        <span onClick={(index) => removeFormFields(index)}>
                          R
                        </span>
                        <span>C</span>
                      </div>
                    </div>
                    <div className='form-right-others'>
                      <div className='other-number'>
                        <label className='label'>Quantité</label>
                        <input
                          type='number'
                          name='quantity'
                          value={item.quantity || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='label'>Prix HT </label>
                        <input
                          type='number'
                          name='prix'
                          value={item.prix || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='label'>TVA </label>
                        <input
                          type='number'
                          name='tva'
                          value={item.tva || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='label'>Réduction </label>
                        <input
                          type='number'
                          step='any'
                          name='discount'
                          value={item.discount || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='disabled'>Total HT</label>
                        <input
                          disabled=''
                          type='number'
                          name='HT'
                          value={item.HT || ""}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='label'>Total TTC </label>
                        <input type='number' value={item.TTC || ""} />
                      </div>
                    </div>
                    <div className='form-right-descriptions'>
                      <textarea
                        cols={70}
                        rows={3}
                        id=''
                        name='description'
                        value={item.description || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className='add_ligne'>
                <a onClick={() => addFormFields()}>Ajouter une ligne</a>
              </div>
            </div>

            <div className='remise_total'>
              <div className='other-number'>
                <label className='label'>Remise General</label>
                <input
                  type='number'
                  name='general'
                  max={100}
                  min={0}
                  onChange={(e) => calculeGenerale(e)}
                />
              </div>

              <select>
                <option>%</option>
                <option>$</option>
              </select>
            </div>

            <div className='form-total'>
              <div className='total-items'>
                <p>Total HT</p>
                <p>{general.THT} €</p>
              </div>
              <div className='total-items'>
                <p>Remise générale</p>
                <p>{general.RemiseGeneral} €</p>
              </div>
              <div className='total-items'>
                <p>Total HT final</p>
                <p> {general.THTF} €</p>
              </div>
              <div className='total-items'>
                <p>TVA </p>
                <p>{general.TVAG} €</p>
              </div>
              <div className='total-items'>
                <p>Total</p>
                <p>{general.TTC} €</p>
              </div>
            </div>
            <div className='app_form-button'>
              <button
                className='button-submit'
                onClick={() => setSubmited(!submited)}>
                Valider Le devis
              </button>
            </div>
          </form>
        </div>
      ) : (
        <PDF form={form} content={"content"} image={"image"} />
      )}
    </>
  );
};

export default Post;
