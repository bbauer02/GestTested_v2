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
    const [hasLevelsByTest, setHasLevelsByTest] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [loadingSend, setLoadingSend] = useState(false);



    const NewSessionSchema = Yup.object().shape({
        test_id: Yup.number().required().integer().positive('Le test est obligatoire'),
        level_id: Yup.number().when('test_id', {
            is: (test_id) => hasLevelsByTest,
            then: () => Yup.number().required().integer().positive('Ce test possède un niveau à sélectionner'),
        }),
        institut: Yup.object().required('L\'institut est obligatoire'),
        startDate: Yup.date().required('Une date de début de session est obligatoire!'),
        endDate: Yup.date()
            .required('Une date de fin de session est obligatoire!')
            .min(Yup.ref('startDate'), 'La date de fin ne peut pas être située avant la date de début de session!'),

        limitDateSubscribe: Yup.date()
        .required('La date limite d\'inscription est obligatoire')
        .max(Yup.ref('startDate'), 'La date limite doit être située avant la date de début de session!'),

        placeAvailable: Yup.number().required('Le nombre de place est obligatoire').integer().positive('Le nombre de place doit être supérieur à 0'),
        /* 
                sessionHasExam: Yup.array().of(
            Yup.object().shape({
                adressExam: Yup.string().required("L'adresse doit être définie!"),
                room: Yup.string().required("Le numéro ou le nom de la salle doivent être définie!"),
                examDateTime: Yup.date()
                .required('La date de convocation a cette épreuve doit être définie!')
                .max(Yup.ref('startDate'), "La date de convocation doit être située dans l'intervalle de début et de fin de la session")
                .min(Yup.ref('endDate'), "La date de convocation doit être située dans l'intervalle de début et de fin de la session")
            
            })
        )
        */

    });




    const defaultValues = useMemo(
        () => ({
            institut: null,
            test_id:  -1,
            level_id:  -1,
            startDate:  null,
            endDate:  null,
            limitDateSubscribe:  null,
            validation:  false,
            placeAvailable:  "0",
        }),
        []
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
        if (isEdit && currentSession) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentSession]);

    const handleCreateSession = async (data) => {
       
        setLoadingSend(true);

        try {
            console.log(data);
          /*  setError('level_id', {
                type: 'manual',
                message: 'Il faut sélectionner un niveau.',
            });
              return;
            /*
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            setLoadingSend(false);
           // navigate(PATH_DASHBOARD.invoice.list);
            enqueueSnackbar(!isEdit ? 'Création de la session effectuée !' : 'Mise à jour effectuée !');
            console.log('DATA', JSON.stringify(data, null, 2));
            */
        } catch (error) {
            console.error(error);
            setLoadingSend(false);
        }
    }

    return (
        <FormProvider methods={methods}>
            <Card>
                <SessionNewEditStep1 setHasLevelsByTest={setHasLevelsByTest} />
                <SessionNewEditStep2 />
            </Card>
            <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
                <LoadingButton
                    size="large"
                    variant="contained"
                    loading={loadingSend && isSubmitting}
                    onClick={handleSubmit(handleCreateSession)}
                >
                    {isEdit ? 'Update' : 'Create'} & Send
                </LoadingButton>
            </Stack>
        </FormProvider>
    )
}