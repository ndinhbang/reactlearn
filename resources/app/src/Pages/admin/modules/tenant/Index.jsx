import { Link, useNavigation } from "react-router-dom";

const TenantIndex = () => {
    const navigation = useNavigation();

    return (
        <div className={`tenant-index-page`}>
            TenantIndex {navigation.state === "navigating" ? "navigating" : ""}
            <div>
                <Link to={'/admin/dashboard'}>Back to dashboard</Link>
            </div>
        </div>
    )
}

export default TenantIndex
