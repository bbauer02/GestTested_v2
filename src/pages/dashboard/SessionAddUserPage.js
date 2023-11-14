import {Helmet} from "react-helmet-async";
import {useEffect, useMemo, useState} from "react";
// components
import {useForm,  useFieldArray, Controller} from "react-hook-form";

import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as Yup from "yup";

import bcrypt from 'bcryptjs';

// @mui
import { alpha } from '@mui/material/styles';
import {
    Button,
    Card,
    Table,
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    Tab,
    Tabs,
    Box,
    Paper,
    Step,
    Stepper,
    StepLabel,
    Typography

} from '@mui/material';
import {useParams, useNavigate} from "react-router-dom";
// Redux
import {  useSelector } from "react-redux";
import {useDispatch} from '../../redux/store'
import { useSettingsContext } from '../../components/settings';
import { registerUserInstitut } from '../../redux/slices/user';

// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
} from '../../components/hook-form';
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {PATH_DASHBOARD} from "../../routes/paths";
import Iconify from "../../components/iconify";

//
import { useAuthContext } from '../../auth/useAuthContext';

import { getSession } from "../../redux/slices/session";
import { getCountries } from '../../redux/slices/country';
import { getLanguages } from '../../redux/slices/language';

// composant stepcontents

import SessionAddUserStep1 from "../../sections/@dashboard/user/form/SessionAddUserStep1";
import SessionAddUserStep2 from "../../sections/@dashboard/user/form/SessionAddUserStep2";
import SessionAddUserStep3 from "../../sections/@dashboard/user/form/SessionAddUserStep3";
import SessionAddUserStep4 from "../../sections/@dashboard/user/form/SessionAddUserStep4";
import {getExamsDetailsOfSession} from "../../redux/slices/exam";

