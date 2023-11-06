import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import {useCallback} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {Box, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {RHFSelect, RHFTextField, RHFUploadAvatar} from "../../../../components/hook-form";
import {fData} from "../../../../utils/formatNumber";
import {CIVILITY_OPTION, GENDERS_OPTION} from "../../../../utils/formatGenders";

import {PATH_DASHBOARD} from "../../../../routes/paths";
import {useSelector} from "../../../../redux/store";
import UserNewEditGeneral from "./UserNewEditGeneral";


SessionAddUserStep1.propTypes = {
    institut_id: PropTypes.number,
    session_id: PropTypes.number,
    disabled: PropTypes.bool,
};
export default function SessionAddUserStep1({disabled=false, institut_id=null, session_id=null}) {
    const navigate = useNavigate();
    const {
        control,
        setValue,
        formState: { isSubmitting },
    } = useFormContext();



    const { countries } = useSelector((state) => state.country);
    const { languages } = useSelector((state) => state.language);



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
        <>
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
                                <RHFSelect native name="gender" label="Genre" placeholder="Genre" disabled={disabled}>
                                    {Object.entries(GENDERS_OPTION).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </RHFSelect>

                                <RHFSelect native name="civility" label="Civilité" placeholder="Civilité" disabled={disabled}>
                                    {Object.entries(CIVILITY_OPTION).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </RHFSelect>

                                <RHFTextField name="lastname" label="Nom" disabled={disabled} />
                                <RHFTextField name="firstname" label="Prénom" disabled={disabled} />
                            </Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 2,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                    paddingTop:2,
                                    paddingBottom:2
                                }}
                            >
                                <Controller
                                    name="birthday"
                                    control={control}
                                    render={({ field }) => (
                                        <MobileDateTimePicker
                                            {...field}
                                            onChange={(newValue) => field.onChange(newValue)}
                                            label="Date de naissance"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    )}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 3,
                                    columnGap: 2,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                <RHFTextField name="adress1" label="Adresse" disabled={disabled}/>
                                <RHFTextField name="adress2" label="Complément d'adresse" disabled={disabled}/>
                                <RHFTextField name="zipcode" label="Code postal" disabled={disabled} />
                                <RHFTextField name="city" label="Ville" disabled={disabled}/>

                            </Box>
                            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                                <RHFSelect native name="country_id" label="Pays" placeholder="Pays">
                                    <option key={-1} value={-1}>Sélectionnez un pays</option>
                                    {countries.map(country => (<option key={country.country_id} value={country.country_id}>{country.label}</option>) ) }
                                </RHFSelect>
                            </Stack>
                            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                                <RHFSelect native name="nativeCountry_id" label="Pays natal" placeholder="Pays natal">
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
                        <CardHeader  title="Compte utilisateur"  style={{ paddingTop: "0px" }} />
                        <CardContent>
                            <Box>
                                <RHFTextField name="login" label="Identifiant de connexion"  />
                            </Box>
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        display: 'grid',
                                        rowGap: 2,
                                        columnGap: 2,
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }
                                    }}
                                >
                                    <RHFTextField type="password" name="password1" label="Mot de passe"  />
                                    <RHFTextField type="password" name="password2" label="Confirmation de mot de passe" />
                                </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}