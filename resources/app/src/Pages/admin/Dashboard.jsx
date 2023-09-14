import { useNavigation } from "react-router-dom";

const AdminDashboard = () => {
    const navigation = useNavigation();

    return (
        <div>AdminDashboard {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default AdminDashboard
