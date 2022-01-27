import React from "react";
  
export default function ControlButtons(props) {
  const StartButton = (
    <div className="btn btn-one btn-start"
         onClick={props.handleStart}>
      Demarer
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-two" 
           onClick={props.handleReset}>
        Reset
      </div>
      <div className="btn btn-one" 
           onClick={props.handlePauseResume}>
        {props.isPaused ? "Resumer" : "Pause"}
      </div>
    </div>
  );
  
  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}