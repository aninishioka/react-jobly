import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import CompanyDetail from '../companies/CompanyDetail';
import CompanyList from '../companies/CompanyList';
import JobList from '../jobs/JobList';
import LoginForm from '../user/LoginForm';
import SignupForm from '../user/SignupForm';
import ProfileForm from '../user/ProfileForm';
import { useContext } from "react";
import userContext from '../user/userContext';

/** Component to hold all routes.
 *
 * State:
 * - login(): fn to call in parent
 * - signup(): fn to call in parent
 *
 * Props: none
 *
 * App -> RouteList -> {HomePage, CompanyList, CompanyDetail, JobList,
 *                      ProfileForm, LoginForm, SignupForm}
 */


function RouteList({ login, signup, updateUser }) {
    console.log("in rendering RouteList");
    const { user } = useContext(userContext);

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            {user
                ? <>
                    <Route path='/companies' element={<CompanyList />} />
                    <Route path='/companies/:handle' element={<CompanyDetail />} />
                    <Route path='/jobs' element={<JobList />} />
                    <Route path='/profile' element={<ProfileForm updateUser={updateUser} />} />
                </>
                : <>
                    <Route path='/login' element={<LoginForm loginUser={login} />} />
                    <Route path='/signup' element={<SignupForm signupUser={signup} />} />
                </>
            }
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    );
}

export default RouteList;