import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
    Box,
    Chip,
    Paper,
    Table,
    Collapse,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Typography,
    IconButton,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EuroIcon from '@mui/icons-material/Euro';
// components
import Iconify from '../../../../components/iconify';

import {fDateTime_fr} from "../../../../utils/formatTime";

SessionExamCollapsibleRow.propTypes = {
    row: PropTypes.object,
    isUserOptions: PropTypes.bool
}
export default function SessionExamCollapsibleRow({row, isUserOptions=false}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <>
            <TableRow
                sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
            >
                <TableCell>
                    <IconButton
                        size="small"
                        color={open ? 'inherit' : 'default'}
                        onClick={() => setOpen(!open)}
                    >
                        <Iconify icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row?.Exam?.isOption ? <Chip size="small" label="Option"  color="primary"   /> : ""} {row?.Exam?.label} || {row?.room ? row?.room : row?.Exam?.sessionHasExams[0].room }</Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                            {row?.adressExam? row?.adressExam : row?.Exam?.sessionHasExams[0].adressExam }
                        </Typography>
                    </Box>
                </TableCell>

                <TableCell align="left">  <Typography color={!isUserOptions && row?.DateTime? "default" : "error"}> {fDateTime_fr( row?.DateTime? row?.DateTime : row?.Exam?.sessionHasExams[0].DateTime )} </Typography></TableCell>
                <TableCell align="center">
                    <Iconify
                        icon={row?.Exam?.isWritten ? 'bi:pen-fill' : 'ooui:user-talk-ltr'}
                        sx={{
                            width: 20,
                            height: 20,
                            color: blue[700],
                        }}
                    />
                </TableCell>
            </TableRow>


            <TableRow>
                <TableCell sx={{ py: 0 }} colSpan={6}>
                    <Collapse in={open} unmountOnExit>
                        <Paper
                            variant="outlined"
                            sx={{
                                py: 2,
                                borderRadius: 1.5,
                                ...(open && {
                                    boxShadow: (theme) => theme.customShadows.z20,
                                }),

                            }}
                        >
                            <Typography variant="h6" sx={{ m: 2, mt: 0 }}>
                                Détail de &quot;{row?.Exam?.label}&quot;
                            </Typography>
                            <Table size="small" aria-label="detail">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Durée(min.)</TableCell>
                                        <TableCell>Coeff.</TableCell>
                                        <TableCell align="right">Nbr. Questions</TableCell>
                                        <TableCell align="right">Score de validation</TableCell>
                                        <TableCell align="right">Prix</TableCell>
                                        <TableCell align="right">TVA</TableCell>
                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row"><Chip icon={<AccessTimeIcon />} size="small" label={`${row?.Exam?.duration} min.`}   /></TableCell>
                                            <TableCell>{row?.Exam?.coeff}</TableCell>
                                            <TableCell align="right">{row?.Exam?.nbrQuestions}</TableCell>
                                            <TableCell align="right">{row?.Exam?.successScore}</TableCell>
                                            <TableCell align="right"><Chip icon={<EuroIcon />} color={row?.user_price? "error" : "default"} size="small" label={row?.user_price? row?.user_price : row?.Exam?.price}   /></TableCell>
                                            <TableCell align="right"><Chip  size="small" color={row?.tva? "error" : "default"} label={row?.tva? `${row?.tva} %` : "20 %"}   /></TableCell>

                                        </TableRow>
                                    </TableBody>
                            </Table>
                        </Paper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}