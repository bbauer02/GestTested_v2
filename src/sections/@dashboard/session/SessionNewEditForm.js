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

SessionNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentInstitut: PropTypes.object,
};
export default function SessionNewEditForm({ isEdit, currentInstitut=null }) {
  
    return (
        <>
        FORM</>
    );
}
