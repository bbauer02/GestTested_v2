/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography, InputAdornment  } from '@mui/material';

// Icons
import TimerIcon from '@mui/icons-material/Timer';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import TimesOneMobiledataIcon from '@mui/icons-material/TimesOneMobiledata';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { postExam,putExam } from '../../../redux/slices/exam';
import { getTests } from '../../../redux/slices/test';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import FormProvider, {
    RHFSelect,
    RHFTextField,
    RHFRadioGroup,
    RHFSwitch
} from '../../../components/hook-form';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
// ----------------------------------------------------------------------

ExamNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentExam: PropTypes.object,
};

export default function ExamNewEditForm({ isEdit, currentExam=null }) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { tests } = useSelector((state) => state.test);

    useEffect(() => {
        dispatch(getTests(true));
    }, [dispatch]);

    const NewExamSchema = Yup.object().shape({
        label: Yup.string().required('Le nom est requis').min(2),
        isWritten: Yup.bool().required(),
        isOption: Yup.bool().required(),
        price: Yup.number().required('Le prix en € est requis').positive(),
        coeff: Yup.number().required('Le coefficient est requis').positive(),
        nbrQuestions: Yup.number().positive().integer(),
        duration: Yup.number().required('La durée en minute est requise').positive().integer(),
        successScore: Yup.number().required('Le score est requis').positive(),
        test_id: Yup.number().required('Le test est requis').positive().integer()
    });

    const defaultValues = useMemo(
        () => ({
            isOption: currentExam?.isOption || false,
            label: currentExam?.label || '',
            isWritten: currentExam?.isWritten || true,
            test_id: currentExam?.test_id || '',
            level_id: currentExam?.level_id || '',
            price: currentExam?.price || '',
            coeff: currentExam?.coeff || '',
            nbrQuestions: currentExam?.nbrQuestions || '',
            duration: currentExam?.duration || '',
            successScore: currentExam?.successScore || ''
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentExam]
    );

    const methods = useForm({
        resolver: yupResolver(NewExamSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentExam) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentExam]);

    const onSubmit = async (data) => {
        try {
            if(parseInt(data.level_id,10) === -1 || data.level_id === "") {
                delete data.level_id;
            }
             if(isEdit) {
                const {exam_id} =  currentExam;
               dispatch(putExam({...data, exam_id}));
             }
             else {
               dispatch(postExam(data));
             }
             reset();
             enqueueSnackbar(!isEdit ? 'Création de l\'épreuve effectée !' : 'Mise à jour effectée !');
             navigate(PATH_DASHBOARD.admin.exam.root);
        } catch (error) {
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

                            <RHFSwitch name="isOption" label="Optionnel" />
                            <RHFTextField name="label" label="Nom de l'épreuve"  />
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
                            <RHFRadioGroup
                                name="isWritten"
                                options={[
                                    {
                                        label: "Epreuve écrite", value: true
                                    },
                                    {
                                        label: "Epreuve orale" , value: false
                                    }
                                ]}
                                sx={{
                                    '& .MuiFormControlLabel-root': { mr: 4 },
                                }}
                            />
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                <RHFTextField
                                    name="price"
                                    label="Prix"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">€</InputAdornment>
                                    }}/>
                                <RHFTextField
                                    name="duration"
                                    label="Durée en minutes"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"><TimerIcon /></InputAdornment>
                                    }}
                                />
                                <RHFTextField
                                    name="nbrQuestions"
                                    label="Nombre de question"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"><QuestionMarkIcon /></InputAdornment>
                                    }}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                                <RHFTextField
                                    name="successScore"
                                    label="Score"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"><SportsScoreIcon /></InputAdornment>
                                    }}
                                />
                                <RHFTextField
                                    name="coeff"
                                    label="Coefficient"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"><TimesOneMobiledataIcon /></InputAdornment>
                                    }}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                                <LoadingButton type="submit" variant="contained" fullWidth size="large" loading={isSubmitting}>
                                    {!isEdit ? 'Créer une épreuve' : 'Enregistrer les changements'}
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
