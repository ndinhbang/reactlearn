import { useNavigation } from "react-router-dom";

const TenantDashboard = () => {
    const navigation = useNavigation();

    return (
        <div>TenantDashboard {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default TenantDashboard
