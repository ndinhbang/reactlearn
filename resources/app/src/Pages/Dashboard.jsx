import { useNavigation } from "react-router-dom";

const Dashboard = () => {
    const navigation = useNavigation();

    return (
        <div>Dashboard {navigation.state === "loading" ? "loading" : ""}</div>
    )
}

export default Dashboard
