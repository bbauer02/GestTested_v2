import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// form
import {Controller, useFormContext} from 'react-hook-form';
// @mui
import {Stack, Divider, Typography, Button, InputAdornment} from '@mui/material';
import {DateTimePicker} from "@mui/x-date-pickers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {LoadingButton} from "@mui/lab";
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getInstituts } from '../../../../redux/slices/institut';
import { getTests } from '../../../../redux/slices/test';

// components
import {RHFAutocomplete, RHFSelect, RHFSwitch, RHFTextField} from "../../../../components/hook-form";

import {PATH_DASHBOARD} from "../../../../routes/paths";

export default function SessionNewEditStep1()  {
    const dispatch = useDispatch();
    // Get the Instituts List
    useEffect( () => {
        dispatch(getInstituts());
    }, [dispatch]);

    // Get the Tests List
    useEffect( () => {
        dispatch(getTests());
    }, [dispatch])

    const { instituts } = useSelector((state) => state.institut);
    const { tests } = useSelector((state) => state.test);

    const {
        watch,
        control,
        setValue,
        formState: { errors },
    } = useFormContext();
    const values = watch();

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
        <Stack spacing={3}>
            <Typography variant="h5">Remplir les Informations</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <RHFSwitch
                    defaultChecked color="secondary"
                    name="validation"
                    label="Validation"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                    labelPlacement="top"
                />
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
                <RHFSelect
                    native
                    name="test_id"
                    label="Test"
                >
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

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <Controller
                    name="start"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            label="Date et heure de début"
                            ampm={false}
                        />
                    )}
                />
                <Controller
                    name="end"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            label="Date et heure de end"
                            ampm={false}
                        />
                    )}
                />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <Controller
                    name="limitDateSubscribe"
                    control={control}
                    render={({ field }) => (
                        <DateTimePicker
                            {...field}
                            label="Date limite d'inscription"
                            ampm={false}
                            sx={{
                                width: { sm: 300, md: 300 }
                            }}
                        />
                    )}
                />
                <RHFTextField
                    name="placeAvailable"
                    label="Nombre de place disponible"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><PeopleAltIcon /></InputAdornment>,
                    }}
                    sx={{
                        width: { sm: 300, md: 300 }
                    }}
                />
            </Stack>
        </Stack>
    );
}