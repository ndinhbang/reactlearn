import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <div>AdminDashboard</div>
            <nav id="sidebar">
                <div>
                    <NavLink
                        to="/admin/tenant"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Tenant List
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        to="/admin/article"
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

export default AdminDashboard
