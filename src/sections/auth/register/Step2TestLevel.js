import PropTypes from 'prop-types';
import  { useState, useEffect, useCallback } from 'react';
import {useSelector} from "../../../redux/store";

export default function Step2TestLevel() {
    const { tests, isLoading} = useSelector((state) => state.test);

    return (
        <>
            Step2TestLevel
        </>
    )
}