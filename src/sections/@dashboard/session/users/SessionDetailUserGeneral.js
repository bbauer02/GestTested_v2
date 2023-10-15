import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useCallback, useEffect, useMemo} from 'react';
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
import { putUser } from '../../../../redux/slices/user';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
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
import {getSessionUser} from "../../../../redux/slices/session";

SessionDetailUserGeneral.propTypes = {
    sessionUser : PropTypes.object,
}
export default function SessionDetailUserGeneral({sessionUser}) {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

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
    const user = useMemo(() => sessionUser?.User || {}, [sessionUser]);

    const initialValues = useMemo(() => ({
        gender: user?.gender || '',
        civility: user?.civility || '',
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        adress1: user?.adress1 || '',
        adress2: user?.adress2 || '',
        zipcode: user?.zipcode || '',
        city: user?.city || '',
        phone: user?.phone || '',
        email: user?.email || '',
        country_id: user?.country_id || -1,
        nationality_id: user?.nationality_id || -1,
        firstlanguage_id: user?.firstlanguage_id || -1,
        avatar: `/avatars/${user?.avatar}` || ''
    }), [user]);



    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues: initialValues,

    });
    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
        reset,

    } = methods;

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const onSubmit = async (data, e) => {
        try {

            const {avatar} = data;
            delete data.avatar;
            const formData = new FormData();
            formData.append('user', JSON.stringify({...data,user_id: user.user_id}));
            formData.append('avatar', avatar);
            dispatch(putUser(user.user_id, formData))
            enqueueSnackbar('Update success!');
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
                        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Enregistrer
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
