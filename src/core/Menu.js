import React from 'react'
import { signout, isAuthenticated } from "../authentication";
import { Link, withRouter } from "react-router-dom"; {/* withRouter is higher order componenent: take other argoment as an argument */ }


// define which link is active in the nav bar
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#6699ff" };
    else return { color: "#6699ff", opacity: 0.9, cursor: "pointer" }
};

// menu 'fixed-top' to fix it
const Menu = ({ history }) => (
    <div className="d-flex justify-content-center align-items-center" style={{ 'position': 'sticky', 'top': 0 ,'min-height':'100vh' ,'display':'flex'}} >
        {/* "jsx-4096498568 header-content" */}
        {/* <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p> */}


        <ul className="vertical-nav bg-white pl-0" id="sidebar">

            <li className="nav-item" style={{ 'list-style': 'none' }}>
                <Link className="nav-link" style={isActive(history, "/")} to="/">
                    <i className="fas fa-home"></i> {" "}
                    Home</Link>
            </li>

            <li className="nav-item" style={{ 'list-style': 'none' }}>
                <Link className="nav-link" style={isActive(history, "/users")} to="/users">
                    <i className="fas fa-users"></i> {" "}
                    Utenti</Link>
            </li>

            {!isAuthenticated() && (
                <> {/* react fragment like div, to avoid error */}
                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
                            <i className="fas fa-sign-in-alt"></i>{" "}
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
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                            <i className="fas fa-user"></i> {" "}
                            {isAuthenticated().user.name}  {/* user is returned as a response from local storage in isAuthenticated */}

                        </Link>

                    </li>


                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to={`/post/create`}
                            style={isActive(history, `/post/create`)}>
                            <i className="fas fa-plus-circle"></i> {" "}
                            Crea un post

                        </Link>

                    </li>


                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        {/* i used <a> because no need to navigate between components */}

                        <Link
                            className="nav-link"
                            to={`/findpeople`}
                            style={isActive(history, `/findpeople`)}>

                            <i className="fas fa-user-plus"></i> {" "}
                            Cerca utenti

                        </Link>

                    </li>
                    <li className="nav-item" style={{ 'list-style': 'none' }}>
                        <span
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            <i className="fas fa-sign-out-alt"></i>{" "}
                            Esci</span>
                    </li>

                </>
            )}

            {/* {JSON.stringify(props.history)} */}

        </ul>

    </div>



);

export default withRouter(Menu); {/* the benefit of withRouter is to access to props => to get access to history object*/ }


// const isActive = (history, path) => {
//     if (history.location.pathname === path) return { color: '#ff9900' };
//     else return { color: '#ffffff' };
// };

// const Menu = ({ history }) => (
//     <div  >
//         <ul className="nav nav-tabs bg-primary" >

//             <li className="nav-item" style={{'list-style':'none'}}>
//                 <Link className="nav-link" style={isActive(history, '/')} to="/">
//                     Home
//                 </Link>
//             </li>

//             <li className="nav-item" style={{'list-style':'none'}}>
//                 <Link
//                     className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
//                     to="/users"
//                 >
//                     Users
//                 </Link>
//             </li>

//             <li className="nav-item" style={{'list-style':'none'}}>
//                 <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
//                     Create Post
//                 </Link>
//             </li>

//             {!isAuthenticated() && (
//                 <React.Fragment>
//                     <li className="nav-item" style={{'list-style':'none'}}>
//                         <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
//                             Sign In
//                         </Link>
//                     </li>
//                     <li className="nav-item" style={{'list-style':'none'}}>
//                         <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
//                             Sign Up
//                         </Link>
//                     </li>
//                 </React.Fragment>
//             )}

//             {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
//                 <li className="nav-item" style={{'list-style':'none'}}>
//                     <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
//                         Admin
//                     </Link>
//                 </li>
//             )}

//             {isAuthenticated() && (
//                 <React.Fragment>
//                     <li className="nav-item" style={{'list-style':'none'}}>
//                         <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
//                             Find People
//                         </Link>
//                     </li>

//                     <li className="nav-item" style={{'list-style':'none'}}>
//                         <Link
//                             to={`/user/${isAuthenticated().user._id}`}
//                             style={isActive(history, `/user/${isAuthenticated().user._id}`)}
//                             className="nav-link"
//                         >
//                             {`${isAuthenticated().user.name}'s profile`}
//                         </Link>
//                     </li>

//                     <li className="nav-item" style={{'list-style':'none'}}>
//                         <span
//                             className="nav-link"
//                             style={{ cursor: 'pointer', color: '#fff' }}
//                             onClick={() => signout(() => history.push('/'))}
//                         >
//                             Sign Out
//                         </span>
//                     </li>
//                 </React.Fragment>
//             )}
//         </ul>
//     </div>
// );

// export default withRouter(Menu);