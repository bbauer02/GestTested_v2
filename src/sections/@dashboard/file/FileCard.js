import * as React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Button, Divider, MenuItem, Checkbox, IconButton } from '@mui/material';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// components
import Iconify from '../../../components/iconify';
import FileThumbnail from '../../../components/file-thumbnail';
import TextMaxLine from '../../../components/text-max-line';


FileCard.propTypes = {
    filename: PropTypes.string,
    onSelect: PropTypes.func,
    docType: PropTypes.string
};

export default function FileCard({filename, onSelect, docType}) {
return (
        <>
            <Card
                sx={{
                    p: 2.5,
                    width: 1,
                    maxWidth: 300,
                    boxShadow: 0,
                    bgcolor: 'background.default',
                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                    cursor: 'pointer'

                }}
                onClick={() => onSelect(docType) }
            >
                        <Stack
                            spacing={0.5}
                            direction="row"
                            alignItems="center"
                            sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
                        >
                            <FileThumbnail file="pdf" sx={{ width: 30, height: 30 }} />
                            <TextMaxLine
                                variant="subtitle1"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                {filename}
                            </TextMaxLine>
                        </Stack>
         </Card>
        </>
    )

}