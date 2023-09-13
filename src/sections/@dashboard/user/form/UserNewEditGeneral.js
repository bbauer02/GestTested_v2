import PropTypes from "prop-types";
import * as Yup from 'yup';
import { useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
// new
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, CardHeader, CardContent, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getCountries } from '../../../../redux/slices/country';
import { getLanguages } from '../../../../redux/slices/language';
import { putUser } from "../../../../redux/slices/user";

// utils
import { fData } from '../../../../utils/formatNumber';
import { GENDERS_OPTION, CIVILITY_OPTION } from '../../../../utils/formatGenders';

// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../../components/hook-form';
import {PATH_DASHBOARD} from "../../../../routes/paths";


UserNewEditGeneral.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};
export default function UserNewEditGeneral({isEdit, currentUser=null}) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { countries } = useSelector((state) => state.country);
    const { languages } = useSelector((state) => state.language);


    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(()=> {
        dispatch(getLanguages());
    },[dispatch])

    const UpdateUserSchema = Yup.object().shape({
        firstname: Yup.string().required('Prénom requis!!'),
    });



    const defaultValues = {
        gender: currentUser?.gender || '',
        civility: currentUser?.civility || '',
        firstname: currentUser?.firstname || '',
        lastname: currentUser?.lastname || '',
        adress1: currentUser?.adress1 || '',
        adress2: currentUser?.adress2 || '',
        zipcode: currentUser?.zipcode || '',
        city: currentUser?.city || '',
        phone: currentUser?.phone || '',
        email: currentUser?.email || '',
        country_id: currentUser?.country_id || -1,
        nationality_id: currentUser?.nationality_id || -1,
        firstlanguage_id: currentUser?.firstlanguage_id || -1,
        avatar: `/avatars/${currentUser?.avatar}` || ''
    };

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(currentUser);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentUser]);

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data, e) => {
        try {

            const {avatar} = data;
            delete data.avatar;
            const formData = new FormData();
            formData.append('user', JSON.stringify({...data,user_id: currentUser.user_id}));
            formData.append('avatar', avatar);
            dispatch(putUser(currentUser.user_id, formData ));
            reset();
            enqueueSnackbar(!isEdit ? 'Création de l\'utilisateur effectée !' : 'Mise à jour effectée !');
            navigate(PATH_DASHBOARD.admin.user.root);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('avatar', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
                        <RHFUploadAvatar
                            name="avatar"
                            maxSize={3145728}
                            onDrop={handleDrop}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br /> max size of {fData(3145728)}
                                </Typography>
                            }
                        />

                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <CardHeader  title="Civilité" />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 2,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                <RHFSelect native name="gender" label="Genre" placeholder="Genre" >
                                    {Object.entries(GENDERS_OPTION).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </RHFSelect>

                                <RHFSelect native name="civility" label="Civilité" placeholder="Civilité" >
                                    {Object.entries(CIVILITY_OPTION).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </RHFSelect>

                                <RHFTextField name="lastname" label="Nom" />
                                <RHFTextField name="firstname" label="Prénom" />

                                <RHFTextField name="adress1" label="Adresse" />
                                <RHFTextField name="adress2" label="Complément d'adresse" />
                                <RHFTextField name="zipcode" label="Code postal" />
                                <RHFTextField name="city" label="Ville" />

                            </Box>
                            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                                <RHFSelect native name="country_id" label="Pays" placeholder="Pays">
                                    <option key={-1} value={-1}>Sélectionnez un pays</option>
                                    {countries.map(country => (<option key={country.country_id} value={country.country_id}>{country.label}</option>) ) }
                                </RHFSelect>
                            </Stack>
                            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                                <RHFSelect native name="nationality_id" label="Nationnalité" placeholder="Nationnalité">
                                    <option key={-1} value={-1}>Sélectionnez une nationnalité</option>
                                    {countries.map(country => (<option key={country.country_id} value={country.country_id}>{country.countryNationality}</option>) ) }
                                </RHFSelect>
                            </Stack>
                            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                                <RHFSelect native name="firstlanguage_id" label="Langue maternelle" placeholder="Langue maternelle">
                                    <option key={-1} value={-1}>Sélectionnez une nationnalité</option>
                                    {languages.map(language => (<option key={language.firstlanguage_id} value={language.firstlanguage_id}>{language.name}</option>) ) }
                                </RHFSelect>
                            </Stack>
                        </CardContent>
                        <CardHeader  title="Contact"  style={{ paddingTop: "0px" }} />
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 2,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                <RHFTextField name="phone" label="Téléphone" />
                                <RHFTextField name="email" label="Email" />
                            </Box>
                        </CardContent>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                            <LoadingButton type="submit" variant="contained" fullWidth size="large" loading={isSubmitting}>
                                {!isEdit ? 'Créer un utilisateur' : 'Enregistrer les changements'}
                            </LoadingButton>
                            <LoadingButton type="button" variant="contained" fullWidth size="large" color="error" loading={isSubmitting} onClick={() => navigate(PATH_DASHBOARD.admin.user.root)}>
                                Retour
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
