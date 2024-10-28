import React, { useEffect } from 'react'
import useStore from '../../store/useStore';
import { useNavigate, Routes, Route } from 'react-router-dom';
import '../../styles/dashboard.css';
import { Navbar } from '../common/Navbar';
import { Content } from './dashboard-components/Content';
import { Categories } from './dashboard-components/Categories';

export const Dashboard = ({ children }) => {
    const { jwt } = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!jwt) {
            navigate('/');
        } else {
            navigate('/dashboard/categories');
        }
        //eslint-disable-next-line
    }, [])
    return (
        <div className='dashboard-container'>
            <Navbar />
            <div className="info-conainer">
                <Routes>
                    <Route path="categories" index element={<Categories />} />
                    <Route path="content" element={<Content />} />
                </Routes>
            </div>
        </div>
    )
}
