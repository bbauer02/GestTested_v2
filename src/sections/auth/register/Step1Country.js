import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, TextField, Autocomplete } from '@mui/material';
import Iconify from '../../../components/iconify';

import {useSelector} from "../../../redux/store";

import {Block} from "../../../components/Block";


function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

Step1Country.propTypes = {
    selectedValue: PropTypes.object,
    onSelectCountry: PropTypes.func,
    nextHandler: PropTypes.func
};
export default function Step1Country({selectedValue, onSelectCountry}) {

    const { countries, isLoading} = useSelector((state) => state.country);
    const [defaultValue, setDefaultValue] = useState(selectedValue);
    return (
        <>
            <Block title="Etape 1/5 : Choisissez le pays dans lequel vous souhaitez passer le test.">
                <Autocomplete
                    value={defaultValue.country_id? defaultValue : null }
                    isOptionEqualToValue={(option, value) => option.country_id === value?.country_id}
                    disablePortal
                    options={countries}
                    sx={{ width: 300 }}
                    disableClearable
                    autoSelect
                    renderOption={(props, option) => (
                        <Box component="li" {...props} sx={{ px: '8px !important' }}>
                            <Box component="span" sx={{ flexShrink: 0, mr: 1, fontSize: 12 }}>
                                <Iconify icon={`flagpack:${option.code.toLowerCase()}`} width={20} />
                            </Box>
                            {option.label} ({option.code})
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Sélectionnez un pays"
                        />
                    )}
                    onChange={(event, newValue) => {
                        if(newValue) {
                            setDefaultValue({ label: newValue.label, country_id: newValue.country_id });
                            onSelectCountry(newValue)
                        } else {
                            onSelectCountry(null)
                        }
                    }}
                />
            </Block>
        </>
    )
}