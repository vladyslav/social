import React, { FC } from 'react';
import s from './FormsControl.module.css';
import { Field, WrappedFieldProps, WrappedFieldMetaProps } from 'redux-form';
import { FieldValidatorType } from '../../../helpers/validators';

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

const FormControl: FC<FormControlPropsType> = ({
  meta: { touched, error },
  children
}) => {
  const showError = touched && error;
  return (
    <div className={s.formControl + ' ' + (showError ? s.error : '')}>
      <div>{children}</div>
      <div>{showError && <span>{error}</span>}</div>
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = props => {
  // const { input, meta, child, ...restprops } = props;
  const { input, meta, ...restprops } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restprops} />
    </FormControl>
  );
};

export const Input: FC<WrappedFieldProps> = props => {
  // const { input, meta, child, ...restprops } = props;
  const { input, meta, ...restprops } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restprops} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: FC<WrappedFieldProps>,
  props = {},
  text = ''
) {
  return (
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
}

export type GetStringKeys<T> = Extract<keyof T, string>;
