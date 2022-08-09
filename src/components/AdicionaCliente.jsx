import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup'

const Campo = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <div className='form-group'>
      <label htmlFor={props.id}>{label}</label>
      <input 
        {...field}
        {...props}
        className={ meta.error && meta.touched ? 'isError' : ''}
      />
      {meta.error && meta.touched ? (<div className='error-mensage'>{meta.error}</div>) : null}
    </div>
  )
}

const AdicionaCliente = () => {

  const handleSubmit = values => {
    alert(JSON.stringify(values))
  }

  const schema = yup.object({
    nome: yup.string()
    .required('O nome é um campo obrigatório')
    .max(50, 'O nome dever ter no maxo 50 caracteres'),
    email: yup.string()
    .required('O email é um campo obrigatório')
    .email('Insira um email valido'),
    nascimento: yup.date()
    .required('A data de nascimento é obrigatório')
    .max(new Date(), 'Data ainda não ocorreu')
  })

  return (
    <> 
      <h1>Cadastro de Clientes</h1>
      <Formik 
      onSubmit={(val) => handleSubmit(val)} 
      validationSchema={schema}
      initialValues={{ nome: '', email: '', nascimento: ''}}
      >
        {props => (
        <form onSubmit={props.handleSubmit} noValidate>
            <Campo 
            id="nome" 
            name="nome" 
            type="text" 
            label={"Nome"}
            />
            <Campo 
            id="email" 
            name="email" 
            type="email" 
            label={"Email"}
            />
            <Campo 
            id="nascimento" 
            name="nascimento" 
            type="date"
            label={"Data de Nascimento"} 
            />
          <button type="submit">Adicionar</button>
        </form>
        )}
      </Formik>
    </>
  );
};

export default AdicionaCliente;
