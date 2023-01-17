import React from 'react'
import { useTheme } from '@mui/material/styles';
import {
    Skeleton
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
import { Markup } from 'react-render-markup';

const TermsAndConditions = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [pageContent, setPageContent] = React.useState({});

    React.useEffect(() => {
        getPageContent();
    },[])

    const getPageContent = async () => {
        axios.get('/sections/terms-and-conditions').then(res => {
            setPageContent(res.data);
        }).catch(console.error)
    }

    return (
        <div className="container">
            <br /><br />
            <h1 className="text-center" style={{color: theme.palette.primary.main, fontWeight: 'bold', fontFamily: 'Jura'}}>Terms and Conditions</h1>
            <br />
            {pageContent?.content ?
            <Markup markup={pageContent.content} />
            : <>
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width={300} height={20} />
            <br />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width={300} height={20} />

            <br />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width={300} height={20} />

            <br />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width={300} height={20} />
            </>}
        </div>
    )
}

export default TermsAndConditions
