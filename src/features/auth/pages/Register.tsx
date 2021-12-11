import { ChangeEvent, useState } from 'react';
import { useSignUp, useUpsert } from 'react-supabase';
import { Box } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import { FirstStep } from '../components/FirstStep';
import { SecondStep } from '../components/SecondStep';
import { StepButtons } from '../components/StepButtons';
import { ThirdStep } from '../components/ThirdStep';

const steps = [{ label: 'Typ konta' }, { label: 'Podstawowe informacje' }, { label: 'Potwierdzenie' }];

export type AccountType = 'SHELTER' | 'PRIVATE' | 'CORPORATE';
export type FormData = {
  accountType: AccountType | string;
  name: string;
  street: string;
  postCode: string;
  city: string;
  region: string;
  // Auth Data:
  email: string;
  password: string;
  phone: string;
  avatar: string;
};

const initial: FormData = {
  accountType: 'PRIVATE',
  name: 'Krzysztof Jarzyna',
  street: '',
  postCode: '',
  city: 'Szczecin',
  region: '',
  avatar: '',
  // Auth Data:
  email: 'test4@hacka.com',
  password: 'test2@hacka.com',
  phone: '',
};

export const Register = () => {
  const [form, setForm] = useState(initial);
  const [, signUp] = useSignUp();
  const [, addProfile] = useUpsert('profiles');
  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    const { email, password, phone, ...rest } = form;

    const { user } = await signUp({ email, password, phone });

    await addProfile({ id: user?.id, ...rest });
    setStep(2);
  };

  return (
    <>
      <Box border="1px" borderColor="gray.500" m={10} p={7}>
        {/* Powinno być indigo.600 w colorScheme ale nie działa, pewnie coś easy ale nie korzystałem wcześniej z chakry xD */}
        <Steps activeStep={activeStep} colorScheme="blue">
          {steps.map((option) => (
            <Step colorScheme="primary" label={option.label} />
          ))}
        </Steps>
      </Box>

      {activeStep === 0 && (
        <FirstStep form={form} handleChange={handleChange} buttons={<StepButtons nextStep={nextStep} />} />
      )}
      {activeStep === 1 && (
        <SecondStep
          form={form}
          handleChange={handleChange}
          buttons={<StepButtons prevStep={prevStep} nextStep={registerUser} />}
        />
      )}
      {activeStep === 2 && <ThirdStep buttons={<StepButtons prevStep={prevStep} />} isPrivateAccount />}
    </>
  );
};
