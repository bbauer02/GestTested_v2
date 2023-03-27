import PropTypes from 'prop-types';
import {useEffect} from 'react';
// form
import {useFormContext, useFieldArray, Controller} from 'react-hook-form';
// @mui
import {Stack, Divider, Typography, Button, InputAdornment, Box, Card, Alert, TextField} from '@mui/material';
import {DateTimePicker} from "@mui/x-date-pickers";
// components
import {RHFTextField} from "../../../../components/hook-form";
// axios
import axios from '../../../../utils/axios';


SessionNewEditStep2.propTypes = {
    setHasExams: PropTypes.func,
    hasExams: PropTypes.bool
};

export default function SessionNewEditStep2({setHasExams, hasExams}) {
    const { control, setValue, watch, resetField} = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sessionHasExam',
    });
    const values = watch();

    // on récupére la liste des exams associés au test
    useEffect(() => {
        (async () =>  {
            remove();
            let filters="/";
            if (values.test_id !== -1) {
                if(values.test_id !== -1 && values.level_id !== -1) {
                    filters = `?test=${values.test_id}&level=${values.level_id}`;
                }
                else if (filters.test_id !== -1 ) {
                    filters = `?test=${values.test_id}`;
                }
                else {
                    return;
                }
            }
            else {
                return;
            }
            const {data} = await axios.get(`/exams${filters}`);
            if(data.exams.length > 0 ) {
                data.exams.forEach(
                    exam => append({examId : exam.exam_id, exam: exam.label, adressExam: '', room:'', examDateTime: new Date()})
                );
                setHasExams(true);
            }
            else {
                setHasExams(false);
            }
            
        } )();
    }, [values.test_id,values.level_id, append, remove,setHasExams]);

    
    return (
        <Box sx={{ p: 3 }}>
            <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                {
                    !hasExams && 
                    <Alert severity="error">Aucune épreuve n&apos;est associée à cet exam !!</Alert>
                }
                {hasExams && fields.map((item, index) => (
                    <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                            <RHFTextField
                                size="small"
                                name={`sessionHasExam[${index}].exam`}
                                label="Epreuve"
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />
                            <RHFTextField
                                size="small"
                                name={`sessionHasExam[${index}].adressExam`}
                                label="Adresse "
                                InputLabelProps={{ shrink: true }}
                                multiline
                                rows={4}
                            />
                            <RHFTextField
                                size="small"
                                name={`sessionHasExam[${index}].room`}
                                label="Salle "
                                InputLabelProps={{ shrink: true }}
                            />
                            <Controller
                                name={`sessionHasExam[${index}].examDateTime`}
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <DateTimePicker
                                    {...field}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    label="Date de l'épreuve"
                                    renderInput={(params) => <TextField {...params} fullWidth error={!!error} helperText={error?.message} />}
                                    />
                                )}
                            />

                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );  
}


/*

return (
    <Box sx={{ p: 3 }}>
        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {
            !hasExams && 
            <Alert severity="error">Aucune épreuve n&apos;est associée à cet exam !!</Alert>
        }
        {     
             hasExams && fields.map((item, index) => (
                <Stack key={item.id} direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                    <RHFTextField
                        size="small"
                        name={`sessionHasExam[${index}].exam`}
                        label="Epreuve "
                        InputLabelProps={{ shrink: true }}
                        disabled
                    />
                    <RHFTextField
                        size="small"
                        name={`sessionHasExam[${index}].adressExam`}
                        label="Adresse "
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={4}
                    />
                    <RHFTextField
                        size="small"
                        name={`sessionHasExam[${index}].room`}
                        label="Salle "
                        InputLabelProps={{ shrink: true }}
                    />
                    <Controller
                        name={`sessionHasExam[${index}].examDateTime`}
                        control={control}
                        render={({ field,fieldState  }) => (
                            <DateTimePicker
                                {...field}
                                label="Date et heure de début"
                                ampm={false}
                                sx={{
                                    width: { xs:900, sm: 900, md: 900 }
                                }}
                                
                            />
                        )}
                    />


                </Stack>
            ))
        }
        </Stack>
    </Box>
)

*/