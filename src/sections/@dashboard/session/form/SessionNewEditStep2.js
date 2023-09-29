import PropTypes from 'prop-types';
import {useEffect, useCallback} from 'react';
// form
import {useFormContext, useFieldArray, Controller} from 'react-hook-form';
// @mui
import {Stack, Divider, Typography, Button, InputAdornment, Box, Card, Alert, TextField} from '@mui/material';
import {DateTimePicker} from "@mui/x-date-pickers";
// redux
import { useSelector } from '../../../../redux/store';
// components
import {RHFTextField} from "../../../../components/hook-form";
// axios
import axios from '../../../../utils/axios';


SessionNewEditStep2.propTypes = {
    isEdit: PropTypes.bool,
};

export default function SessionNewEditStep2({ isEdit }) {

    const { control, setValue, watch, resetField} = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sessionHasExams',
    });
    const values = watch();

    const { session : currentSession } = useSelector((state) => state.session);
    const { session_id, institut_id } = currentSession || {session_id: null, institut_id: null};



    const { exams, isLoading } = useSelector((state) => state.exam);

    // On récupére la liste des Exams de la session ou un tableau vide
    
    const {sessionHasExams} = currentSession || {sessionHasExams: []};
    

   useEffect(() => {
        if(exams.length > 0) {

            remove();
            exams.forEach(
                exam => append({examId : exam.exam_id, exam: exam.Exam.label, adressExam: exam.adressExam, room:exam.room, DateTime: exam.DateTime})
            );
        }
   }, [exams, append, remove])
 
  
    return (
        !isLoading ? (
        <Box sx={{ p: 3 }}>
            <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                {
                    !exams.length > 0 && 
                    <Alert severity="error">Aucune épreuve n&apos;est associée à cet exam !!</Alert>
                }

                {exams.length > 0 && fields.map((item, index) => (
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
        ) : (

            <Box sx={{ p: 3 }}>
                <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                    <Alert severity="info">Chargement des épreuves en cours ...</Alert>
                </Stack>
            </Box>
        )
    );  
}
