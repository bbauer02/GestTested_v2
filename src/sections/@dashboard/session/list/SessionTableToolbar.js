import PropTypes from 'prop-types';
// @mui
import { Tooltip, IconButton, Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from "../../../../components/iconify";

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

SessionTableToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    filterTest: PropTypes.string,
    onFilterTest: PropTypes.func,
    optionsTest: PropTypes.array,
    filterLevel: PropTypes.string,
    onFilterLevel: PropTypes.func,
    optionsLevel: PropTypes.array,
};

export default function SessionTableToolbar({ 
    filterName, 
    onFilterName,
    filterTest,
    onFilterTest,
    optionsTest,
    filterLevel,
    onFilterLevel,
    optionsLevel,
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
        >    <TextField
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
            <TextField
                value={filterName}
                onChange={(event) => onFilterName(event.target.value)}
                placeholder="Recherchez une session d'un institut..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                        </InputAdornment>
                    ),
                }}
            />

            <Tooltip title="Filter list">
                <IconButton>
                    <Iconify icon='ic:round-filter-list' />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}
