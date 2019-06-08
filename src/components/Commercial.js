import React from 'react';
import {withRouter} from 'react-router-dom';
import {Loader} from "./Loader";


class Commercial extends React.Component {
  showPropertyDetail = (e) => {
    const {param} = e.target.dataset;
    this.props.history.push({
      pathname: '/detail',
      search: "?" + new URLSearchParams({propId: param}).toString()
    });
  };

  render() {
    return (
      <section className="section pt-5" id="commercial">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1 className="section-title text-center">Commercial Properties</h1>
              <div className="section-title-border margin-t-20"></div>
              <p className="section-subtitle text-muted text-center font-secondary padding-t-30">
                Our modern commercial properties are state-of-the-art and ideal for both large and small scale businesses.
                We offer some of the most competitive rates on the market.
              </p>
              <div className="text-center margin-t-50">
                <Loader isLoading={this.props.loading}/>
              </div>
            </div>
          </div>

          <div className="row margin-t-30">
            {
              this.props.properties && this.props.properties.map((property) => {
                return (
                  <div className="col-lg-4" key={property.id}>
                    <div className="blog-box margin-t-30 hover-effect">
                      {property.property_images.map((imageItem) => {
                        if (imageItem.tag === "thumbnail") {
                          return <img src={imageItem.image && imageItem.image}
                                      className="img-fluid" alt="" key={imageItem.id}/>
                        }
                      })}
                      <div>
                        <h4 className="mt-3">
                          {property.name}
                        </h4>
                        <p className="text-muted">
                          {
                            property.summary.length > 90 ?
                              property.summary.substring(0, 90) + ' ...' :
                              property.summary
                          }
                        </p>
                        <div className="mt-3 view-details">
                          <h5
                            className="read-btn"
                            data-param={property.id}
                            onClick={this.showPropertyDetail}
                          >
                            View Details <i className="mdi mdi-arrow-right"></i>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Commercial);