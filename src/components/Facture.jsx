import React, { useState, useRef } from "react";
import Calcule from "../Utils/Calcule";
import { VscAdd } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { ImInfo } from "react-icons/im";
import FactureWrapper from "../assets/FactureWrapper";
import PDF from "./PDF";
const Facture = () => {
  const address = useRef();
  const [header, setheader] = useState();
  const [remisteTotal, setRemisteTotal] = useState(0);
  const [typeRemiseTotale, setTypeRemiseTotale] = useState("%");
  const [submited, setSubmited] = useState(false);
  const [form, setForm] = useState([
    {
      type: "",
      quantity: "",
      prix: "",
      tva: "",
      discount: "",
      typeDiscount: "%",
      HT: "",
      TTC: "",
      description: "",
    },
  ]);
  const [general, setGenerale] = useState({});
  const [enable, setEnable] = useState(false);
  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      invoice: address.current.invoice.value,
      de_name_enterprise: address.current.de_name_enterprise.value,
      de_email_enterprise: address.current.de_email_enterprise.value,
      de_email_adresse: address.current.de_email_adresse.value,
      de_tel_fixe: address.current.de_tel_fixe.value,
      de_siren_siret: address.current.de_siren_siret.value,
      facture_nom_enterprise: address.current.facture_nom_enterprise.value,
      facture_email_facture: address.current.facture_email_facture.value,
      facture_address: address.current.facture_address.value,
      facture_tel: address.current.facture_tel.value,
      conditions_nombre: address.current.conditions_nombre.value,
      condition_date: address.current.condition_date.value,
      conditions: address.current.conditions.value,
    };
    setheader(data);
    setSubmited(true);
  };

  const addFormFields = () => {
    setForm([
      ...form,
      {
        type: "",
        quantity: "",
        prix: "",
        tva: "",
        discount: "",
        typeDiscount: "%",
        HT: "",
        TTC: "",
        description: "",
      },
    ]);
  };

  const Up = (from, to) => {
    let newForm = [...form];
    let f = newForm.splice(from, 1)[0];
    newForm.splice(to, 0, f);
    setForm(newForm);
  };
  const Down = (from, to) => {
    let newForm = [...form];
    let f = newForm.splice(from, 1)[0];
    newForm.splice(to, 0, f);
    setForm(newForm);
  };
  const handleSubmit = () => {
    let newFormValues = [...form];
    // const keys = Object.keys(newFormValues);
    // keys.forEach(async (element) => {
    //   const { prixHt, quantity } = await Calcule.calculeLigne(
    //     element,
    //     newFormValues
    //   );
    //   newFormValues[element]["prix"] = prixHt;
    //   newFormValues[element]["quantity"] = quantity;
    // });

    let value = Object.values(newFormValues);
    let global;
    global = Calcule.CalculeGeneral(remisteTotal, value, typeRemiseTotale);
    setGenerale(global);
  };
  const copyFormFields = async (index) => {
    let newForm = [...form];
    let data = newForm[index];
    data = {
      type: data.type,
      quantity: data.quantity,
      prix: data.prix,
      tva: data.tva,
      discount: data.discount,
      typeDiscount: data.typeDiscount,
      HT: data.HT,
      TTC: data.TTC,
      description: data.description,
    };
    newForm.splice(index, 0, data);

    await setForm(newForm);
    let value = Object.values(newForm);
    let global;
    global = Calcule.CalculeGeneral(remisteTotal, value, typeRemiseTotale);
    setGenerale(global);
  };

  const removeFormFields = async (i) => {
    let newFormValues = [...form];
    newFormValues.splice(i, 1);
    setForm(newFormValues);

    let global;
    let value = Object.values(newFormValues);
    global = await Calcule.CalculeGeneral(
      remisteTotal,
      value,
      typeRemiseTotale
    );
    setGenerale(global);
  };
  const checkTheDuplicate = (value) => {
    let check;
    check = value.map((item, index) => {
      return item.tva;
    });
    let isDuplicated = check.every((v) => v === check[0]);
    isDuplicated ? setEnable(true) : setEnable(false);
  };

  const calculeGenerale = async (e) => {
    let newFormValues = [...form];
    let value = Object.values(newFormValues);

    if (e.target.name === "general") {
      setRemisteTotal(e.target.value);
      let global = await Calcule.CalculeGeneral(
        e.target.value,
        value,
        typeRemiseTotale
      );
      setGenerale(global);
    } else if (e.target.name === "typediscountGlobal") {
      setTypeRemiseTotale(e.target.value);
    }
  };

  const handleChange = async (i, e) => {
    let newFormValues = [...form];

    if (i !== "" || i !== null || isNaN(i)) {
      newFormValues[i][e.target.name] = e.target.value;

      if (e.target.name !== "TTC") {
        const { TTC, HT } = await Calcule.calcule(i, newFormValues);
        newFormValues[i]["HT"] = HT;
        newFormValues[i]["TTC"] = TTC;
      }
    }

    if (e.target.name === "tva") await checkTheDuplicate(newFormValues);
    setForm(newFormValues);
    if (e.target.name !== "description") {
      let value = Object.values(newFormValues);
      let global = await Calcule.CalculeGeneral(
        remisteTotal,
        value,
        typeRemiseTotale
      );
      setGenerale(global);
    }
  };
  const [image, setImage] = useState();
  const uploadPhoto = (event) => {
    const imageId = document.querySelector("#image_logo");
    imageId.src = URL.createObjectURL(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <FactureWrapper>
      {submited === false ? (
        <div className='app__form' onClick={() => handleSubmit()}>
          <form className='form' onSubmit={formHandler} ref={address}>
            <div className='app__header'>
              <div className='app__header_facture'>
                <input placeholder='Invoice' name='invoice' type='text' />
              </div>
              <input
                type='file'
                name='file'
                id='upload'
                onChange={(e) => uploadPhoto(e)}
              />
              <div className='app__header_logo'>
                <img id='image_logo' width={150} height={150} />
              </div>
              <br />
            </div>

            <div className='form-destinataire'>
              <div className='form-de'>
                <h3> De </h3>
                <div className='form-group'>
                  <label>Nom</label>
                  <input
                    name='de_name_enterprise'
                    type='text'
                    placeholder='Nom Enterprise'
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='text'
                    name='de_email_enterprise'
                    placeholder='Email'
                  />
                </div>
                <div className='form-group'>
                  <label>Adresse</label>
                  <input
                    type='text'
                    name='de_email_adresse'
                    placeholder='Adresse'
                  />
                </div>
                <div className='form-group'>
                  <label>Tel. fixe</label>
                  <input
                    type='text'
                    name='de_tel_fixe'
                    placeholder='Tel. fixe'
                  />
                </div>
                <div className='form-group'>
                  <label>N SIREN/SIRET</label>
                  <input
                    className=''
                    type='text'
                    name='de_siren_siret'
                    placeholder='N SIREN/SIRET'
                  />
                </div>
              </div>
              <div className='form-facture'>
                <h3> Adresse De Facturation </h3>
                <div className='form-group'>
                  <label>Nom</label>
                  <input
                    name='facture_nom_enterprise'
                    type='text'
                    placeholder='Adresse De Facturation'
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    name='facture_email_facture'
                    type='text'
                    placeholder='Nom Enterprise'
                  />
                </div>
                <div className='form-group'>
                  <label>Adresse</label>
                  <input
                    name='facture_address'
                    type='text'
                    placeholder='Adresse'
                  />
                </div>
                <div className='form-group'>
                  <label>Tel.fixe</label>
                  <input
                    name='facture_tel'
                    type='text'
                    placeholder='Tel.fixe'
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className='form-conditions'>
              <div className='form-group'>
                <label>Nombre</label>
                <input
                  name='conditions_nombre'
                  type='text'
                  placeholder='Nombre'
                />
              </div>
              <div className='form-group'>
                <label>Date</label>
                <input name='condition_date' type='date' placeholder='Date' />
              </div>
              <div className='form-group'>
                <label>Conditions</label>
                <input name='conditions' type='text' placeholder='conditions' />
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
                      <span onClick={() => Up(index, index - 1)}>
                        <AiOutlineCaretUp />
                      </span>
                      <span onClick={() => Down(index, index + 1)}>
                        <AiOutlineCaretDown />
                        <div className='form-left-hr' />
                      </span>
                    </div>
                  </div>
                  <div className='form-right'>
                    <div className='services'>
                      <div className='form-right-service'>
                        <label htmlFor=''> Type</label>
                        <select>
                          <option value='Service'>Service</option>
                          <option value='Heures'>Heures</option>
                          <option value='Jours'>Jours</option>
                          <option value='Produit'>Produit</option>
                        </select>
                      </div>
                    </div>
                    <div className='form-right-others'>
                      <div className='other-number'>
                        <label className='label'>Quantit??</label>
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
                        <label className='label'>R??duction </label>
                        <input
                          type='number'
                          step='any'
                          name='discount'
                          value={item.discount || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='label'>Type reduction</label>

                        <select
                          name='typeDiscount'
                          onChange={(e) => handleChange(index, e)}
                          value={item.typeDiscount}>
                          <option value='%'>%</option>
                          <option value='???'>???</option>
                        </select>
                      </div>
                      <div className='other-number'>
                        <label className='disabled'>Total HT</label>
                        <input
                          disabled
                          type='number'
                          name='HT'
                          value={item.HT || ""}
                        />
                      </div>
                      <div className='other-number'>
                        <label className='disabled'>Total TTC </label>
                        <input
                          type='number'
                          name='TTC'
                          value={item.TTC}
                          disabled
                          // onChange={(e) => handleChange(index, e)}
                        />
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

                  <div className='form-right-icons'>
                    {form.length > 1 && (
                      <span onClick={() => removeFormFields(index)}>
                        <TiDeleteOutline />
                      </span>
                    )}

                    <span onClick={() => copyFormFields(index)}>
                      <FaRegCopy />
                    </span>
                  </div>
                </div>
              ))}
              <div className='add_ligne'>
                <span onClick={() => addFormFields()}>
                  <VscAdd /> Ajouter une ligne
                </span>
              </div>
            </div>

            <div className='remise_total'>
              {enable ? (
                ""
              ) : (
                <div>
                  <span alt=''>
                    <ImInfo size={20} />
                  </span>
                  <div className='remise-message'>
                    Il n'est pas possible d'effectuer une remise g??n??rale sur ce
                    document. Veuillez ?? la place appliquer une remise par ligne
                  </div>
                </div>
              )}
              {enable ? (
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
              ) : (
                <div className='other-number'>
                  <label className='disabled'>Remise General</label>
                  <input
                    type='number'
                    name='general'
                    max={100}
                    min={0}
                    disabled
                    onChange={(e) => calculeGenerale(e)}
                  />
                </div>
              )}
              <div className='other-number'>
                <label className='label'>Type Discount</label>
                <select
                  name='typediscountGlobal'
                  onChange={(e) => calculeGenerale(e)}>
                  <option value='%'>%</option>
                  <option value='???'>???</option>
                </select>
              </div>
            </div>

            <div className='form-total'>
              <div className='total-items'>
                <p>Total HT</p>
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(general.THT)}
              </div>
              <div className='total-items'>
                <p>Remise g??n??rale</p>
                <p>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(general.RemiseGeneral)}
                </p>
              </div>
              <div className='total-items'>
                <p>Total HT final</p>
                <p>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(general.THTF)}
                </p>
              </div>
              <div className='total-items'>
                <p>TVA </p>
                <p>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(general.TVAG)}
                </p>
              </div>
              <div className='total-items'>
                <p>Total</p>
                <p>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(general.TTC)}
                </p>
              </div>
            </div>

            <div className='app_form-button'>
              <button className='button-submit' type='submit'>
                Valider Le devis
              </button>
            </div>
          </form>
        </div>
      ) : (
        <PDF form={form} general={general} header={header} image={image} />
      )}
    </FactureWrapper>
  );
};

export default Facture;
