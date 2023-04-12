import PropTypes from 'prop-types';
import {useEffect, useState, useMemo} from 'react';
// form
import {Controller, useFormContext} from 'react-hook-form';
// @mui
import {Stack, Divider, Typography, Button, InputAdornment, Switch, Input, TextField} from '@mui/material';
import {DateTimePicker, DatePicker} from "@mui/x-date-pickers";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {LoadingButton} from "@mui/lab";
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getInstituts } from '../../../../redux/slices/institut';
import { getTests } from '../../../../redux/slices/test';

// components
import {RHFAutocomplete, RHFSelect, RHFSwitch, RHFTextField} from "../../../../components/hook-form";

import {PATH_DASHBOARD} from "../../../../routes/paths";


SessionNewEditStep1.propTypes = {
    setHasLevelsByTest: PropTypes.func,
};
export default function SessionNewEditStep1({ setHasLevelsByTest })  {

    const dispatch = useDispatch();
    // Get the Instituts List
    useEffect( () => {
        dispatch(getInstituts());
    }, [dispatch]);

    // Get the Tests List
    useEffect( () => {
        dispatch(getTests(true));
    }, [dispatch])



    const { instituts } = useSelector((state) => state.institut);
    const { tests } = useSelector((state) => state.test);

    const {
        watch,
        control,
        clearErrors,
        setValue,
        formState: { errors }
    } = useFormContext();
    const values = watch();



    const levelsByTest = useMemo( () => {

         if(values.test_id ) {
            const selectedTest = tests.find(test => test.test_id === parseInt(values.test_id,10));
            if(selectedTest && selectedTest.Levels.length > 0) {
                return [...selectedTest.Levels];
            }
            return [];
        }
        return [];
    },[values.test_id, tests ])



    useEffect(() => {
        setHasLevelsByTest(levelsByTest.length > 0);
    },[levelsByTest, setHasLevelsByTest])

    useEffect(() => {
        if(levelsByTest.length === 0) {
            setValue("level_id",-1);
            clearErrors('level_id');
        }
    },[values.test_id, clearErrors, levelsByTest,setValue]);

    return (
        <Stack spacing={3}>
            <Typography variant="h5">Remplir les Informations</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <RHFSwitch
                    color="secondary"
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
                <RHFSelect native name="level_id" label="Niveau"  disabled={ levelsByTest.length === 0 }>
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
                    name="startDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DateTimePicker
                        {...field}
                        onChange={(newValue) => field.onChange(newValue)}
                        label="Début de début de session"
                        renderInput={(params) => <TextField {...params} fullWidth error={!!error} helperText={error?.message} />}
                        />
                    )}
                />
                <Controller
                    name="endDate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DateTimePicker
                        {...field}
                        onChange={(newValue) => field.onChange(newValue)}
                        label="Début de fin de session"
                        renderInput={(params) => <TextField {...params} fullWidth error={!!error} helperText={error?.message} />}
                        />
                    )}
                />

            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
            <Controller
                name="limitDateSubscribe"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <DateTimePicker
                    {...field}
                    onChange={(newValue) => field.onChange(newValue)}
                    label="Date limite d'inscription"
                    renderInput={(params) => <TextField {...params} fullWidth error={!!error} helperText={error?.message} />}
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