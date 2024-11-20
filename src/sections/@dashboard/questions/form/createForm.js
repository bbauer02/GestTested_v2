import React, { useState, useEffect } from 'react';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Stack,
    TextField,
    MenuItem,
    Button,
    Typography,
    Box,
    Divider,
    InputAdornment
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import FormProvider, { RHFTextField, RHFSelect } from '../../../../components/hook-form';

import Tiptap from '../../../../components/tiptap/Tiptap';
import TiptapEditor from "../../../../components/tiptap/MenuBar";


const QuestionSchema = Yup.object().shape({
    label: Yup.string().required('Le libellé est obligatoire'),
    instruction: Yup.string().required('L\'instruction est obligatoire'),
    timemax: Yup.number().positive('Le temps doit être positif').required('Le temps maximum est obligatoire'),
    points: Yup.number().positive('Les points doivent être positifs').required('Les points sont obligatoires'),
    type: Yup.string().required('Le type de question est obligatoire'),
});

const questionTypes = [
    { value: 'MCQ', label: 'Choix Multiples (MCQ)' },
    { value: 'UCQ', label: 'Choix Unique (UCQ)' },
    { value: 'TrueFalse', label: 'Vrai/Faux' },
    { value: 'FillInTheBlanks', label: 'Texte à Trous' },
    { value: 'Highlight', label: 'Surlignage' },
];

export default function QuestionCreatorForm() {
    const { enqueueSnackbar } = useSnackbar();
    const [loadingSave, setLoadingSave] = useState(false);

    const [message, setMessage] = useState('');

    const defaultValues = {
        label: '',
        instruction: '',
        timemax: 0,
        points: 0,
        type: '',
        choices: [{ text: '' }],
        answers: [{ text: '' }],
        sentence: '',
        blankSymbol: '_____',
    };

    const methods = useForm({
        resolver: yupResolver(QuestionSchema),
        defaultValues,
    });

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = methods;

    const { fields: choicesFields, append: appendChoice, remove: removeChoice } = useFieldArray({
        control,
        name: 'choices',
    });

    const { fields: answersFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
        control,
        name: 'answers',
    });

    const questionType = watch('type');

    const onSubmit = async (data) => {
        setLoadingSave(true);
        try {
            console.log(data);
            enqueueSnackbar('Question créée avec succès!', { variant: 'success' });
            setLoadingSave(false);
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erreur lors de la création de la question', { variant: 'error' });
            setLoadingSave(false);
        }
    };
    const handleChangeMessage = (value) => {
        setMessage(value);
    };
    const renderQuestionTypeFields = () => {
        switch (questionType) {
            case 'MCQ':
            case 'UCQ':
                return (
                    <>
                        {choicesFields.map((field, index) => (
                            <Stack key={field.id} direction="row" spacing={1} alignItems="center">
                                <RHFTextField
                                    name={`choices.${index}.text`}
                                    label={`Choix ${index + 1}`}
                                />
                                <Button onClick={() => removeChoice(index)}>Supprimer</Button>
                            </Stack>
                        ))}
                        <Button onClick={() => appendChoice({ text: '' })}>Ajouter un choix</Button>

                        {answersFields.map((field, index) => (
                            <Stack key={field.id} direction="row" spacing={1} alignItems="center">
                                <RHFTextField
                                    name={`answers.${index}.text`}
                                    label={`Réponse ${index + 1}`}
                                />
                                <Button onClick={() => removeAnswer(index)}>Supprimer</Button>
                            </Stack>
                        ))}
                        <Button onClick={() => appendAnswer({ text: '' })}>Ajouter une réponse</Button>
                    </>
                );
            case 'TrueFalse':
                return (
                    <RHFSelect name="answer" label="Réponse">
                        <MenuItem value="true">Vrai</MenuItem>
                        <MenuItem value="false">Faux</MenuItem>
                    </RHFSelect>
                );
            case 'FillInTheBlanks':
            case 'Highlight':
                return (
                    <>
                        <RHFTextField
                            name="sentence"
                            label="Phrase"
                            multiline
                            rows={4}
                        />
                        {questionType === 'FillInTheBlanks' && (
                            <RHFTextField
                                name="blankSymbol"
                                label="Symbole pour les blancs"
                            />
                        )}
                        {answersFields.map((field, index) => (
                            <Stack key={field.id} direction="row" spacing={1} alignItems="center">
                                <RHFTextField
                                    name={`answers.${index}.text`}
                                    label={`Réponse ${index + 1}`}
                                />
                                <Button onClick={() => removeAnswer(index)}>Supprimer</Button>
                            </Stack>
                        ))}
                        <Button onClick={() => appendAnswer({ text: '' })}>Ajouter une réponse</Button>
                    </>
                );
            default:
                return null;
        }
    };


    return (

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Container>

                <TiptapEditor />

                <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                        <RHFTextField name="label" label="Libellé de la question" />

                        <RHFTextField name="instruction" label="Instruction" multiline rows={3} />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <RHFTextField
                                name="timemax"
                                label="Temps maximum (en secondes)"
                                type="number"
                            />
                            <RHFTextField
                                name="points"
                                label="Points"
                                type="number"
                            />
                        </Stack>
                        <RHFSelect name="type" label="Type de question">
                            {questionTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                        {renderQuestionTypeFields()}
                    </Stack>
                </Card>

                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="flex-end">
                    <LoadingButton
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={loadingSave}
                    >
                        Enregistrer la question
                    </LoadingButton>
                </Stack>
            </Container>
        </FormProvider>
    );
}