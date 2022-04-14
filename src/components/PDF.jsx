import React, { useRef } from "react";
import Pdf from "react-to-pdf";
import PdfWrapper from "../assets/PdfWrapper";
import { PDFExport } from "@progress/kendo-react-pdf";

const PDF = (props) => {
  const { form } = props;
  const ref = useRef();
  const pdfExportComponent = React.useRef(null);
  const PDFExportPageTemplate = (props) => (
    <span>
      Page {1} of {3}
    </span>
  );

  return (
    <>
      <PDFExport
        paperSize='auto'
        margin={"2cm"}
        pageTemplate={PDFExportPageTemplate}
        repeatHeaders={true}
        scale={1}
        date={new Date()}
        ref={pdfExportComponent}>
        <PdfWrapper>
          <div className='app__facture_pdf' ref={ref}>
            <div className='app__facture-title'>
              <div className='facture-title'>
                <h1>Devis Provisoire</h1>
                <p>10 mars 2022</p>
              </div>
              <img src={props.image} alt='' width={150} height={150} />
            </div>
            <div className='app__facture-adresse'>
              <div className='facture-adresse'>
                <h2>Emetteur</h2>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Tadeco</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Tadeco</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Tadeco</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Tadeco</p>
                </div>
              </div>
              <div className='facture-adresse'>
                <h2>Destinataire</h2>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Topnet</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Topnet</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Topnet</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
                  <p className='details-right'>Topnet</p>
                </div>
                <div className='adresse-details'>
                  <p className='details-left'>Societe :</p>
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
                      <th className='details-numeric'>Quantite</th>
                      <th className='details-numeric'>TVA</th>
                      <th className='details-numeric'>Reduction</th>
                      <th className='details-numeric'>Total HT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.map((item) => (
                      <tr>
                        <td>Service</td>
                        <td className='details-description'>
                          {item.description}
                        </td>
                        <td className='details-numeric'>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(item.prix)}
                        </td>
                        <td className='details-numeric'>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(item.quantity)}
                        </td>
                        <td className='details-numeric'>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(item.tva)}
                        </td>
                        <td className='details-numeric'>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(item.discount)}
                        </td>
                        <td className='details-numeric'>
                          {new Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                          }).format(item.TTC)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='app__facture-totale'>
              <div className='facture-totale'>
                <p className='totale-left'>Total HT</p>
                <p className='totale-right'>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(props.general.THT)}
                </p>
              </div>
              <div className='facture-totale'>
                <p className='totale-left'>Remise générale</p>
                <p className='totale-right'>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(props.general.RemiseGeneral)}
                </p>
              </div>
              <div className='facture-totale'>
                <p className='totale-left'>Total HT final</p>
                <p className='totale-right'>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(props.general.THTF)}
                </p>
              </div>
              <div className='facture-totale'>
                <p className='totale-left'>TVA</p>
                <p className='totale-right'>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(props.general.TVAG)}
                </p>
              </div>
              <div className='facture-totale'>
                <p className='totale-left'>Total</p>
                <p className='totale-right'>
                  {new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(props.general.TTC)}
                </p>
              </div>
            </div>
          </div>
        </PdfWrapper>
      </PDFExport>

      <div className='example-config'>
        <button
          onClick={() => {
            if (pdfExportComponent.current) {
              pdfExportComponent.current.save();
            }
          }}>
          Export PDF
        </button>
      </div>
    </>
  );
};

export default PDF;
