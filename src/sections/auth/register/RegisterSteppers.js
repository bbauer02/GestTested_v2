import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
    Box,
    Step,
    Paper,
    Button,
    Stepper,
    StepLabel,
    Typography,
    StepConnector,
    stepConnectorClasses,
} from '@mui/material';
// utils
import { bgGradient } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import Step1Country from "./Step1Country";
import Step2TestLevel from "./Step2TestLevel";
import Step3Session from "./Step3Session";
import Step4UserInfo from "./Step4UserInfo";
import Step5Final from "./Step5Final";

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCountries } from '../../../redux/slices/country';
import { getTests } from '../../../redux/slices/test';

// hooks
import useRegisterForm from '../../../hooks/useRegisterForm';

// ----------------------------------------------------------------------

const STEPS = ['Choisir un pays', 'Choisir un test et un niveau', 'Choisir une session et des options', 'Saisir vos coordonnées', 'Finaliser'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.success.main,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.success.main,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderRadius: 1,
        borderTopWidth: 3,
        borderColor: theme.palette.divider,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    height: 22,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.disabled,
    ...(ownerState.active && {
        color: theme.palette.success.main,
    }),
    '& .QontoStepIcon-completedIcon': {
        zIndex: 1,
        fontSize: 18,
        color: theme.palette.success.main,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    className: PropTypes.string,
};

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Iconify
                    icon="eva:checkmark-fill"
                    className="QontoStepIcon-completedIcon"
                    width={24}
                    height={24}
                />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            ...bgGradient({
                startColor: theme.palette.error.light,
                endColor: theme.palette.error.main,
            }),
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            ...bgGradient({
                startColor: theme.palette.error.light,
                endColor: theme.palette.error.main,
            }),
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        borderRadius: 1,
        backgroundColor: theme.palette.divider,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    zIndex: 1,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
    ...(ownerState.active && {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        color: theme.palette.common.white,
        ...bgGradient({
            startColor: theme.palette.error.light,
            endColor: theme.palette.error.main,
        }),
    }),
    ...(ownerState.completed && {
        color: theme.palette.common.white,
        ...bgGradient({
            startColor: theme.palette.error.light,
            endColor: theme.palette.error.main,
        }),
    }),
}));

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    icon: PropTypes.number,
    completed: PropTypes.bool,
    className: PropTypes.string,
};

function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;

    const icons = {
        1: <Iconify icon="fluent-mdl2:world" width={24} />,
        2: <Iconify icon="map:school" width={24} />,
        3: <Iconify icon="material-symbols:component-exchange" width={24} />,
        4: <Iconify icon="icomoon-free:profile" width={24} />,
        5: <Iconify icon="mingcute:card-pay-fill" width={24} />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(icon)]}
        </ColorlibStepIconRoot>
    );
}




export default function RegisterSteppers() {
    // utilisation du Context propre au composant RegisterForm
    const { selected, setInstitutCountry, setTest } = useRegisterForm();
    console.log(selected)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getTests());
    }, [dispatch]);


    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    //
    const handleCountrySelect = (newValue) => {
        setInstitutCountry(newValue);
    };
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Step1Country selectedValue={selected.institutCountry} onSelectCountry={handleCountrySelect} />;
            case 1:
                return <Step2TestLevel />;
            case 2:
                return <Step3Session />;
            case 3:
                return <Step4UserInfo />;
            case 4:
                return <Step5Final />;
            default:
                return 'Unknown step';
        }
    }


    return (
        <>
            <Box sx={{ mb: 5 }} />

            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {STEPS.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === STEPS.length ? (
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

                    <Button color="inherit" onClick={handleReset} sx={{ mr: 1 }}>
                        Reset
                    </Button>
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

                    <Box sx={{ textAlign: 'right' }}>
                        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                            {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
}
