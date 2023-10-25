import { useContext } from 'react';
import { RegisterFormContext } from '../contexts/RegisterFormContext';

const useRegisterForm = () => useContext(RegisterFormContext);

export default useRegisterForm;
