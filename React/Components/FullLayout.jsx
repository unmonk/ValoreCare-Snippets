import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import Header from "./layout-components/header/Header";
import Sidebar from "./layout-components/sidebar/Sidebar";
import Spinner from "../layouts/layout-components/spinner/Spinner";
import Customizer from "./layout-components/customizer/Customizer";
import { SideBarRoutes, componentRoutes } from "../routes/router";
import logger from "sabio-debug";

// import Blanklayout from "./layouts/BlankLayout";

const _logger = logger.extend("FullLayout");
const mapStateToProps = (state) => ({
  ...state,
});
class Fulllayout extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      isOpen: false,
      width: window.innerWidth,
      componentRoutes: [],
    };
    this.props.history.listen(() => {
      if (
        window.innerWidth < 767 &&
        document
          .getElementById("main-wrapper")
          .className.indexOf("show-sidebar") !== -1
      ) {
        document
          .getElementById("main-wrapper")
          .classList.toggle("show-sidebar");
      }
    });
  }
  static getDerivedStateFromProps(nextProps, state) {
    _logger("nextprops and state", nextProps, state);
    const { isLoggedIn } = nextProps.currentUser
      ? nextProps.currentUser
      : false;
    const filteredComponentRoutes = componentRoutes.filter((route) =>
      route.roles.some((item) => nextProps.currentUser.roles.includes(item))
    );
    const mapRoutes = filteredComponentRoutes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          exact={prop.exact}
          render={() => <prop.component {...nextProps} />}
          key={key}
        />
      );
    });
    if (isLoggedIn) {
      return {
        ...state,
        componentRoutes: mapRoutes,
      };
    }
    return null;
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook, Applies when loading or resizing App                           */
  /*--------------------------------------------------------------------------------*/
  componentDidMount() {
    window.addEventListener("load", this.updateDimensions);
    window.addEventListener("resize", this.updateDimensions);
  }
  // setRoutes = () => {
  //   this.setState((prevState) => {
  //     return {
  //       ...prevState,
  //       componentRoutes: this.mappedComponentsRoutes(),
  //     };
  //   });
  // };
  // filterOneRoute = (route) => {
  //   _logger("inside filter, filterOneRoute:", route, this.props.currentUser);
  //   let { roles } = this.props.currentUser;
  //   return route.roles.some((item) => roles.includes(item));
  // };
  // mappedComponentsRoutes = () => {
  //   const filteredComponentRoutes = componentRoutes.filter(this.filterOneRoute);
  //   return filteredComponentRoutes.map((prop, key) => {
  //     return (
  //       <Route
  //         path={prop.path}
  //         exact={prop.exact}
  //         component={(props) => (
  //           <prop.component {...props} currentUser={this.props.currentUser} />
  //         )}
  //         key={key}
  //       />
  //     );
  //   });
  // };
  /*--------------------------------------------------------------------------------*/
  /*Function that handles sidebar, changes when resizing App                        */
  /*--------------------------------------------------------------------------------*/
  updateDimensions() {
    let element = document.getElementById("main-wrapper");
    this.setState({
      width: window.innerWidth,
    });
    switch (this.props.settings.activeSidebarType) {
      case "full":
      case "iconbar":
        if (this.state.width < 1170) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
          element.classList.add("mini-sidebar");
        } else {
          element.setAttribute(
            "data-sidebartype",
            this.props.settings.activeSidebarType
          );
          element.classList.remove("mini-sidebar");
        }
        break;

      case "overlay":
        if (this.state.width < 767) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute(
            "data-sidebartype",
            this.props.settings.activeSidebarType
          );
        }
        break;
      default:
    }
  }
  /*--------------------------------------------------------------------------------*/
  /*Life Cycle Hook                                                                 */
  /*--------------------------------------------------------------------------------*/
  componentWillUnmount() {
    window.removeEventListener("load", this.updateDimensions);
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    _logger("FullLayout", this.state.componentRoutes, this.props.currentUser);
    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
      <div
        id="main-wrapper"
        dir={this.props.settings.activeDir}
        data-theme={this.props.settings.activeTheme}
        data-layout={this.props.settings.activeThemeLayout}
        data-sidebartype={this.props.settings.activeSidebarType}
        data-sidebar-position={this.props.settings.activeSidebarPos}
        data-header-position={this.props.settings.activeHeaderPos}
        data-boxed-layout={this.props.settings.activeLayout}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/* Header                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Header {...this.props} />
        {/*--------------------------------------------------------------------------------*/}
        {/* Sidebar                                                                        */}
        {/*--------------------------------------------------------------------------------*/}
        {this.props.currentUser.isLoggedIn && (
          <Sidebar {...this.props} routes={SideBarRoutes} />
        )}
        {/*--------------------------------------------------------------------------------*/}
        {/* Page Main-Content                                                              */}
        {/*--------------------------------------------------------------------------------*/}
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Suspense fallback={<Spinner />}>
              <Switch>
                {this.props.currentUser.isLoggedIn &&
                  this.state.componentRoutes}
              </Switch>
            </Suspense>
          </div>
        </div>
        {/*--------------------------------------------------------------------------------*/}
        {/* Customizer from which you can set all the Layout Settings                      */}
        {/*--------------------------------------------------------------------------------*/}
        <Customizer
          boxedTheme={this.boxedTheme}
          rtl={this.rtl}
          headerPosition={this.headerPosition}
          sidebarPosition={this.sidebarPosition}
        />
      </div>
    );
  }
}
Fulllayout.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  settings: PropTypes.shape({
    activeSidebarType: PropTypes.string,
    activeDir: PropTypes.string,
    activeTheme: PropTypes.string,
    activeSidebarPos: PropTypes.string,
    activeHeaderPos: PropTypes.string,
    activeLayout: PropTypes.string,
    activeThemeLayout: PropTypes.string,
  }).isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  currentUser: PropTypes.shape({
    userName: PropTypes.string,
    avatarUrl: PropTypes.string,
    id: PropTypes.number,
    roles: PropTypes.array,
    isLoggedIn: PropTypes.bool,
  }),
  //match: ReactRouterPropTypes.match.isRequired,
};
export default connect(mapStateToProps)(Fulllayout);
