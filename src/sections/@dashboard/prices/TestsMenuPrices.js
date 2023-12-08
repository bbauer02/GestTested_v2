import PropTypes from "prop-types";
import React,{useEffect, useState} from 'react';

import {Paper, ListItemButton, ListItemText, List, Stack, Card, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';


import {useDispatch, useSelector} from "../../../redux/store";
import {selectTest, selectTestChild, getExamPrices} from '../../../redux/slices/price';
import PricesForm from "./PricesForm";


const StyledListContainer = styled(Paper)(({ theme }) => ({
    minWidth: '150px',
    border: `solid 1px ${theme.palette.divider}`,
}));

TestsMenu.propTypes = {
    institut: PropTypes.number
}
export default function TestsMenu({institut}) {
    const dispatch = useDispatch();
    const { tests } = useSelector((state) => state.test);
    const { selectedTest, selectedTestChild, examsPrices } = useSelector((state) => state.prices);
    const [currentTab, setCurrentTab] = useState(0);
    const [TABS, setTABS] = useState([]);

    useEffect(() => {
        if(selectedTestChild) {
            dispatch(getExamPrices(institut, selectedTestChild.test_id))
        }
    }, [dispatch, institut, selectedTestChild])

    useEffect(() => {
        if(selectedTest) {
            setCurrentTab(0);
            let tabs = [];
            const firstTab = {
                id: 0,
                label : selectedTest.label,
                test_id : selectedTest.test_id
            }
            tabs.push(firstTab);
            if(selectedTest.child.length > 0) {

                const children = selectedTest.child.map((_test, index) =>
                    ({
                        id: index+1,
                        label : _test.label,
                        test_id : _test.test_id
                    })
                )
                tabs = [...tabs,...children];

            }

            setTABS(tabs);
            dispatch(selectTestChild(tabs[0]));
        }

    }, [selectedTest, dispatch])
    const handleTab = (event, newValue) => {
        setCurrentTab(newValue);
    }
    const handleSelectChild = (tab) => {
        dispatch(selectTestChild(tab));
    }
    const hasChild = TABS.length > 0;
    return (
        <Stack direction="row" spacing={3}>
            <Card>
                <StyledListContainer>
                    <List component="nav" aria-labelledby="nested-list-subheader">
                        {tests.map((_item, index) =>
                            <ListItemButton key={index} onClick={() => dispatch(selectTest(_item))}>
                                <ListItemText  primary={_item?.label} />
                            </ListItemButton>)
                        }
                    </List>
                </StyledListContainer>
            </Card>
            <Card>
                {hasChild && <Tabs value={currentTab} onChange={(event, newValue) => handleTab(event, newValue)}>
                    {TABS.map((tab, index) =>
                            <Tab key={index} value={tab?.index} label={tab?.label}
                                 onClick={() => handleSelectChild(tab)}/>
                    )}
                </Tabs>}
                    {examsPrices?.map( (_exam,index) =>
                            <PricesForm key={index} examPrice={_exam} institut={institut}/>
                        )
                    }
            </Card>
        </Stack>
    );
}

