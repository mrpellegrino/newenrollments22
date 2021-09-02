import * as yup from 'yup';

export default yup.object().shape({
  financial_cpf: yup.string().required('CPF obrigatório'),
  financial_birth_date: yup.string().required('Data obrigatória'),
});
