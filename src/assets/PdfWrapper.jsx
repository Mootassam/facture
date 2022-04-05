import styled from "styled-components";
const PdfWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Karla&display=swap");
  h1 {
    color: rgba(12, 13, 15, 0.91);
    font-weight: 400;
    font-size: 36px;
    opacity: 90%;
  }
  h2 {
    color: rgba(12, 13, 15, 0.91);
    font-size: 27px;
    text-align: start;
    font-weight: 500;
  }
  p {
    color: #0c0d0f;
    opacity: 54%;
  }
  /** Facture Header **/
  .app__facture_pdf {
    display: flex;
    flex-direction: column;
    padding: 4rem 4rem;
  }

  .app__facture-title {
    padding-bottom: 5rem;
  }
  .facture-title > p {
    font-size: 29px;
  }

  /** Facture Adresse Emiteur and  Destinateur **/

  .app__facture-adresse {
    display: flex;
    flex-direction: row;
    padding-bottom: 2.4rem;
  }
  .app__facture-adresse > div > h2 {
    padding-bottom: 1rem;
  }
  .app__facture-adresse > div > div > p {
    padding: 0.3rem;
  }
  .app__facture-adresse > div:nth-child(1) {
    padding-right: 12rem;
  }
  .adresse-details {
    display: flex;
    flex-direction: row;
  }
  .adresse-details > p:nth-child(1) {
    padding-right: 6rem;
  }
  .adresse-details > p:nth-child(2) {
    color: #0c0d0f;
  }

  /** Facture Table **/

  .app__facture-details {
    flex-direction: row;
    padding-bottom: 2.4rem;
  }
  .facture-details-title {
    padding-bottom: 1rem;
  }
  .facture-details-table {
    display: flex;
  }

  .details-table {
    color: rgba(12, 13, 15, 0.82);
    text-align: left;
    width: 100%;
    background: #fff;
    margin: 1em 0em;
    border: none;
    border-collapse: separate;
    border-spacing: 0px;
  }
  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }
  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  .details-table thead th {
    color: white;
    background: #757575;
    font-style: none;
    font-weight: 400;
    text-align: left;
    text-transform: none;
    padding: 10px 1rem 10px;
    vertical-align: middle;
    border-bottom: 1px solid rgba(12, 13, 15, 0.12);
    border-right: 0.1px solid #ffffff;
    white-space: nowrap;
  }

  .details-table td {
    text-align: left;
    vertical-align: text-top;
    padding: 10px 1rem;
  }
  .details-table tbody tr td {
    border-bottom: 1px solid rgba(12, 13, 15, 0.12);
  }
  .details-table td.details-numeric,
  .details-table th.details-numeric {
    text-align: right;
  }

  /** Facture Totale **/
  .app__facture-totale {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;

    left: auto;
  }

  .facture-totale {
    display: flex;
    flex-direction: row;
  }
  .facture-totale > p {
    margin: 0 1rem;
    display: flex;
    align-items: flex-start;
    text-align: start;
  }
  .totale-left {
    font-weight: 800;
    color: black;
    opacity: 90%;
  }
`;

export default PdfWrapper;