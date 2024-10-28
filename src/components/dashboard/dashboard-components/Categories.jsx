import React, { useEffect } from 'react';
import '../../../styles/content.css';
import useStore from '../../../store/useStore';
import Loading from '../../common/Loading';
import { CategoryTable } from './tables/CategoryTable';
import { CreateCategory } from './modals/CreateCategory';

export const Categories = () => {
    
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
                    <CategoryTable />
            }
            <CreateCategory />
        </div>
    )
}
