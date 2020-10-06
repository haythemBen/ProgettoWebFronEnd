import React from 'react'
import { signout, isAuthenticated } from "../authentication";
import { Link, withRouter } from "react-router-dom"; {/* withRouter is higher order componenent: take other argoment as an argument */ }

//per sapere dovo sono nella nav bar Menu
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "white" , margin:"20px" , backgroundColor: ' #3aafa9'};
    else return { color: "white", opacity: 0.8, cursor: "pointer", margin:"20px" }
};

// menu 'fixed-top' to fix it
const Menu = ({ history }) => (
    <div className="d-flex  align-items-center" style={{ 'position': 'sticky', 'top': 0 ,'min-height':'100vh' ,'display':'flex' ,backgroundColor: ' #2b7a78'}} >
        {/* "jsx-4096498568 header-content" */}
        {/* <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p> */}

        <h3 >
        <ul className="vertical-nav  pl-0" id="sidebar" >
            {/*style={{ 'list-style': 'none' }} per evitare i punti dei items della list*/}
            

            {!isAuthenticated() && (
                <> {/* react fragment like div, to avoid error */}
                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                            {/* <i className="fas fa-sign-in-alt"></i>{" "} */}
                            Accedi</Link>
                    </li>
                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
                            <i className="fas fa-user-plus"></i>{" "}
                            Iscriviti</Link>
                    </li>
                </>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item" style={{ 'list-style': 'none' }}> 
                        <Link className="nav-link" style={isActive(history, "/")} to="/">
                            {/* <i className="fas fa-home"></i> {" "} */}
                            Home</Link>
                    </li>


                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        <Link className="nav-link" style={isActive(history, "/users")} to="/users">
                            {/* <i className="fas fa-users"></i> {" "} */}
                            Utenti</Link>
                    </li>
                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                            {/* <i className="fas fa-user"></i> {" "} */}
                            Profilo {isAuthenticated().user.name}  {/* user is returned as a response from local storage in isAuthenticated */}

                        </Link>

                    </li>


                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to={`/post/create`}
                            style={isActive(history, `/post/create`)}>
                            {/* <i className="fas fa-plus-circle"></i> {" "} */}
                            Crea un post
                        </Link>

                    </li>


                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to={`/findpeople`}
                            style={isActive(history, `/findpeople`)}>

                            {/* <i className="fas fa-user-plus"></i> {" "} */}
                            Cerca utenti

                        </Link>

                    </li>
                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        <span
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            <i className="fas fa-times"></i>{" "}
                            Esci</span>
                    </li>
                    

                </>
            )}



        </ul></h3>

    </div>



);

export default withRouter(Menu); {/* the benefit of withRouter is to access to props => to get access to history object*/ }

