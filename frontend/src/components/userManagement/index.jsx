import React from 'react'
import SuperVisor from './SuperVisor'
import { useLocation } from 'react-router-dom';
import AssistantStateCoordinator from './AssistantStateCoordinator';
import StateCoordinator from './StateCoordinator';
import ZonalManager from './ZonalManager';
import Filters from './Filters';
import { ROLE_TYPE } from '../../utils/helper';

const Users = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const roleType = queryParams.get('role_type');

    const renderMainView = () => {
        switch (roleType) {
            case ROLE_TYPE.SUPER_VISOR:
                return <SuperVisor />;
            case ROLE_TYPE.ASSISTANT_STATE_COORDINATOR:
                return <AssistantStateCoordinator />;
            case ROLE_TYPE.STATE_COORDINATOR:
                return <StateCoordinator />;
            case ROLE_TYPE.ZONAL_MANAGER:
                return <ZonalManager />;
            default:
                return <p>No users found for this role</p>;
        }
    };

    return (
        <div className="role-container">
            <Filters />
            {renderMainView()}
        </div>
    )
}

export default Users