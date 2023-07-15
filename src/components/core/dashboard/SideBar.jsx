import React, { useState } from 'react';
import sidebarLinks from '../../../data/dashboard-links'
import DashboardLinks from './DashboardLinks';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import ConfirmationModal from '../../common/ConfirmationModal';

const SideBar = () => {
    const {user} = useSelector((state) => state.profile)
    const [ConfirmationModalData, setConfirmationModalData] = useState(null)
    return (
        <div>
            <div>
                <div>
                {
                    sidebarLinks.map((link) => ((link.type && (link?.type === user.accountType)) ? (
                        <DashboardLinks key={link.id} link={link}></DashboardLinks>
                    ):(null)))
                }
                </div>
                <div>
                    <DashboardLinks link={{ name: "Settings",
                                            path: "/dashboard/instructor",
                                            icon: "VscSettingsGear",}}></DashboardLinks>
                </div>
                <div>
                    <button
                        onClick={() =>
                            setConfirmationModalData({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModalData(null),
                            })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
                {ConfirmationModalData && <ConfirmationModal Data={ConfirmationModalData} />}
            </div>
            
        </div>
    );
};

export default SideBar;