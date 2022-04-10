import styled from "styled-components";
const PostWrapper = styled.div`
  h3 {
    font-size: 23px;
    line-height: 25px;
    font-weight: 700;
    font-style: normal;
    padding: 1rem 0;
  }
  p {
    font-size: 0.92rem;
  }
  input[type="text"]{
    padding : 1rem; 
    font-size : 18px;
  }

  input[type="number"] {
    border: none;
    border-bottom: 1px solid rgba(12, 13, 15, 0.14);
    line-height: 1.6em;
    gap: 1rem;
    background: transparent;
    border-radius: 0;
    transition: color 0.1s ease, border-color 0.1s ease;
    outline: none;
    max-width: 100%;
  }
  input[type="number"]:disabled {
    opacity: 1;
    color: #dddddd;
  }
  .disabled {
    opacity: 0.45;
  }

  input[type="number"]:focus {
    color: rgba(12, 13, 15, 0.82);
    border-color: #5b77bc;
    border-radius: 0;
    background: transparent;
  }
  textarea {
    margin-top: 1rem;
    width: 100%;
    padding: 1rem;
    font-size: 15px;
    text-align: start;
    background: transparent;
    border-radius: 1px;
    border: 1px solid rgba(12, 13, 15, 0.12);
  }
  textarea:focus {
    border-color: #5b77bc;
  }
  select:focus {
    border-color: #5b77bc;
  }
  select {
    border: none;
    line-height: 1.6em;
    border-bottom: 1px solid rgba(12, 13, 15, 0.14);
    padding: 0.3rem;
    background-color: #ffffff;
  }
  option {
    display: block;
    padding-left: 1rem;
  }

  /** styling global **/
  .app__form {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    width: 100%;
    box-shadow: 1px 1px 7px 7px #888888;
  }
  .app__form div {
    padding: 1px;
  }

  /** Styling the header **/
  .app__header {
    margin-bottom: 4rem;
    display: flex;
    justify-content: space-between;

  }
  .app__header_facture > input {
    width: 300px;
    height: 45px;
  }
  .app__header_logo {
    display flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    border: solid 1px black;
    cursor:pointer;
    p {
      display : none
     
    }
  }
  .app__header_logo:hover {
    p { 
    display:block;
    padding-bottom : 5px;
    }

  }
  .app__header_logo h4 {
    display :flex; 
    padding: 28px 70px;
  }



  /** Styling the destinataire **/
  .form-destinataire {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .form-de {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
    justify-content: center;
  }
  .form-group {
    display: flex;
    align-items: center;
    gap: 7rem;
    justify-content: flex-start;
  }
  .form-conditions {
    margin-top: 0.5rem;
  }
  .form-group > label {
    max-width: 2px;
    flex-wrap: wrap;
  }
  .form-facture {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-content: center;
    justify-content: center;
  }

  /******** Styling the Informations ********/
  .form-informations {
    margin-bottom: 2rem;
    align-items: baseline;
  }
  .duree > label {
    vertical-align: bottom;
    color: #7b7c7d;
    font-size: 15px;
    font-size: 400;
  }

  /******** Styling the Articles ********/
  .form-articles {
    width: 100%;
    max-width: 100%;
  }
  /** Left **/

  .article-form {
    width: 100%;
    display: flex;
    gap: 0.2rem;
    margin-bottom: 1rem;
  }

  .form-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: max-content;
    height: max-content;
    align-items: center;
  }

  .form-left-numbers > span {
    background-color: #5b77bc;
    color: #ffffff;
    padding: 0.4rem 0.7rem;
    border-radius: 50%;
    font-weight: bold;
    position: relative;
    z-index: 1;
    top: auto;
  }
  .form-left-numbers {
    position: relative;
    margin-bottom: 18px;
  }
  .form-left-icons {
    position: relative;
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 0.1rem;
  }

  .form-left-icons span:nth-child(1) {
    background-color: #efefef;
    padding: 0.3rem 0.3rem;
    z-index: 3;
    border-start-start-radius: 50%;
    border-start-end-radius: 50%;
    cursor: pointer;
  }

  .form-left-icons span:nth-child(2) {
    background-color: #efefef;
    padding: 0.3rem 0.3rem;
    z-index: 3;
    border-end-start-radius: 50%;
    border-end-end-radius: 50%;
    cursor: pointer;
  }
  .form-left-icons span:hover {
    background-color: #e0e0e0;
  }
  .form-left-hr {
    display: flex;
    margin-left: 0.44rem;
    margin-top: 0.6rem;
    position: absolute;
    background-color: #efefef;
    height: 200%;
    z-index: 0;
  }

  /**Right**/
  .form-right {
    width: 100%;
    margin-top: 0.58rem;
    /* background-color: rgb(91, 209, 215); */
  }
  .services {
    display: flex;
    width: 100%;
    margin-bottom: 0.6rem;
  }
  .form-right-service {
    display: flex;
    flex-direction: column;
    width: 47%;
  }

  .form-right-icons {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    float: right;
    text-align: right;
    align-items: center;
    justify-items: center;
  }
  .form-right-icons span:nth-child(1) {
    background-color: #efefef;
    padding: 0.3rem 0.3rem;
    z-index: 3;
    border-radius: 50%;
    cursor: pointer;
  }

  .form-right-icons span:nth-child(2) {
    background-color: #efefef;
    padding: 0.3rem 0.3rem;
    z-index: 3;
    border-radius: 50%;
    cursor: pointer;
  }
  .form-right-icons span:hover {
    background-color: #e0e0e0;
  }
  .form-right-others {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    flex-wrap: wrap;
  }
  .other-number {
    display: flex;
    flex-direction: column;
    width: 120px;
  }
  .other-number > label {
    color: #7b7c7d;
    font-size: 0.92rem;
    font-weight: 400;
  }

  .add_ligne {
    color: #516aa7;
    width: fit-content;
    max-width: fit-content;
    cursor: pointer;
  }
  .add_ligne > span {
    cursor: pointer;
    background-color: #ffffff;
    border-radius: 3px;
    color: #516aa7;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    font-weight: 700;
    text-transform: uppercase;
  }
  .add_ligne > span:hover {
    color: #516aa7;
    background-color: rgba(91, 119, 188, 0.12);
  }

  /******** Styling the Results ********/
  .form-total {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f1f1f1;
    margin-top: 4rem;
  }
  .total-items {
    text-align: start;
    font-weight: bold;
    opacity: 90%;
    align-content: flex-start;
    justify-content: flex-end;
    margin: 0.4rem 1rem;
    display: flex;
    gap: 1.2rem;
    color: black;
  }

  .app_form-button {
    margin: 2rem 0;
    float: right;
  }
  .remise_total {
    display: flex;
    gap: 1.2rem;
    float: right;
    flex-direction: row;

    margin-bottom: 1rem;
  }
  .remise_total > div {
    display: flex;
    flex-direction: column;
    justify-items: flex-end;
    justify-content: flex-end;
  }
  .remise-message {
    display: none;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }
  .remise_total > div > span:hover + .remise-message {
    display: block;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: absolute;
    background-color: #676767;
    padding: 0.5rem;
    font-size: 16px;
    width: fit-content;
    margin: 1rem -25rem -1.8rem;
    z-index: 999;
    font-size: 11px;
    color: white;
  }

  /******** Styling the Button in the bottom ********/
  button {
    cursor: pointer;
    background-color: #05b083;
    border-radius: 3px;
    color: white;
    font-weight: bold;
    margin: 0;
    padding: 0.6rem;
    border: none;
  }
`;

export default PostWrapper;
