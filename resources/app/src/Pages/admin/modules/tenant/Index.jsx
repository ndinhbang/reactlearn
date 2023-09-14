import { useNavigation } from "react-router-dom";

const TenantIndex = () => {
    const navigation = useNavigation();

    return (
        <div className={`tenant-index-page`}>TenantIndex {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default TenantIndex
