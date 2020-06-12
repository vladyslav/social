import React from 'react';
import s from './FormsControl.module.css';
import { Field } from 'redux-form';

const FormsControl = ({ meta: { touched, error }, children }) => {
  const showError = touched && error;
  return (
    <div className={s.formControl + ' ' + (showError ? s.error : '')}>
      <div>{children}</div>
      <div>{showError && <span>{error}</span>}</div>
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restprops } = props;
  return (
    <FormsControl {...props}>
      <textarea {...input} {...restprops} />
    </FormsControl>
  );
};

export const Input = (props) => {
  const { input, meta, child, ...restprops } = props;
  return (
    <FormsControl {...props}>
      <input {...input} {...restprops} />
    </FormsControl>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ''
) => (
  <div>
    <Field
      placeholder={placeholder}
      name={name}
      validate={validators}
      component={component}
      {...props}
    />
    {text}
  </div>
);
