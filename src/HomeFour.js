import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Aux from './hoc/Aux_';
import HomeNavBar from "./components/HomeNavBar";
import {connect} from "react-redux";
import Commercial from "./components/Commercial";
import Residential from "./components/Residential";
import {loadProperties} from "./redux/actions/properties";
import Retail from "./components/Retail";
import {restStickyNavBar} from "./navHelpers";

class HomeFour extends React.Component {
  state = {
    retail: [],
    commercial: [],
    residential: [],
    isLoading: false
  };


  componentWillMount() {
    this.setState({isLoading: true});
    this.props.loadProperties().then(() => {
      this.setState({isLoading: false});
      const {allProperties} = this.props;
      if (allProperties) {
        const retail = allProperties.filter((property) => {
          return property.category === 'retail' && property.home_page && property.active
        });
        const commercial = allProperties.filter((property) => {
          return property.category === 'commercial' && property.home_page && property.active
        });
        const residential = allProperties.filter((property) => {
          return property.category === 'residential' && property.home_page && property.active
        });

        this.setState({
          retail: retail.length <= 3 ? retail : retail.slice(0, 3),
          commercial: commercial.length <= 3 ? commercial : commercial.slice(0, 3),
          residential: residential.length <= 3 ? residential : residential.slice(0, 3)
        })
      }
    });
  }

  componentDidMount() {
    restStickyNavBar()
  }

  render() {
    const {isAuthenticated} = this.props;
    return (
      <Aux>
        {/* Navbar Component*/}
        {isAuthenticated ? <Navbar/> : <HomeNavBar/>}

        <section className="section bg-home home-half" id="home">
          <div className="bg-overlay"></div>
          <div className="display-table">
            <div className="display-table-cell">
              <div className="container">
                <div className="row vertical-content">
                  <div className="col-lg-12 text-white text-center margin-t-5">
                    <h2 className="home-title">We Build. We Lease. We Rent. </h2>
                    <p className="padding-t-15 home-desc">
                      Pyale Properties leases and rents commercial and residential properties at
                      affordable rates across multiple locations in Nigeria including Lagos &
                      PortHarcourt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Residential properties={this.state.residential} loading={this.state.isLoading}/>
        <Commercial properties={this.state.commercial} loading={this.state.isLoading}/>
        <Retail properties={this.state.retail} loading={this.state.isLoading}/>
        <Footer/>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    allProperties: state.properties.allProperties
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProperties: () => dispatch(loadProperties())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFour);