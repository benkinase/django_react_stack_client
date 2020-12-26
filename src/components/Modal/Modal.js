import React from "react";
import classes from "./Modal.module.css";
import classy from "./Backdrop.module.css";

export const Backdrop = (props) => {
  return props.show ? (
    <div className={classy.Backdrop} onClick={() => props.clicked()}></div> //
  ) : null;
};
const modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default modal;
