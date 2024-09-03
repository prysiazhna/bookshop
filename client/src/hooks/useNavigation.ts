import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useNavigation = (redirectTo: string, shouldApplyAuthCheck: boolean = true) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!shouldApplyAuthCheck || isAuthenticated) {
            navigate(redirectTo);
        }
    }, [isAuthenticated, navigate, redirectTo, shouldApplyAuthCheck]);
};

export default useNavigation;
