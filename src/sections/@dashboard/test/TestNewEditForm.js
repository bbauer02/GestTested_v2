import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
// new
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {Card, Button, Grid, Stack, Typography, InputAdornment, Switch} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getTests, postTest, putTest } from '../../../redux/slices/test';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import FormProvider, {
    RHFSelect, RHFSwitch,
    RHFTextField
} from '../../../components/hook-form';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
// ----------------------------------------------------------------------

TestNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentTest: PropTypes.object,
};
export default function TestNewEditForm({ isEdit, currentTest=null }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    // Get the Tests List
    useEffect( () => {
        dispatch(getTests(true));
    }, [dispatch]);
    const { tests } = useSelector((state) => state.test);
    const { enqueueSnackbar } = useSnackbar();


    const NewTestSchema = Yup.object().shape({

    });

    const defaultValues = useMemo(
        () => ({
            isInternal: currentTest?.isInternal || false,
            label: currentTest?.label || "",
            parent_id: currentTest?.parent_id ||-1,

        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentTest]
    );

    const methods = useForm({
        resolver: yupResolver(NewTestSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentTest) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentTest]);

    const onSubmit = async (data) => {
        try {
            if(isEdit) {
                data.test_id  = currentTest.test_id;
               dispatch(putTest(data));
            }
            else {
                dispatch(postTest(data));
            }
            reset();
            enqueueSnackbar(!isEdit ? 'Création du test effecté !' : 'Mise à jour effectée !');
            navigate(PATH_DASHBOARD.admin.test.root);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Typography variant="h5">Création d&apos;un test</Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                <RHFSwitch
                                    color="secondary"
                                    name="isInternal"
                                    label="Interne?"
                                    labelPlacement="end"
                                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                                    labelPlacement="start"
                                />

                                <RHFTextField name="label" label="Nom du test" variant="outlined" fullWidth
                                  InputProps={{
                                      startAdornment: <InputAdornment position="start"><Iconify icon='streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard' width={20} height={20} /></InputAdornment>,
                                  }}/>

                                <RHFSelect
                                    native
                                    name="parent_id"
                                    label="Test parent"
                                >
                                    <option value="-1">Aucun parent</option>
                                    {Object.values(tests).map((test) => (
                                        <option key={`test${test.test_id}`} value={test.test_id}>
                                            {test.label}
                                        </option>
                                    ))}
                                </RHFSelect>

                            </Stack>





                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                                <LoadingButton type="submit" variant="contained" fullWidth size="large" loading={isSubmitting}>
                                    {!isEdit ? 'Créer un test' : 'Enregistrer les changements'}
                                </LoadingButton>
                                <LoadingButton type="button" variant="contained" fullWidth size="large" color="error" loading={isSubmitting} onClick={() => navigate(PATH_DASHBOARD.admin.test.root)}>
                                    Retour
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
