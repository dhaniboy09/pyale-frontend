import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import Aux from '../hoc/Aux_'
import Navbar from "../components/Navbar";
import {connect} from "react-redux";
import queryString from 'query-string';
import {getProperty} from "../redux/actions/properties";
import {restStickyNavBar} from "../navHelpers";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


class PropertyDetail extends React.Component {
  state = {
    singleProperty: {},
    propertyImages: [],
    showGallery: true,
    floorPlanImage: []
  };

  componentWillMount() {
    const parsed = queryString.parse(window.location.search);
    this.props.getProperty(parsed.propId)
  }

  componentDidMount() {
    restStickyNavBar();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {singleProperty} = nextProps;
    let propertyImages, floorPlanImage;

    if (singleProperty) {
      propertyImages = singleProperty.property_images.filter((image) => {
        return image.tag === 'gallery'
      });
      floorPlanImage = singleProperty.property_images.filter((image) => {
        return image.tag === 'floorplan'
      });
      this.setState({
        singleProperty,
        propertyImages,
        floorPlanImage
      })
    }
  }

  toggleGallery = () => {
    this.setState({showGallery: true})
  };

  toggleFloorPlan = () => {
    this.setState({showGallery: false})
  };

  render() {
    const {singleProperty, propertyImages, floorPlanImage} = this.state;
    const images = propertyImages && propertyImages.map((image) => {
      return {
        original: image.image_details.url
      }
    });

    return (
      <Aux>
        <Navbar/>
        <section className="section section-lg bg-web-desc">
          <div className="bg-overlay"></div>
        </section>
        <section className="section" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h1 className="detail-section-title text-center">{singleProperty && singleProperty.name}</h1>
                <div className="detail-section-title-border margin-t-20"></div>
              </div>
            </div>

            <div className="row vertical-content">
              <div className="col-lg-5">
                <div className="features-box">
                  <h3>A digital web design studio creating modern & engaging online experiences</h3>
                  <p className="text-muted web-desc">Separated they live in Bookmarksgrove right at
                    the coast of the
                    Semantics, a large language ocean. A small river named Duden flows by their
                    place and supplies it
                    with the necessary regelialia.</p>
                  <ul className="text-muted list-unstyled margin-t-30 features-item-list">
                    <li className="">We put a lot of effort in design.</li>
                    <li className="">The most important ingredient of successful website.</li>
                    <li className="">Sed ut perspiciatis unde omnis iste natus error sit.</li>
                    <li className="">Submit Your Orgnization.</li>
                  </ul>
                  <Link to="JavaScript:Void(0);"
                        className="btn btn-custom margin-t-30 waves-effect waves-light">Learn
                    More <i className="mdi mdi-arrow-right"></i></Link>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="gallery-nav">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" role="button" onClick={this.toggleGallery}>Gallery</a>
                    </li>
                    {
                      floorPlanImage.length > 0 ? (
                        <li className="nav-item">
                          <a className="nav-link" role="button" onClick={this.toggleFloorPlan}>Floor Plan</a>
                        </li>
                      ) : null
                    }
                  </ul>
                </div>
                <div>
                  {
                    this.state.showGallery ? <ImageGallery items={images}/> :
                      <div><img src={floorPlanImage} width="550" height="550" alt=""/></div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </Aux>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    singleProperty: state.properties.singleProperty
  }
};

const matchDispatchToProps = (dispatch) => {
  return {
    getProperty: (property_id) => dispatch(getProperty(property_id))
  }
};


export default connect(matchStateToProps, matchDispatchToProps)(PropertyDetail);