import React from "react";
import s from "./DialogsItem.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div>
      <NavLink activeClassName={s.activeLink} className={s.link} to={path}>
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
