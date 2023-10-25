/* eslint-disable react/prop-types */
import { useState, createContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    institutCountry: { label: '', country_id: null },
    instituts: [],
    test: {test_id: null, label: '', child: {test_id: null, label: ''}, level: {level_id: null, label: ''}},
    exams: [],
    session: { session_id:null },
    user: {},
    amount: 0
};

export const RegisterFormContext = createContext({
    ...initialState,
    setInstitutCountry: () => {},
    setTest: () => {},
    setSession: () => {},
    setExams: () => {},
    addInstitut: () => {},
    removeInstitut: () => {},
    addSession: () => {},
    removeSession: () => {},
    selectAllInstitut: () => {},
    setUser: () => {},
    setAmount: () => {}
});
// export const useRegisterInstitutList = () => useContext(RegisterFormContext);

RegisterFormContextProvider.propTypes = {
    children: PropTypes.node
};
function RegisterFormContextProvider({ children }) {
    const [selected, setSelected] = useState(initialState);

    const setInstitutCountry = useCallback((country) => {
        const newSelected = { ...selected, institutCountry: country };
        setSelected(newSelected);
    }, [selected, setSelected]);

    const addInstitut = useCallback((id) => {
        const newSelected = { ...selected, instituts: [...selected.instituts, id] };
        setSelected(newSelected);
    }, [selected, setSelected]);

    const selectAllInstitut = useCallback((institutsId) => {
        const newSelected = { ...selected, instituts: [...institutsId] };
        setSelected(newSelected);
    }, [selected, setSelected]);

    const removeInstitut = useCallback((id = null) => {
        let newSelected;
        if (id) {
            const instituts = selected.instituts.filter((selectedInstitutsId) => selectedInstitutsId !== id);
            const { institutCountry, sessions } = selected;
            newSelected = { institutCountry, sessions, instituts };
        } else {
            const { institutCountry, sessions } = selected;
            newSelected = { institutCountry, sessions, instituts: [] };
        }
        setSelected(newSelected);
    }, [selected, setSelected]);

    const setTest = useCallback((test) => {
        const newSelected = { ...selected, test, exams: [], session: { session_id: null } };
        setSelected(newSelected);
    }, [selected, setSelected]);

    const setSession = useCallback((session) => {
        const newSelected = { ...selected, session, exams: [], amount: 0 };
        setSelected(newSelected);
    }, [selected, setSelected]);

    const setExams = useCallback((exam) => {
        const examsMerge = [...selected.exams, ...exam];
        let amount = 0;
        examsMerge.forEach((_exam) => {
            if (_exam.InstitutHasPrices.length > 0) {
                amount += _exam.InstitutHasPrices[0].price;
            } else {
                amount += _exam.price;
            }
        });
        const newSelected = { ...selected, exams: examsMerge, amount };
        setSelected(newSelected);
    }, [selected, setSelected]);


    const removeExam = useCallback((exam) => {
        const exams = selected.exams.filter((sel) => sel.exam_id !== exam.exam_id);
        let amount = 0;

        exams.forEach((_exam) => {
            if (_exam.InstitutHasPrices.length > 0) {
                amount += _exam.InstitutHasPrices[0].price;
            } else {
                amount += _exam.price;
            }
        });

        const selectedExam = { ...selected, exams, amount };
        setSelected(selectedExam);
    }, [selected, setSelected]);

    const resetExams = useCallback(() => {
        const exams = [];
        const amount = 0;
        const selectedExam = { ...selected, exams, amount };
        setSelected(selectedExam);
    }, [selected, setSelected]);


    const setUser = useCallback(
        (user) => {
            const selectedUser = { ...selected, user };
            setSelected(selectedUser);
        },
        [selected, setSelected]
    );

    const setAmount = useCallback(
        (amount) => {
            const selectedAmount = { ...selected, amount };
            setSelected(selectedAmount);
        },
        [selected, setSelected]
    );





    const value = useMemo(() => ({
        selected,
        addInstitut,
        removeInstitut,
        selectAllInstitut,
        setInstitutCountry,
        setTest,
        setSession,
        setExams,
        removeExam,
        resetExams,
        setUser,
        setAmount
    }), [selected, addInstitut, removeInstitut, selectAllInstitut, setInstitutCountry, setTest, setSession, setExams, removeExam, resetExams, setUser, setAmount]);

    return <RegisterFormContext.Provider value={value}>{children}</RegisterFormContext.Provider>;
}

export default RegisterFormContextProvider;
