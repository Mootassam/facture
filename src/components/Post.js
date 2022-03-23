import React, { useState } from "react";
import Calcule from "../Utils/Calcule";
import PDF from "./PDF";
import "./Post.css";
import { VscAdd } from "react-icons/vsc";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import Select from "react-select";

const Post = () => {
  const options = [
    { value: "%", label: "%" },
    { value: "€", label: "€" },
  ];
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
  const [enable, setEnable] = useState(false);
  const calculeGenerale = (e) => {
    let newFormValues = [...form];
    let value = Object.values(newFormValues);
    global = Calcule.CalculeGeneral(e.target.value, value);
    setGenerale(global);
  };

  const checkTheDuplicate = (value) => {
    let check;

    check = value.map((item, index) => {
      return item.tva;
    });
    let isDuplicated = check.some((item, index) => {
      return check.indexOf(item) !== index;
    });
    isDuplicated ? setEnable(false) : setEnable(true);
  };
  let handleChange = async (i, e) => {
    let newFormValues = [...form];
    newFormValues[i][e.target.name] = e.target.value;

    const { TTC, HT } = await Calcule.calcule(i, newFormValues);
    newFormValues[i]["HT"] = HT;
    newFormValues[i]["TTC"] = TTC;
    setForm(newFormValues);
    if (e.target.name !== "description") {
      let value = Object.values(newFormValues);
      global = Calcule.CalculeGeneral(e.target.value, value);
    }
    await checkTheDuplicate(newFormValues);
    setGenerale(global);
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

  let copyFormFields = (index) => {
    let newForm = [...form];
    let data = newForm[index];

    setForm([
      ...form,
      {
        type: data.type,
        quantity: data.quantity,
        prix: data.prix,
        tva: data.tva,
        discount: data.discount,
        HT: data.HT,
        TTC: data.TTC,
        description: data.description,
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...form];
    if (i !== 0) {
      newFormValues.splice(i, 1);
      setForm(newFormValues);
    }
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
                      <span>
                        <AiOutlineCaretUp />
                      </span>
                      <span>
                        <AiOutlineCaretDown />
                      </span>
                    </div>
                    <div className='form-left-hr' />
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

                      <select name='typeReduction' onChange={handleChange}>
                        <option value='%'>%</option>
                        <option value='€'>$</option>
                      </select>
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
                        <label className='label'>Total TTC </label>
                        <input
                          type='number'
                          value={item.TTC || ""}
                          onChange={(e) => handleChange(e)}
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
                    <span onClick={() => removeFormFields(index)}>
                      <TiDeleteOutline />
                    </span>
                    <span onClick={() => copyFormFields(index)}>
                      <FaRegCopy />
                    </span>
                  </div>
                </div>
              ))}
              <div className='add_ligne'>
                <a onClick={() => addFormFields()}>
                  <VscAdd /> Ajouter une ligne
                </a>
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
                {enable ? (
                  ""
                ) : (
                  <span>
                    Il nest pas possible deffectuer une remise generele sure ce
                    document , Vueillez a la place appliquer une remise par
                    ligne
                  </span>
                )}
              </div>

              <select>
                <option>%</option>
                <option>€</option>
              </select>
            </div>

            <div className='form-total'>
              <div className='total-items'>
                <p>Total HT</p>
                <p>{general.THT} €</p>
              </div>
              <div className='total-items'>
                <p>Remise générale</p>
                <p> {general.RemiseGeneral} €</p>
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
