import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {postSession, putSession} from '../../../../redux/slices/session';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import FormProvider from '../../../../components/hook-form';
//
import SessionNewEditStep1 from './SessionNewEditStep1';
import SessionNewEditStep2 from './SessionNewEditStep2';

SessionNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentSession: PropTypes.object,
};

export default function SessionNewEditForm({ isEdit, currentSession=null }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hasLevelsByTest, setHasLevelsByTest] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [loadingSend, setLoadingSend] = useState(false);

    const [hasExams, setHasExams] = useState(false);

    const NewSessionSchema = Yup.object().shape({
        test_id: Yup.number().required().integer().positive('Le test est obligatoire'),
        level_id: Yup.number().when('test_id', {
            is: (test_id) => hasLevelsByTest,
            then: () => Yup.number().required().integer().positive('Ce test possède un niveau à sélectionner'),
        }),
        institut: Yup.object().required('L\'institut est obligatoire'),
        startDate: Yup.date('Une date de début de session est obligatoire!').required('Une date de début de session est obligatoire!'),
        endDate: Yup.date('Une date de début de session est obligatoire!')
            .required('Une date de fin de session est obligatoire!')
            .min(Yup.ref('startDate'), 'La date de fin ne peut pas être située avant la date de début de session!'),
        limitDateSubscribe: Yup.date()
        .required('La date limite d\'inscription est obligatoire')
        .max(Yup.ref('startDate'), 'La date limite doit être située avant la date de début de session!'),
        placeAvailable: Yup.number().required('Le nombre de place est obligatoire').integer().positive('Le nombre de place doit être supérieur à 0'),

    });

    const defaultValues = useMemo(

        () => ({
            institut: {label: currentSession?.Institut?.label || "Institut Français", institut_id:currentSession?.institut_id || 1},
            test_id:   currentSession?.test_id || -1,
            level_id:  currentSession?.level_id || -1,
            startDate: currentSession?.start || new Date(),
            endDate:  currentSession?.end || new Date(),
            limitDateSubscribe: currentSession?.limitDateSubscribe || new Date(),
            validation:  currentSession?.validation || false,
            placeAvailable:  currentSession?.placeAvailable || "10",
            sessionHasExams: currentSession?.sessionHasExams || [
                {examId : "", exam: "", adressExam: '', room:'', DateTime: new Date()}
            ]
        }),
        [currentSession]
    );

    const methods = useForm({
        resolver: yupResolver(NewSessionSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        setError,
        formState: { errors ,isSubmitting },
    } = methods;

    useEffect(() => {
        reset(defaultValues)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSession]);

    const handleCreateSession = async (data) => {
        setLoadingSend(true);
        try {
            const newSession = {
                session: {
                    institut_id: data.institut.institut_id,
                    start : data.startDate,
                    end: data.endDate,
                    limitDateSubscribe: data.limitDateSubscribe,
                    placeAvailable: data.placeAvailable,
                    validation: data.validation,
                    test_id: data.test_id,
                    level_id: data.level_id,
                },
                sessionHasExams:data.sessionHasExams
            }
            if(isEdit) {
                newSession.session.session_id = currentSession.session_id;
            }
            if(newSession.session.level_id === -1 ) {
                newSession.session.level_id = null;
            }
            if(!isEdit) {
                dispatch(postSession(newSession.session.institut_id,newSession));
            }
            else {
                dispatch(putSession(currentSession.institut_id, currentSession.session_id,newSession));
            }
            enqueueSnackbar(!isEdit ? 'Création de la session effectuée !' : 'Mise à jour effectuée !');
            navigate(PATH_DASHBOARD.admin.session.list);
            setLoadingSend(false);
        } catch (error) {
            console.error(error);
            setLoadingSend(false);
        }
    }

    return (
        <FormProvider methods={methods}>
            <Card>
                <SessionNewEditStep1 setHasLevelsByTest={setHasLevelsByTest} />
                <SessionNewEditStep2  setHasExams={setHasExams} hasExams={hasExams} isEdit={isEdit}  currentSession={currentSession} />
            </Card>
            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                <LoadingButton
                    disabled={!hasExams}
                    size="large"
                    variant="contained"
                    loading={loadingSend && isSubmitting}
                    onClick={handleSubmit(handleCreateSession)}
                >
                    {isEdit ? 'Editer' : 'Créer'} une session
                </LoadingButton>
            </Stack>
        </FormProvider>
    )
}