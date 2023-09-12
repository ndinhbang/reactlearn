import { Link, Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div>
            Home
            <nav>
                <ul>
                    <li>
                        <Link to={`dashboard`}>Go to Dashboard</Link>
                    </li>
                    <li>
                        <Link to={`articles`}>Go to Article list</Link>
                    </li>
                    <li>
                        <Link to={`articles/1`}>Go to Article detail</Link>
                    </li>
                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
