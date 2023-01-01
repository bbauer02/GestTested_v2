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
import { getCountries } from '../../../redux/slices/country';
import { postInstitut, putInstitut } from '../../../redux/slices/institut';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import FormProvider, {
  RHFSelect,
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

InstitutNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInstitut: PropTypes.object,
};
export default function InstitutNewEditForm({ isEdit, currentInstitut=null }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { countries } = useSelector((state) => state.country);
  const { enqueueSnackbar } = useSnackbar();
  const [countriesDatas, setCountriesDatas] = useState([]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    if (Object.values(countries).length) {
      setCountriesDatas(Object.values(countries));
    }
  }, [countries]);

  const NewProductSchema = Yup.object().shape({
    label: Yup.string().required('Un nom est requis !'),
    adress1: Yup.string().required('Une adresse est requise !'),
    zipcode: Yup.string().required('Un code postal est requis !'),
    city: Yup.string().required('Une ville est requise !'),
    country_id: Yup.number().positive('Un pays est requis !'),
    phone: Yup.string().required('Un numéro de téléphone est requis !'),
    email: Yup.string().required('Une adresse électronique est requise !'),
  });

  const defaultValues = useMemo(
    () => ({
      institut_id: currentInstitut?.institut_id || '',
      label: currentInstitut?.label || '',
      adress1: currentInstitut?.adress1 || '',
      adress2: currentInstitut?.adress2 || '',
      zipcode: currentInstitut?.zipcode || '',
      city: currentInstitut?.city || '',
      country_id: currentInstitut?.country_id || -1 ,
      email: currentInstitut?.email || '',
      siteweb: currentInstitut?.siteweb || '',
      phone: currentInstitut?.phone || '',
      facebook: currentInstitut?.socialNetwork.facebook || '',
      twitter: currentInstitut?.socialNetwork.twitter || '',
      instagram: currentInstitut?.socialNetwork.instagram || '',
      linkedin: currentInstitut?.socialNetwork.linkedin || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInstitut]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
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
    if (isEdit && currentInstitut) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInstitut]);

  const onSubmit = async (data) => {
    try {
      const { facebook,twitter,instagram, linkedin } = data

      delete data.facebook;
      delete data.twitter;
      delete data.instagram;
      delete data.linkedin;

      data.socialNetwork = {
        facebook,
        twitter,
        instagram,
        linkedin
      };
      
      if(isEdit) {

        dispatch(putInstitut(data));
      }
      else {
        dispatch(postInstitut(data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Création de l\'institut effectée !' : 'Mise à jour effectée !');
      navigate(PATH_DASHBOARD.admin.institut.root);
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
              <Typography variant="h5">Informations générales</Typography>
              <RHFTextField name="label" label="Nom de l'Institut" 
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Iconify icon='gridicons:institution' width={20} height={20} /></InputAdornment>,
                }}/>
              <RHFTextField name="adress1" label="Adresse" />
              <RHFTextField name="adress2" label="Complément d'adresse" />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <RHFTextField name="zipcode" label="Code postal" />
                <RHFTextField name="city" label="Ville" />
                <RHFSelect native name="country_id" label="Pays" >
                  <option value="-1">Sélectionnez un pays</option>
                  {countriesDatas.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.label}
                    </option>
                  ) )}
                  
                </RHFSelect>
              </Stack>
              <Typography variant="h5">Contact et réseaux sociaux</Typography>
              <RHFTextField name="phone" label="Téléphone"
               InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon='bxs:phone' width={20} height={20} /></InputAdornment>,
                  }}/>
              <RHFTextField name="email" label="Email de contact"
               InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon='ic:baseline-email' width={20} height={20} /></InputAdornment>,
                  }}/>
              <RHFTextField name="facebook" label="Facebook" placeholder="Nom de  page Facebook"
               InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon='fa:facebook-square' width={20} height={20} />&nbsp;https://www.facebook.com/</InputAdornment>,
                  }}/>
              <RHFTextField name="twitter" label="Twitter" placeholder="Nom de page Twitter"
               InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon='fa:twitter-square' width={20} height={20} />&nbsp;https://twitter.com/</InputAdornment>,
                  }}/>
              <RHFTextField name="instagram" label="Instagram" placeholder="Nom de page Instagram"
               InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon='fa:instagram' width={20} height={20} />&nbsp;https://www.instagram.com/</InputAdornment>,
                  }}/>
              <RHFTextField name="linkedin" label="Linkedin" placeholder="Nom de page Linkedin"
               InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon='fa:linkedin-square' width={20} height={20} />&nbsp;https://www.linkedin.com/</InputAdornment>,
                  }}/>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }}>
                <LoadingButton type="submit" variant="contained" fullWidth size="large" loading={isSubmitting}>
                    {!isEdit ? 'Créer un institut' : 'Enregistrer les changements'}
                </LoadingButton>
                <LoadingButton type="button" variant="contained" fullWidth size="large" color="error" loading={isSubmitting} onClick={() => navigate(PATH_DASHBOARD.admin.institut.root)}>
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
