import { useNavigation } from "react-router-dom";

const Dashboard = () => {
    const navigation = useNavigation();

    return (
        <div>Dashboard {navigation.state === "navigating" ? "navigating" : ""}</div>
    )
}

export default Dashboard
