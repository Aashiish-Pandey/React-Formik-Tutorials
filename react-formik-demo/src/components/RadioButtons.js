import React from 'react';

function RadioButtons(props) {
    const{label, name, options, ...rest} = props
  return <div className='form-control'>

      <label>{label}</label>
      {/* <Field name ={name} {...rest}>
          {

              ({field})=> {
                
                  return () 
              }
          }
      </Field> */}
  </div>;
}

export default RadioButtons;
