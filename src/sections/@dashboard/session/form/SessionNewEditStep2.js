import PropTypes from 'prop-types';
import {useEffect, useCallback} from 'react';
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
    hasExams: PropTypes.bool,
    isEdit: PropTypes.bool,
    currentSession: PropTypes.object,
};

export default function SessionNewEditStep2({setHasExams, hasExams, isEdit, currentSession=null }) {
    const { control, setValue, watch, resetField} = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sessionHasExams',
    });
    const values = watch();

    const getExamsFromApi = useCallback(async (test_id, level_id) => {
        let filters="/";
        if (test_id !== -1) {
            if(test_id !== -1 && level_id !== -1) {
                filters = `?test=${test_id}&level=${level_id}`;
            }
            else if (filters.test_id !== -1 ) {
                filters = `?test=${test_id}`;
            }
            else {
                return  null;
            }
        }
        else {
            return null;
        }
        const {data} = await axios.get(`/exams${filters}`);
        return data;
    }, []);

    // on récupére la liste des exams associés au test
    useEffect(() => {
        (async () =>  {
            remove();
            if(isEdit && currentSession) {
                setHasExams(true);
                currentSession.sessionHasExams.forEach( exam => append({sessionHasExam_id: exam.sessionHasExam_id, examId : exam.Exam.exam_id, exam: exam.Exam.label, adressExam: exam.adressExam, room:exam.room, DateTime: exam.DateTime}) );
            }
            else {
               const data = await getExamsFromApi(values.test_id, values.level_id);
                if(data?.exams.length > 0 ) {
                    data.exams.forEach(
                        exam => append({examId : exam.exam_id, exam: exam.label, adressExam: '', room:'', DateTime: new Date()})
                    );
                    setHasExams(true);
                }
                else {
                    setHasExams(false);
                }
            }
        } )();
    }, [isEdit,currentSession,  values.test_id,values.level_id, append, remove,setHasExams, getExamsFromApi]);

    
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
                                name={`sessionHasExams[${index}].exam`}
                                label="Epreuve"
                                InputLabelProps={{ shrink: true }}
                                disabled
                            />
                            <RHFTextField
                                size="small"
                                name={`sessionHasExams[${index}].adressExam`}
                                label="Adresse "
                                InputLabelProps={{ shrink: true }}
                                multiline
                                rows={4}
                            />
                            <RHFTextField
                                size="small"
                                name={`sessionHasExams[${index}].room`}
                                label="Salle "
                                InputLabelProps={{ shrink: true }}
                            />
                            <Controller
                                name={`sessionHasExams[${index}].DateTime`}
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
