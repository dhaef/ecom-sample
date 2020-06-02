import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container footer-pad">
                <div className="row">
                    <div className="col-12 col-md-6 center-item">
                        <h5 className="text-center">SIGN UP FOR THE LATEST</h5>
                        <input placeholder="Enter your email" />
                        <button className="btn btn-dark ml-2">SIGN UP</button>
                    </div>
                    <div className="col-12 col-md-6 social-container">
                        {/* <h3>Social icons</h3> */}
                        <i className="fab fa-instagram social-icon ml-auto"></i>
                        <i className="fab fa-facebook-square social-icon"></i>
                        <i className="fab fa-twitter-square social-icon mr-auto"></i>
                    </div>
                </div>
                <div className="row mt-4">
                    <ul className="nav" style={{ margin: '0 auto', fontSize: 'larger' }}>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Locations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">FAQ</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
