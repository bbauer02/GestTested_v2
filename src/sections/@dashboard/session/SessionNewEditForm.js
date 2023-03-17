import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Button, Grid, Stack, Typography, InputAdornment } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getInstituts } from '../../../redux/slices/institut';
import { getTests } from '../../../redux/slices/test';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import FormProvider, {
    RHFSelect,
    RHFTextField,
    RHFAutocomplete
} from '../../../components/hook-form';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
// ----------------------------------------------------------------------

SessionNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentInstitut: PropTypes.object,
};
export default function SessionNewEditForm({ isEdit, currentInstitut=null }) {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    // Get the Instituts List 
    const { instituts } = useSelector((state) => state.institut);
    useEffect( () => {
        dispatch(getInstituts());
    }, [dispatch]);

    // Get the Tests List
    const { tests } = useSelector((state) => state.test);
    useEffect( () => {
        dispatch(getTests());
    }, [dispatch])


    const NewSessionSchema = Yup.object().shape({

    });

    const defaultValues = useMemo(
        () => ({
            institut: null,
            test_id: "",
            level_id: ""

        }), []
    );
    
    const methods = useForm({
        resolver: yupResolver(NewSessionSchema),
        defaultValues
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    const onSubmit = async (data) => {
        try {
            enqueueSnackbar(!isEdit ? 'Création de la session effectuée !' : 'Mise à jour effectuée !');
            console.log(data)
          //  navigate(PATH_DASHBOARD.admin.exam.root);
        } catch(error) {
            console.error(error);
        }
    };

    let levelsByTest = []
    let hasLevels = false;
    if(values.test_id ) {
        const selectedTest = tests.find(test => test.test_id === parseInt(values.test_id,10));
        if(selectedTest) {
            levelsByTest = [...selectedTest.Levels];
        }
        if(levelsByTest.length > 0 ) {
            hasLevels =true;
        }
    }



      

    return (
       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Typography variant="h5">Remplir les Informations</Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                <RHFAutocomplete
                                sx={{ width: 500 }}
                                name="institut"
                                label="Institut organisateur"
                                options={instituts}
                                getOptionLabel={(institut) => institut.label}
                                isOptionEqualToValue={(option, value) => option.institut_id === value.institut_id}
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                <RHFSelect  native name="test_id" label="Test" >
                                    <option value="-1">Sélectionnez un test</option>
                                    {Object.values(tests).map((test) => (
                                        <option key={`test${test.test_id}`} value={test.test_id}>
                                            {test.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <RHFSelect native name="level_id" label="Niveau"  disabled={ (!hasLevels )}>
                                    <option value="-1">Sélectionnez un niveau</option>
                                    {Object.values(levelsByTest).map((level) => (
                                        <option key={`level${level.level_id}`} value={level.level_id}>
                                            {level.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                                <LoadingButton type="submit" variant="contained" fullWidth size="large" loading={isSubmitting}>
                                    {!isEdit ? 'Créer une session' : 'Enregistrer les changements'}
                                </LoadingButton>
                                <LoadingButton type="button" variant="contained" fullWidth size="large" color="error" loading={isSubmitting} onClick={() => navigate(PATH_DASHBOARD.admin.exam.root)}>
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
