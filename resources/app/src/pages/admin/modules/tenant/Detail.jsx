import { useNavigation } from "react-router-dom";

const TenantDetail = () => {
    const navigation = useNavigation();

    return (
        <div className={`tenant-detail-page`}>TenantDetail {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default TenantDetail
