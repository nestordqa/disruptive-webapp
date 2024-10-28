import React, { useEffect } from 'react'
import useStore from '../../../store/useStore';
import '../../../styles/content.css';
import Loading from '../../common/Loading';
import { ContentTable } from './tables/ContentTable';
import { CreateContent } from './modals/CreateContent';

export const Content = () => {

    const { 
        jwt,  
        loading, 
        fetchContentData, 
        fetchCategoriesData,
        loadingCategories
    } = useStore();

    useEffect(() => {
        fetchCategoriesData(jwt)
            .then()
            .catch((e) => console.error(e));
        fetchContentData(jwt)
            .then()
            .catch((e) => console.error(e));
        //eslint-disable-next-line
    }, [])

    return (
        <div className='content-container'>
            {
                (loading || loadingCategories) && <Loading />
            }
            {
                (!loading && !loadingCategories) &&
                    <ContentTable />
            }
            <CreateContent />
        </div>
    )
}
