import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";

import { Slider } from "shards-react";

export default function InputRange({ id, name, labelText, optionType, optionText, rangeInitial,rangeMin, rangeMax, errorList }) {
  const [optionRange, setoptionRange] = useState({ value: rangeInitial});

  // let state = { tiempo: 15, distancia: 20 };

  function handleSlide(e) {
    setoptionRange({
      value: Math.trunc(e[0])
    });
  }

  const validate = name => {
    if (!errorList[name] || errorList[name] === "init") {
      return ""
    }
    else  {
      return errorList[name] === "is-valid" ? "is-valid" : "is-invalid";
    }
  };
  const getErrorMessage = name => {
    return errorList[name] && errorList.error_messages[name] ? errorList.error_messages[name] : false;
  }

  return (
    <div className="px-2">
      {labelText ? <label htmlFor={id} className="m-0">{labelText}</label> : ""}
      <Slider
        pips={{ mode: "steps", stepped: true, density: 3 }}
        onSlide={handleSlide}
        connect={[true, false]}
        start={[optionRange.value]}
        range={{ min: rangeMin, max: rangeMax }}        
        className={`mt-3 ${validate(name)}`}
        // tooltips
      />
      {optionType
        ? <p>{optionType}: {optionRange.value} {optionText}</p>
        : "nada"}
      {/* <p>tiempo: {optionRange.value} Dias</p> */}
      {getErrorMessage(name) && (<div className="invalid-feedback">{getErrorMessage(name)}</div>)}
    </div>
  );
}
