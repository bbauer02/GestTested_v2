import PropTypes from "prop-types";
import {useCallback, useEffect,useState, useMemo} from 'react';
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {Table, TableBody, TableCell, TableContainer, TableHead, MenuItem, Box, Typography, Stack, Divider, InputAdornment, TextField, Card, Button} from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// components
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../../../components/hook-form';
import {useDispatch, useSelector} from "../../../../redux/store";
import {getExamsDetailsOfSession} from "../../../../redux/slices/exam";
import Iconify from "../../../../components/iconify";

SessionAddUserStep2.propTypes = {
    institut_id: PropTypes.number,
    session_id: PropTypes.number,
    sessionExams: PropTypes.array
};
export default function SessionAddUserStep2({sessionExams=null, institut_id=null, session_id=null}) {
    const [EXAMS_OPTION, setEXAMSOPTION] = useState([]);
    const { exams } = useSelector((state) => state.exam);

    const {
        control,
        setValue,
        formState: { isSubmitting },
        watch
    } = useFormContext();

    const values = watch();


    useEffect(() => {
        setEXAMSOPTION(
            exams.filter(_exam => !values.userExams.some(valUserExam => valUserExam.exam_id === _exam.exam_id )  && _exam.Exam.isOption === true)
        );
    }, [exams, values.userExams, EXAMS_OPTION.exam_id]);

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        name: "userExams", // unique name for your Field Array
    });


    const handleAdd = () => {
        if(values.selNewExam === '-1') return;
        const selectedExam = exams.filter(_exam => _exam.exam_id === Number(values.selNewExam))[0];
        const exam = {
            exam_id : selectedExam.exam_id,
            exam: selectedExam.Exam.label,
            adressExam: selectedExam.adressExam,
            user_price: selectedExam.Exam.InstitutHasPrices.length > 0 ? selectedExam.Exam.InstitutHasPrices[0].price : selectedExam.Exam.price,
            tva_user : selectedExam.Exam.InstitutHasPrices.length > 0 ? selectedExam.Exam.InstitutHasPrices[0].tva : 22,
            datetime: selectedExam.DateTime,
            isOption: true
        };
        append(exam);
        setEXAMSOPTION(EXAMS_OPTION.filter(_exam => _exam.exam_id !== Number(selectedExam.exam_id)));
        setValue('selNewExam', '-1');

    }

    const handleRemove = (index, exam_id) => {
        const ExamToRemove = exams.filter(exam => exam.exam_id === exam_id);
        setEXAMSOPTION([...EXAMS_OPTION, ExamToRemove[0] ]);
        remove(index);

    }



    return (
        <>
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, color: 'text.disabled' }}>
                    Epreuves et Options du candidat :
                </Typography>
                <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                    { fields.map ( ( option, index ) => (
                    <Stack key={index} alignItems="flex-end" spacing={1.5}>
                        <Stack  direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1,  }}>
                                <RHFTextField
                                    type="hidden"
                                    size="small"
                                    name="isOption"
                                    style={{ display: 'none' }}
                                    disabled
                                />
                                <RHFTextField
                                    size="small"
                                    name={`userExams[${index}].exam`}
                                    label="Epreuve"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ maxWidth: { md: 180 } }}
                                    disabled
                                />

                            <Controller
                                name={`userExams[${index}].datetime`}
                                control={control}
                                render={({ field }) => (
                                    <MobileDateTimePicker
                                        {...field}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        label="Start date"
                                        inputFormat="dd/MM/yyyy hh:mm a"
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                )}

                            />

                            <RHFTextField
                                size="small"
                                name={`userExams[${index}].adressExam`}
                                label="Adresse de l'épreuve"
                                InputLabelProps={{ shrink: true }}
                                multiline rows={3}
                            />

                            <RHFTextField
                                size="small"
                                type="number"
                                name={`userExams[${index}].user_price`}
                                label="Prix HT"
                                placeholder="0"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">€</InputAdornment>,
                                }}
                                sx={{ maxWidth: { md: 80 } }}
                            />

                            <RHFTextField
                                size="small"
                                type="number"
                                name={`userExams[${index}].tva_user`}
                                min={0}
                                label="TVA"
                                placeholder="0"
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    inputProps: { min: 0, max: 100 },
                                }}
                                sx={{ maxWidth: { md: 80 } }}
                            />

                            {
                                option.isOption ?
                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                                        onClick={ () => handleRemove(index,option.exam_id )   }
                                    >
                                        Remove
                                    </Button>
                                    :
                                    ""
                            }
                        </Stack>
                    </Stack>
                    )) }
                </Stack>
                <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                <Stack
                    spacing={2}
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                >
                    { EXAMS_OPTION.length > 0 &&
                        <>
                            <RHFSelect
                                name="selNewExam"
                                size="small"
                                label="Epreuve à ajouter"
                                InputLabelProps={{ shrink: true }}
                                sx={{ maxWidth: { md: 250 } }}
                            >
                                <MenuItem value={-1} selected> Sélectionner une épreuve</MenuItem>

                                {EXAMS_OPTION.map((exam) => (
                                    <MenuItem
                                        key={exam.Exam.exam_id}
                                        value={exam.Exam.exam_id}
                                    >
                                        {exam.Exam.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>

                            <Button
                                size="small"
                                startIcon={<Iconify icon="eva:plus-fill" />}
                                onClick={handleAdd}
                                sx={{ flexShrink: 0 }}
                            >
                                Ajouter une épreuve optionnelle au candidat
                            </Button>
                        </>
                    }
                </Stack>
            </Box>
        </>
    )
}