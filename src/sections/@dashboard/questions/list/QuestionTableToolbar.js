import PropTypes from 'prop-types';
// @mui
import {Tooltip, IconButton, Stack, InputAdornment, TextField, MenuItem, Button, Autocomplete } from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
// components
import Iconify from "../../../../components/iconify";

const INPUT_WIDTH = 160;

const GroupHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    top: '-8px',
    padding: '4px 10px',
    color: theme.palette.primary.main,
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
}));

const GroupItems = styled('ul')({
    padding: 0,
});

QuestionTableToolbar.propTypes = {
    isFiltered: PropTypes.bool,
    filterTest: PropTypes.string,
    onFilterTest: PropTypes.func,
    optionsTest: PropTypes.array,
    filterLevel: PropTypes.string,
    onFilterLevel: PropTypes.func,
    optionsLevel: PropTypes.array,
    onResetFilter: PropTypes.func,
    optionsSkill: PropTypes.array,
    onFilterSkill: PropTypes.func,
};

export default function QuestionTableToolbar({
                                                 isFiltered,
                                                 filterTest,
                                                 onFilterTest,
                                                 optionsTest,
                                                 filterLevel,
                                                 onFilterLevel,
                                                 optionsLevel,
                                                 onResetFilter,
                                                 optionsSkill,
                                                 onFilterSkill
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
            <Autocomplete
                multiple
                fullWidth
                options={optionsSkill}
                groupBy={(option) => `${option.test} ${option.level}`}
                getOptionLabel={(option) => option?.label}
                defaultValue={[]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField {...params} label="Recherche par compétences" placeholder="Compétences" />
                )}
                renderGroup={(params) => (
                    <li key={params.key}>
                        <GroupHeader>{params.group}</GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                    </li>
                )}
                onChange={(event, values) => {
                    onFilterSkill(values)
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