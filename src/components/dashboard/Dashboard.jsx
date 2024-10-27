import React, { useEffect } from 'react'
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const { jwt } = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!jwt) {
            navigate('/');
        }
        //eslint-disable-next-line
    }, [])
  return (
    <div>Dashboard</div>
  )
}
