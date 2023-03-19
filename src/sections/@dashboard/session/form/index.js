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
    const [loadingSave, setLoadingSave] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const [loadingSend, setLoadingSend] = useState(false);

    const NewSessionSchema = Yup.object().shape({

    });

    const defaultValues = useMemo(
        () => ({
            institut: null,
            test_id:  -1,
            level_id:  -1,
            start:  new Date(),
            end:  new Date(),
            limitDateSubscribe:  new Date(),
            validation:  false,
            placeAvailable:  "0"
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
        formState: { isSubmitting },
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
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            setLoadingSend(false);
           // navigate(PATH_DASHBOARD.invoice.list);
            enqueueSnackbar(!isEdit ? 'Création de la session effectuée !' : 'Mise à jour effectuée !');
            console.log('DATA', JSON.stringify(data, null, 2));
        } catch (error) {
            console.error(error);
            setLoadingSend(false);
        }
    }

    return (
        <FormProvider methods={methods}>
            <Card>
                <SessionNewEditStep1 />
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