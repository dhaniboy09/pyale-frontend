import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer bg-light">
        <div className="container">
        <section className="cta bg-light" id="contact">
            <div className="row">
              <div className="col-lg-4">
                <ul className="list-inline social margin-t-20">
                  <li className="list-inline-item">
                    <Link to="JavaScript:Void(0);" className="social-icon">
                      <i className="mdi mdi-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="JavaScript:Void(0);" className="social-icon">
                      <i className="mdi mdi-twitter"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="JavaScript:Void(0);" className="social-icon">
                      <i className="mdi mdi-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 margin-t-30">
                <p className="margin-b-0 contact-title">
                  <i className="pe-7s-call"></i> &nbsp;+234 818 817 5030
                </p>
              </div>
              <div className="col-lg-5 margin-t-30 text-right">
                <p className="contact-title">
                  <i className="pe-7s-mail-open"></i>&nbsp; info@pyaleproperties.com
                </p>
              </div>
            </div>
        </section>
          <div className="row">
            <div className="col-lg-3 margin-t-20">
              <div className="text-muted margin-t-20">
                <ul className="list-unstyled footer-list">
                  <li><Link to="JavaScript:Void(0);"></Link></li>
                  <li><Link to="JavaScript:Void(0);"></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/*<div className="row copyrights">*/}
            {/*<div className="col-lg-12">*/}
              {/*<div className="float-left pull-none ">*/}
                {/*<p className="copy-rights text-muted">{(new Date().getFullYear())} © Pyale Properties</p>*/}
              {/*</div>*/}
              {/*<div className="clearfix"></div>*/}
            {/*</div>*/}
          {/*</div>*/}
      </footer>

    );
  }
}

export default Footer;