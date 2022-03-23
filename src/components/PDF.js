import React, { useRef } from "react";
import "./Pdf.css";
import Pdf from "react-to-pdf";
const PDF = (props) => {
  const { form } = props;
  const options = {
    format: [4, 2],
  };
  const ref = useRef();
  return (
    <>
      <div className='app__facture_pdf' ref={ref}>
        <div className='app__facture-title'>
          <div className='facture-title'>
            <h1>Devis Provisoire</h1>
            <p>10 mars 2022</p>
          </div>
        </div>
        <div className='app__facture-adresse'>
          <div className='facture-adresse'>
            <h2>Émetteur</h2>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Tadeco</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Tadeco</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Tadeco</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Tadeco</p>
            </div>
          </div>
          <div className='facture-adresse'>
            <h2>Destinataire</h2>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Topnet</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Topnet</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Topnet</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Topnet</p>
            </div>
            <div className='adresse-details'>
              <p className='details-left'>Société :</p>
              <p className='details-right'>Topnet</p>
            </div>
          </div>
        </div>
        <div className='app__facture-details'>
          <div className='facture-details-title'>
            <h2>Detail</h2>
          </div>
          <div className='facture-details-table'>
            <table className='details-table'>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th className='details-numeric'>Prix unitaire HT</th>
                  <th className='details-numeric'>Quantité</th>
                  <th className='details-numeric'>TVA</th>
                  <th className='details-numeric'>Réduction</th>
                  <th className='details-numeric'>Total HT</th>
                </tr>
              </thead>
              <tbody>
                {form.map((item) => (
                  <tr>
                    <td>Service</td>
                    <td>{item.description}</td>
                    <td className='details-numeric'>{item.prix} €</td>
                    <td className='details-numeric'>{item.quantity} €</td>
                    <td className='details-numeric'>{item.tva}%</td>
                    <td className='details-numeric'>{item.discount} €</td>
                    <td className='details-numeric'>{item.TTC} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='app__facture-totale'>
          <div className='facture-totale'>
            <p className='totale-left'>Total HT</p>
            <p className='totale-right'>81,40 €</p>
          </div>
          <div className='facture-totale'>
            <p className='totale-left'>TVA (1%)</p>
            <p className='totale-right'>0,70 €</p>
          </div>
          <div className='facture-totale'>
            <p className='totale-left'>TVA (19%)</p>
            <p className='totale-right'>2,17 €</p>
          </div>
          <div className='facture-totale'>
            <p className='totale-left'>Total TTC</p>
            <p className='totale-right'>84,27 €</p>
          </div>
          <div className='facture-totale'>
            <p className='totale-left'>Total HT</p>
            <p className='totale-right'>81,40 €</p>
          </div>
        </div>
      </div>
      <div>
        <Pdf targetRef={ref} filename='post.pdf' x={0.5} y={0.5} scale={0.8}>
          {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
        </Pdf>
      </div>
    </>
  );
};

export default PDF;
