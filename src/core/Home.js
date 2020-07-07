import React from 'react' ;
import Posts from "../post/Posts";
import Menu from "./Menu"
const Home = () => (
    <div>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Benvenuto(a)</h1>
                <p className="lead">Post Recenti .</p>
            </div>
        </div>

        <div className="container">
            <Posts/>
        </div>


    </div>
);

export default Home ;