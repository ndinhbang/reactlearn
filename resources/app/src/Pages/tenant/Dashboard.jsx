import { NavLink, useNavigation } from "react-router-dom";

const TenantDashboard = () => {
    const navigation = useNavigation();

    return (
        <div>
            <div>TenantDashboard</div>
            <div>{navigation.state}</div>
            <nav id="sidebar">
                <div>
                    <NavLink
                        to="/tenant/article"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Article List
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default TenantDashboard
