import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cepPromise from 'cep-promise';
import { FormHandles } from '@unform/core';
import { Checkbox, useToast } from '@chakra-ui/react';
import {
  FiActivity,
  FiBriefcase,
  FiCalendar,
  FiClipboard,
  FiDollarSign,
  FiFlag,
  FiHeart,
  FiInfo,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSmartphone,
  FiSmile,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Alert from 'Components/Atoms/Alert';
import Subtitle from 'Components/Atoms/Subtitle';
import FormGroup from 'Components/Atoms/FormGroup';
import InputGroup from 'Components/Atoms/InputGroup';
import Form from 'Components/Molecules/Form';
import Card from 'Components/Molecules/Card';
import Input from 'Components/Molecules/Input';
import Button from 'Components/Molecules/Button';
import Select, { ISelectOption } from 'Components/Molecules/Select';
import Radio, { IRadioOption } from 'Components/Molecules/Radio';
import IEnrollment from 'Types/IEnrollment';
import api from 'Services/api';
import { useErrors } from 'Hooks/errors';
import createEnrollmentSchema from 'Schemas/createEnrollmentSchema';

const EnrollmentForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { handleErrors } = useErrors();
  const toast = useToast();
  const history = useHistory();

  const [showHealthPlan, setShowHealthPlan] = useState(false);
  const [showFoodAlergy, setShowFoodAlergy] = useState(false);
  const [showHealthProblem, setShowHealthProblem] = useState(false);
  const [showMedicationAlergy, setShowMedicationAlergy] = useState(false);
  const [showSpecialNecessities, setShowSpecialNecessities] = useState(false);
  const [reuseAddress, setReuseAddress] = useState(false);
  const [loading, setLoading] = useState(false);

  const educationLevelOptions = useMemo<ISelectOption[]>(
    () => [
      {
        text: 'Fundamental incompleto',
        value: 'elementary_incompleted',
      },
      {
        text: 'Fundamental completo',
        value: 'elementary_completed',
      },
      {
        text: 'Segundo grau incompleto',
        value: 'highschool_incompleted',
      },
      {
        text: 'Segundo grau completo',
        value: 'highschool_completed',
      },
      {
        text: 'Superior incompleto',
        value: 'university_incompleted',
      },
      {
        text: 'Superior completo',
        value: 'university_completed',
      },
    ],
    [],
  );
  const genderOptions = useMemo<ISelectOption[]>(
    () => [
      {
        text: 'Masculino',
        value: 'male',
      },
      {
        text: 'Feminino',
        value: 'female',
      },
    ],
    [],
  );
  const raceOptions = useMemo<ISelectOption[]>(
    () => [
      {
        text: 'Branco',
        value: 'white',
      },
      {
        text: 'Pardo',
        value: 'brown',
      },
      {
        text: 'Negro',
        value: 'black',
      },
      {
        text: 'Indígena',
        value: 'indigenous',
      },

      {
        text: 'Amarelo',
        value: 'yellow',
      },
    ],
    [],
  );
  const gradeOptions = useMemo<ISelectOption[]>(
    () => [
      {
        value: 'maternal',
        text: 'Maternal 2022',
      },
      {
        value: 'first_period',
        text: '1º período 2022',
      },
      {
        value: 'second_period',
        text: '2º período 2022',
      },
      {
        value: 'first_year',
        text: '1º ano 2022',
      },
      {
        value: 'second_year',
        text: '2º ano 2022',
      },
      {
        value: 'third_year',
        text: '3º ano 2022',
      },
      {
        value: 'fourth_year',
        text: '4º ano 2022',
      },
      {
        value: 'fifth_year',
        text: '5º ano 2022',
      },
      {
        value: 'sixth_year',
        text: '6º ano 2022',
      },
      {
        value: 'seventh_year',
        text: '7º ano 2022',
      },
      {
        value: 'eighth_year',
        text: '8º ano 2022',
      },
      {
        value: 'nineth_year',
        text: '9º ano 2022',
      },
    ],
    [],
  );
  const radioOptions = useMemo<IRadioOption[]>(
    () => [
      {
        text: 'Sim',
        value: 'true',
      },
      {
        text: 'Não',
        value: 'false',
      },
    ],
    [],
  );
  const reverseRadioOptions = useMemo<IRadioOption[]>(
    () => [
      {
        text: 'Sim',
        value: 'false',
      },
      {
        text: 'Não',
        value: 'true',
      },
    ],
    [],
  );

  const handleSearchAddressByCep = useCallback(
    async (cep: string, responsibleType: 'financial' | 'supportive') => {
      try {
        const result = await cepPromise(cep);
        const { street, neighborhood, city } = result;

        formRef.current?.setFieldValue(
          `${responsibleType}_address_street`,
          street,
        );
        formRef.current?.setFieldValue(
          `${responsibleType}_address_neighborhood`,
          neighborhood,
        );
        formRef.current?.setFieldValue(`${responsibleType}_address_city`, city);
      } catch {}
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: IEnrollment) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});
        await createEnrollmentSchema.validate(data, {
          abortEarly: false,
        });
        data.financial_income_tax = data.financial_income_tax === 'true';
        data.student_ease_relating = data.student_ease_relating === 'true';
        data.type = 'enrollment';
        data.student_health_plan = showHealthPlan
          ? data.student_health_plan
          : '';
        data.student_food_alergy = showFoodAlergy
          ? data.student_food_alergy
          : '';
        data.student_medication_alergy = showMedicationAlergy
          ? data.student_medication_alergy
          : '';
        data.student_health_problem = showHealthProblem
          ? data.student_health_problem
          : '';
        data.student_special_necessities = showSpecialNecessities
          ? data.student_special_necessities
          : '';
        data.enrollment_year = '2022';
        await api.post('/reenrollments', data);

        toast({
          title: 'Pedido de matrícula enviada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });

        formRef.current?.reset();

        history.push('/success');
      } catch (err) {
        handleErrors('Erro ao tentar enviar matrícula', err, formRef);
      } finally {
        setLoading(false);
      }
    },
    [
      toast,
      handleErrors,
      showHealthPlan,
      showFoodAlergy,
      showHealthProblem,
      showMedicationAlergy,
      showSpecialNecessities,
      history,
    ],
  );

  useEffect(() => {
    if (!reuseAddress) {
      return;
    }
    const street = formRef.current?.getFieldValue('financial_address_street');
    const number = formRef.current?.getFieldValue('financial_address_number');
    const complement = formRef.current?.getFieldValue(
      'financial_address_complement',
    );
    const neighborhood = formRef.current?.getFieldValue(
      'financial_address_neighborhood',
    );
    const city = formRef.current?.getFieldValue('financial_address_city');
    const cep = formRef.current?.getFieldValue('financial_address_cep');

    formRef.current?.setFieldValue('supportive_address_street', street);
    formRef.current?.setFieldValue('supportive_address_number', number);
    formRef.current?.setFieldValue('supportive_address_complement', complement);
    formRef.current?.setFieldValue(
      'supportive_address_neighborhood',
      neighborhood,
    );
    formRef.current?.setFieldValue('supportive_address_city', city);
    formRef.current?.setFieldValue('supportive_address_cep', cep);
  }, [reuseAddress]);

  return (
    <Card>
      <Alert status="info">
        Preencha os dados para a elaboração do contrato de 2022.
      </Alert>

      <Form ref={formRef} onSubmit={handleSubmit} spacing="40px">
        <FormGroup>
          <Subtitle>Dados do responsável financeiro</Subtitle>
          <InputGroup>
            <Input
              icon={FiUser}
              type="text"
              name="financial_name"
              label="Nome"
            />
            <Input
              icon={FiUsers}
              type="text"
              name="financial_kinship"
              label="Parentesco com o aluno"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiClipboard}
              type="text"
              name="financial_rg"
              label="RG"
            />
            <Input
              icon={FiClipboard}
              type="text"
              name="financial_cpf"
              label="CPF"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiFlag}
              type="text"
              name="financial_nacionality"
              label="Nacionalidade"
            />
            <Input
              icon={FiHeart}
              type="text"
              name="financial_civil_state"
              label="Estado civil"
            />
          </InputGroup>
          <InputGroup>
            <Select
              icon={FiInfo}
              name="financial_education_level"
              label="Grau de instrução"
              placeholder="Selecionar"
              options={educationLevelOptions}
            />
            <Input
              icon={FiBriefcase}
              type="text"
              name="financial_profission"
              label="Profissão"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiBriefcase}
              type="text"
              name="financial_workplace"
              label="Local de trabalho"
            />
            <Input
              icon={FiPhone}
              type="text"
              name="financial_commercial_phone"
              label="Telefone comercial"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiPhone}
              type="text"
              name="financial_residencial_phone"
              label="Telefone residencial"
            />
            <Input
              icon={FiSmartphone}
              type="text"
              name="financial_personal_phone"
              label="Telefone pessoal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_cep"
              label="CEP"
              onBlur={e =>
                handleSearchAddressByCep(e.target.value, 'financial')
              }
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_street"
              label="Rua"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="number"
              name="financial_address_number"
              label="Número"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_complement"
              label="Complemento"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_neighborhood"
              label="Bairro"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="financial_address_city"
              label="Cidade"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMail}
              type="email"
              name="financial_email"
              label="E-mail"
            />
            <Input
              icon={FiDollarSign}
              type="number"
              name="financial_monthly_income"
              label="Renda mensal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiCalendar}
              type="date"
              name="financial_birth_date"
              label="Data de nascimento"
            />
          </InputGroup>
          <InputGroup>
            <Radio
              name="financial_income_tax"
              label="Declara imposto de renda?"
              options={radioOptions}
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Subtitle>Dados do responsável solidário</Subtitle>
          <InputGroup>
            <Input
              icon={FiUser}
              type="text"
              name="supportive_name"
              label="Nome"
            />
            <Input
              icon={FiUsers}
              type="text"
              name="supportive_kinship"
              label="Parentesco com o aluno"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiClipboard}
              type="text"
              name="supportive_rg"
              label="RG"
            />
            <Input
              icon={FiClipboard}
              type="text"
              name="supportive_cpf"
              label="CPF"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiFlag}
              type="text"
              name="supportive_nacionality"
              label="Nacionalidade"
            />
            <Input
              icon={FiHeart}
              type="text"
              name="supportive_civil_state"
              label="Estado civil"
            />
          </InputGroup>
          <InputGroup>
            <Select
              icon={FiInfo}
              name="supportive_education_level"
              label="Grau de instrução"
              placeholder="Selecionar"
              options={educationLevelOptions}
            />
            <Input
              icon={FiBriefcase}
              type="text"
              name="supportive_profission"
              label="Profissão"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiBriefcase}
              type="text"
              name="supportive_workplace"
              label="Local de trabalho"
            />
            <Input
              icon={FiPhone}
              type="text"
              name="supportive_commercial_phone"
              label="Telefone comercial"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiPhone}
              type="text"
              name="supportive_residencial_phone"
              label="Telefone residencial"
            />
            <Input
              icon={FiSmartphone}
              type="text"
              name="supportive_personal_phone"
              label="Telefone pessoal"
            />
          </InputGroup>
          <InputGroup>
            <Checkbox onChange={e => setReuseAddress(e.target.checked)}>
              Utilizar o mesmo endereço do responsável financeiro?
            </Checkbox>
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_cep"
              label="CEP"
              onBlur={e =>
                handleSearchAddressByCep(e.target.value, 'supportive')
              }
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_street"
              label="Rua"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="number"
              name="supportive_address_number"
              label="Número"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_complement"
              label="Complemento"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_neighborhood"
              label="Bairro"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="supportive_address_city"
              label="Cidade"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMail}
              type="email"
              name="supportive_email"
              label="E-mail"
            />
            <Input
              icon={FiDollarSign}
              type="number"
              name="supportive_monthly_income"
              label="Renda mensal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiCalendar}
              type="date"
              name="supportive_birth_date"
              label="Data de nascimento"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Subtitle>Dados do estudante</Subtitle>
          <InputGroup>
            <Input icon={FiUser} type="text" name="student_name" label="Nome" />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiClipboard}
              type="text"
              name="student_cpf"
              label="CPF (se tiver)"
            />
            <Input
              icon={FiFlag}
              type="text"
              name="student_nacionality"
              label="Nacionalidade"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiMapPin}
              type="text"
              name="student_birth_city"
              label="Cidade natal"
            />
            <Input
              icon={FiMapPin}
              type="text"
              name="student_birth_state"
              label="Estado natal"
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiUsers}
              type="text"
              name="student_father_name"
              label="Nome do pai"
            />
            <Input
              icon={FiUsers}
              type="text"
              name="student_mother_name"
              label="Nome da mãe"
            />
          </InputGroup>
          <InputGroup>
            <Select
              icon={FiInfo}
              name="student_gender"
              label="Gênero"
              placeholder="Selecionar"
              options={genderOptions}
            />
            <Select
              icon={FiInfo}
              name="student_race"
              label="Raça"
              placeholder="Selecionar"
              options={raceOptions}
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiCalendar}
              type="date"
              name="student_birth_date"
              label="Data de nascimento"
            />
            <Select
              icon={FiSmile}
              name="grade_name"
              label="Turma desejada para 2022"
              placeholder="Selecionar"
              options={gradeOptions}
            />
          </InputGroup>
          <InputGroup>
            <Input
              icon={FiUsers}
              type="text"
              name="how_meet_school"
              label="Como conheceu a escola?"
            />
            <Input
              type="text"
              name="student_origin_school"
              label="Escola de origem"
              icon={FiMapPin}
            />
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_health_plan"
              label="Possui algum plano de saúde?"
              options={radioOptions}
              onChange={value => setShowHealthPlan(value === 'true')}
            />
            {showHealthPlan && (
              <Input
                type="text"
                name="student_health_plan"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_medication_alergy"
              label="Possui alergia a algum medicamento?"
              options={radioOptions}
              onChange={value => setShowMedicationAlergy(value === 'true')}
            />
            {showMedicationAlergy && (
              <Input
                type="text"
                name="student_medication_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_food_alergy"
              label="Possui alergia a algum alimento?"
              options={radioOptions}
              onChange={value => setShowFoodAlergy(value === 'true')}
            />
            {showFoodAlergy && (
              <Input
                type="text"
                name="student_food_alergy"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_health_problem"
              label="Possui algum problema de saúde?"
              options={radioOptions}
              onChange={value => setShowHealthProblem(value === 'true')}
            />
            {showHealthProblem && (
              <Input
                type="text"
                name="student_health_problem"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="has_special_necessities"
              label="Possui alguma necessidade especial?"
              options={radioOptions}
              onChange={value => setShowSpecialNecessities(value === 'true')}
            />
            {showSpecialNecessities && (
              <Input
                type="text"
                name="student_special_necessities"
                placeholder="Qual?"
                icon={FiActivity}
              />
            )}
          </InputGroup>
          <InputGroup>
            <Radio
              name="student_ease_relating"
              label="Tem dificuldade de se relacionar?"
              options={reverseRadioOptions}
            />
          </InputGroup>
        </FormGroup>

        <Button isLoading={loading} w="100%" type="submit" isPrimary>
          Enviar
        </Button>
      </Form>
    </Card>
  );
};

export default EnrollmentForm;
