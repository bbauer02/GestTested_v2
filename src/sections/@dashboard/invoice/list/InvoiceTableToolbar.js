import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

InvoiceTableToolbar.propTypes = {
    isFiltered: PropTypes.bool,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    onResetFilter: PropTypes.func,
    filterTest: PropTypes.string,
    onFilterTest: PropTypes.func,
    optionsTest: PropTypes.array,
    filterLevel: PropTypes.string,
    onFilterLevel: PropTypes.func,
    optionsLevel: PropTypes.array,
    filterEndDate: PropTypes.instanceOf(Date),
    filterStartDate: PropTypes.instanceOf(Date),
    onFilterStartDate: PropTypes.func,
    onFilterEndDate: PropTypes.func,
};

export default function InvoiceTableToolbar({
                                                isFiltered,
                                                filterName,
                                                onFilterName,
                                                onResetFilter,
                                                filterTest,
                                                onFilterTest,
                                                optionsTest,
                                                filterLevel,
                                                onFilterLevel,
                                                optionsLevel,
                                                onFilterEndDate,
                                                onFilterStartDate,
                                                filterStartDate,
                                                filterEndDate,
                                            }) {
    return (
        <Stack
            spacing={2}
            alignItems="center"
            direction={{
                xs: 'column',
                md: 'row',
            }}
            sx={{ px: 2.5, py: 3 }}
        >
            <TextField
                fullWidth
                select
                label="Recherche par Test"
                value={filterTest}
                onChange={onFilterTest}
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            sx: { maxHeight: 220 },
                        },
                    },
                }}
                sx={{
                    maxWidth: { md: INPUT_WIDTH },
                    textTransform: 'capitalize',
                }}
            >
                <MenuItem
                    value="all"
                    sx={{
                        mx: 1,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                    }}
                >
                    Tous
                </MenuItem>
                {optionsTest.map((option) => (
                    <MenuItem
                        key={option.test_id}
                        value={option.label}
                        sx={{
                            mx: 1,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                fullWidth
                select
                label="Recherche par Niveau"
                value={filterLevel}
                onChange={onFilterLevel}
                SelectProps={{
                    MenuProps: {
                        PaperProps: {
                            sx: { maxHeight: 220 },
                        },
                    },
                }}
                sx={{
                    maxWidth: { md: INPUT_WIDTH },
                    textTransform: 'capitalize',
                }}
            >
                <MenuItem
                    value="all"
                    sx={{
                        mx: 1,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                    }}
                >
                    Tous
                </MenuItem>
                {optionsLevel.map((option) => (
                    <MenuItem
                        key={option.level_id}
                        value={option.label}
                        sx={{
                            mx: 1,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                        }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <DatePicker
                label="Date début"
                value={filterStartDate}
                onChange={onFilterStartDate}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            maxWidth: { md: INPUT_WIDTH },
                        }}
                    />
                )}
            />

            <DatePicker
                label="Date Fin"
                value={filterEndDate}
                onChange={onFilterEndDate}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        sx={{
                            maxWidth: { md: INPUT_WIDTH },
                        }}
                    />
                )}
            />
            <TextField
                fullWidth
                value={filterName}
                onChange={onFilterName}
                placeholder="Recherche par nom de client ou numéro de facture..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    ),
                }}
            />

            {isFiltered && (
                <Button
                    color="error"
                    sx={{ flexShrink: 0 }}
                    onClick={onResetFilter}
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                >
                    supprimer les filtres
                </Button>
            )}
        </Stack>
    );
}
