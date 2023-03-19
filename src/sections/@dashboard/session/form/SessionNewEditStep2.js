import PropTypes from 'prop-types';
import {useEffect} from 'react';
// form
import {useFormContext, useFieldArray, Controller} from 'react-hook-form';
// @mui
import {Stack, Divider, Typography, Button, InputAdornment, Box, Card} from '@mui/material';
import {DateTimePicker} from "@mui/x-date-pickers";
// components
import {RHFTextField} from "../../../../components/hook-form";
// axios
import axios from '../../../../utils/axios';

export default function SessionNewEditStep2() {
    const { control, setValue, watch, resetField } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sessionHasExam',
    });
    const values = watch();


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
            data.exams.forEach(exam => append({examId : exam.exam_id, exam: exam.label, adressExam: '', room:'', dateTime: new Date()}));
        } )();
    }, [values.test_id,values.level_id, append, remove]);




    return (
        <Box sx={{ p: 3 }}>
            <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
            {
                fields.map((item, index) => (
                    <Stack key={index} direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
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
                            name={`sessionHasExam[${index}].dateTime`}
                            control={control}
                            render={({ field }) => (
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
}