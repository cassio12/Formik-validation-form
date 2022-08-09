import React from 'react';
import { Formik, useField } from 'formik';

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

  const handleValidade = values => {
    const erros = {}
    if(!values.nome)
      erros.nome = 'O nome é um campo obrigatório'
    if(!values.email){
      erros.email = 'O email é um campo obrigatório'
    } else if(!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,}$/i.test(values.email)) {
      erros.email = 'O email invalido'
    }
    if(!values.nascimento)
      erros.nascimento = 'A data de nascimento é obrigatório'

    return erros;
  }  

  return (
    <> 
      <h1>Cadastro de Clientes</h1>
      <Formik 
      onSubmit={(val) => handleSubmit(val)} 
      validate={(val) => handleValidade(val)}
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
