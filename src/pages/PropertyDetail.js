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
              <div className="col-lg-8 offset-lg-2 margin-b-30">
                <h1 className="detail-section-title text-center">{singleProperty && singleProperty.name}</h1>
                <div className="detail-section-title-border margin-t-20"></div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-5">
                <div className="features-box">
                  <h3>The Chevy View Apartments is a modern three (3) storey apartment building located in the
                  heart of Lagos</h3>
                  <p className="text-muted web-desc">
                    These spacious modern apartments are designed to give residents comfort and are built
                    to the safest standards in a serene and secure environment.<br/><br/>
                    Built with high standards and a stylish finishing, this property is located off chevron round about
                    at plot 24 &amp; 25, Block C1, Ojomu Chieftaincy Family Land, Ajiran Eti-osa, Lekki, Lagos
                    In addition to a spacious car park and gorgeous transparent roof at the lobby, each apartment
                    contains:
                  </p>
                  <ul className="text-muted list-unstyled margin-t-30 features-item-list">
                    <li className="">Master En-Suite Bedroom</li>
                    <li className="">Dining area with pantry</li>
                    <li className="">Modern living room</li>
                    <li className="">Full unit kitchen including an oven, gas burner, extractor fan, central boiler
                    pantry and more</li>
                    <li className="">Air conditioning points in all the rooms</li>
                    <li className="">2 bedrooms with a shared toilet/bathroom and guest toilet</li>
                  </ul>
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