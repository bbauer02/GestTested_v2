import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Tooltip, IconButton, Stack, InputAdornment, TextField, Autocomplete, Chip } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getTests } from '../../../../redux/slices/test';


// ----------------------------------------------------------------------

ExamTableToolbar.propTypes = {
  filterName: PropTypes.string,
  filterTags: PropTypes.array,
  onFilterName: PropTypes.func,
  onFilterTags: PropTypes.func
};
export default function ExamTableToolbar({ filterName, filterTags, onFilterName, onFilterTags }) {
  const dispatch = useDispatch();
  const { tests} = useSelector((state) => state.test);
  const { control } = useForm();

  useEffect(() => {
    dispatch(getTests());
  }, [dispatch]);

  return (
    <Stack direction="row" alignItems="left" justifyContent="space-between" sx={{ py: 2.5, px: 3 }}>
      <Stack direction="row" spacing={2}>
        <TextField
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Recherchez une épreuve..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              sx={{ width: 400 }}
              {...field}
              defaultValue={[]}
              multiple
              freeSolo
              onChange={(event, newValue) => {
                onFilterTags(newValue)
              }}
              options={tests}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option?.test_id? option?.test_id : option} size="small" label={option?.label? option?.label : option} />
                ))
              }
              renderInput={(params) => <TextField label="Test de langue" {...params} />}
            />
          )}
        />
      </Stack>

    
      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon='ic:round-filter-list' />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
