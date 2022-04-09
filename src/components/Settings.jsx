import React from "react";
import "./Settings.css";
const Settings = () => {
  return (
    <div className='app__settings'>
      <div className='app__settings_mail'>
        <label>PRÉVISUALISATION PAR COURRIER ÉLECTRONIQUE</label>
        <hr />
        <input type='text' placeholder='nom@enterprise.com' />
        <button type='button'>Envoyer</button>
      </div>
      <div>
        <label>color</label>
        <hr />
      </div>
      <div>Currency</div>
    </div>
  );
};

export default Settings;