const steps = ['Etat Civil', 'Epreuves et Options', 'Informations', 'Finalisation'];
export default function SessionAddUserPage() {
    const salt = bcrypt.genSaltSync(10)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    // GESTION DU STEPPER
    const [activeStep, setActiveStep] = useState(0);
    const [ userOptions, setUserOptions ] = useState([]);
    const [skipped, setSkipped] = useState(new Set());
    const isStepOptional = (step) => step === -1;

    const isStepSkipped = (step) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    // GESTION DU FORMULAIRE
    const dispatch = useDispatch();
    const { session_id} = useParams();
    const { themeStretch } = useSettingsContext();
    const { session } = useSelector((state) => state.session);

    // Logic here to get current user role
    const { user } = useAuthContext();
    const institut_id = user.instituts[0].institut_id;

    const { exams } = useSelector((state) => state.exam);
    // On récupére la liste complete de tout les exams
    useEffect(() => {
        dispatch(getExamsDetailsOfSession(  institut_id,session_id ));
    }, [institut_id, session_id, dispatch])

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SessionAddUserStep1 institut_id={+institut_id} session_id={+session_id}/>;
            case 1:
                return <SessionAddUserStep2 sessionExams={session?.sessionHasExams} institut_id={+institut_id} session_id={+session_id}/>;
            case 2:
                return <SessionAddUserStep3 />;
            case 3:
                return <SessionAddUserStep4 />;
            default:
                return 'Unknown step';
        }
    }

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getLanguages());
    })

    useEffect(() => {
        dispatch(getSession(institut_id,session_id ));
    }, [dispatch, institut_id, session_id]);
    // Gestionnaire du formulaire

    useEffect(()  => {
        const optFormated = [];

        session?.sessionHasExams?.forEach(_exam => {
            if(_exam.Exam.isOption === true) return;
            const exam = {
                exam_id : _exam.exam_id,
                exam: _exam.Exam.label,
                adressExam: _exam.adressExam,
                user_price: _exam.Exam.InstitutHasPrices.length > 0 ? _exam.Exam.InstitutHasPrices[0].price : _exam.Exam.price,
                tva_user : _exam.Exam.InstitutHasPrices.length > 0 ? _exam.Exam.InstitutHasPrices[0].tva : 22,
                datetime: _exam.DateTime,
                isOption: _exam.Exam.isOption
            };
            optFormated.push(exam);
        });
        setUserOptions(optFormated)
    }, [session, setUserOptions]);

    const UpdateUserSchema = Yup.object().shape({

    });


    const defaultValues = useMemo(
        () => (
            {
                selNewExam: '-1',
                gender:  '1',
                civility:  '1',
                firstname:  'John',
                lastname:  'Doe',
                birthday: null,
                adress1:  "12 rue de l'église",
                adress2: '',
                zipcode: '02700',
                city: 'BARISIS',
                phone: '0323522248',
                email: 'baptiste02@gmail.com',
                country_id: 76,
                nationality_id:  76,
                firstlanguage_id: 21,
                nativeCountry_id:76,
                avatar: '',
                login: "johndoe",
                password1: "12345",
                password2: "12345",
                userExams: userOptions ||  [

                ],
                paymentMode:1,
                hasPaid:false,
                inscription: new Date(),
                numInscrAnt: '',
                informations: "Ceci est une information majeure"

            }),
        [userOptions]
    );



    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        watch,
        setValue,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    const isUserOption = (userExam) => {
            const exam_id = userExam.exam_id;
            const user_price = userExam.user_price;
            const user_tva = userExam.tva_user? userExam.tva_user : 22;
            const user_adressExam = userExam.adressExam;
            const user_datetime = new Date(userExam.datetime);


            const sessionHasExam = exams.filter(__exam => __exam.Exam.exam_id === exam_id )[0];
            const price = sessionHasExam.Exam.InstitutHasPrices.length > 0 ? sessionHasExam.Exam.InstitutHasPrices[0].price : sessionHasExam.Exam.price;
            const tva = sessionHasExam.Exam.InstitutHasPrices.length > 0 ? sessionHasExam.Exam.InstitutHasPrices[0].tva : 22;
            const DateTime = new Date(sessionHasExam.DateTime);
            const adressExam = sessionHasExam.adressExam;

            if(+user_price !== +price || user_datetime.getTime() !== DateTime.getTime() || user_adressExam !== adressExam || +user_tva !== +tva ) {
                return true;
            }

            return false
    }
    const onSubmit = async (data) => {
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const dataForm = {
            institutHasUser : {
                institut_id,
            },
            user : {
                avatar: data.avatar===""? null : data.adress2,
                login: data.login,
                password:bcrypt.hashSync(data.password1, salt),
                email:data.email,
                phone:data.phone,
                civility:+data.civility,
                gender:+data.gender,
                firstname:data.firstname,
                lastname:data.lastname,
                adress1:data.adress1,
                adress2:data.adress2===""? null : data.adress2,
                zipcode:data.zipcode,
                city:data.city,
                country_id:+data.country_id,
                birthday:data.birthday,
                nativeCountry_id:+data.nativeCountry_id,
                nationality_id:+data.nationality_id,
                firstlanguage_id:+data.firstlanguage_id,
            },
            sessionUser : {
                session_id: +session_id,
                user_id: null,
                paymentMode: data.paymentMode,
                numInscrAnt: data.numInscrAnt===""? null : data.numInscrAnt,
                inscription: new Date(),
                hasPaid: data.hasPaid,
                informations: data.informations,
            },
        };
        const sessionUserOptions = [];
        data.userExams.forEach( (_exam) => {
            if(_exam.isOption) {
                sessionUserOptions.push({
                    user_price:+_exam.user_price,
                    tva: +_exam.tva_user,
                    addressExam: _exam.adressExam,
                    isCandidate: null,
                    DateTime: _exam.datetime,
                    sessionUser_id: null,
                    exam_id: +_exam.exam_id
                });
            } else if(isUserOption(_exam) ) {
                sessionUserOptions.push({
                    user_price:+_exam.user_price,
                    tva: +_exam.tva_user,
                    addressExam: _exam.adressExam,
                    isCandidate: null,
                    DateTime: _exam.datetime,
                    sessionUser_id: null,
                    exam_id: +_exam.exam_id
                });
            }

        });
        dataForm.sessionUserOptions = sessionUserOptions;

        dispatch(registerUserInstitut(institut_id, session_id, dataForm));
        reset(defaultValues);
        navigate(PATH_DASHBOARD.session.detail(institut_id, session_id));
        enqueueSnackbar('Inscription effectuée !');
    };



    useEffect(() => {
        if(userOptions) {
            reset(defaultValues);
        }
    }, [reset, userOptions, defaultValues]);



    return (
        <>
            <Helmet>
                <title> Session : Inscription d&apos;un candidat | Get-Tested</title>
            </Helmet>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Session : Inscription d'un candidat"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Institut', href: PATH_DASHBOARD.institut.profile},
                        { name: 'Session', href: PATH_DASHBOARD.session.detail(institut_id,session_id)},
                        { name: 'Inscrire un candidat' }
                    ]}
                />
                <FormProvider methods={methods}  >
                    <Paper
                        sx={{
                            p: 3,
                            width: '100%',
                            boxShadow: (theme) => theme.customShadows.z8,
                        }}
                    >
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};

                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                                <Paper
                                    sx={{
                                        p: 3,
                                        my: 3,
                                        minHeight: 120,
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                                    }}
                                >
                                    <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
                                </Paper>

                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Paper
                                    sx={{
                                        p: 3,
                                        my: 3,
                                        minHeight: 120,
                                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                                    }}
                                >
                                    {getStepContent(activeStep)}
                                </Paper>
                                <Box sx={{ display: 'flex' }}>
                                    <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flexGrow: 1 }} />
                                    {isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                    )}

                                    {
                                        activeStep !== steps.length - 1 ?
                                            (
                                                <Button variant="contained" onClick={handleNext}>
                                                    Suivant
                                                </Button>
                                            ) :
                                            (
                                                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                                                    Finaliser l&apos;inscription
                                                </Button>
                                            )
                                    }



                                </Box>
                            </>
                        )}
                    </Paper>
                </FormProvider>
            </Container>
        </>
    );
}