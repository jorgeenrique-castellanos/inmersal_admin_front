import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, Login, Exit } from "./layouts";

// Route Views
import Imagenes from "./vistas/imagenes";
import Activity from "./views/00_view_activity";
import Commentation from "./views/01_view_commetation";
import Views from "./views/02_view_views";
// import Project from "./views/03_view_projects";
import View from "./views/04_view_sales_room/views";
import BannerPromotional from "./views/05_view_banner_promotional";
import Proyecto from "./views/06_view_projectGeneralInformation";
import Projectlocation from "./views/07_view_projectLocation";
import ProjectListNearbyPlaces from "./views/08_view_projectListNearbyPLaces";
import ProjectListFinishes from "./views/09_view_project_List_Finishes";
import ProjectListUpdates from "./views/10_view_project_List_Updates";
import ProjectListMetrics from "./views/11_view_project_List_Metrics";
import ProjectPropertyTypes from "./views/12_view_project_Property_Types";
import ProjectListBluesprint from "./views/13_view_project_list_bluesprints";
import ProjectListProperties from "./views/14_view_project_list_properties";
import ProjectCenterMultimedia from "./views/15_view_project_center_multimedia";
import ProjectContact from "./views/16_view_contact";
import CompanyGeneralInformation from "./views/17_view_company_general_information";
import GeneralSettings from "./views/18_view_general_settings";
import Agents from "./views/19_view_agents";
import Facturation from "./views/20_view_facturation";
import Security from "./views/21_view_security";
import Myprofile from "./views/22_view_profile";
import Countrys from "./views/24_view_countrys";
import State from "./views/25_view_states";
import Cities from "./views/26_view_cities";
import PersonType from "./views/27_view_person_type";
import IdentificationType from "./views/28_view_identificatioin_type";
import GeneralStatus from "./views/29_view_general_status";
import Clients from "./views/30_view_clients";
import Config_contacts from "./views/31_view_config_contacts";
import Users from "./views/13_view_user";
// import LoginUser from "./views/15_view_login_user";
import LogoutUser from "./views/23_view_logout_user";
import BlogOverview from "./views/BlogOverview";

export default [
  {
    path: "/companygeneralinformation",
    exact: true,
    layout: DefaultLayout,
    component: CompanyGeneralInformation
  },
  {
    path: "/actividad",
    exact: true,
    layout: DefaultLayout,
    component: Activity
  },
  {
    path: "/views",
    exact: true,
    layout: DefaultLayout,
    component: Views
  },
  {
    path: "/commetation",
    exact: true,
    layout: DefaultLayout,
    component: Commentation
  },
  {
    path: "/imagenes",
    exact: true,
    layout: DefaultLayout,
    component: Imagenes
  },
  {
    path: "/view",
    exact: true,
    layout: DefaultLayout,
    component: View
  },
  {
    path: "/bannerpromotional",
    exact: true,
    layout: DefaultLayout,
    component: BannerPromotional
  },
  {
    path: "/projectgeneralinformation",
    exact: true,
    layout: DefaultLayout,
    component: Proyecto
  },
  {
    path: "/projectLocation",
    exact: true,
    layout: DefaultLayout,
    component: Projectlocation
  },
  {
    path: "/projectlistnearbyplaces",
    exact: true,
    layout: DefaultLayout,
    component: ProjectListNearbyPlaces
  },
  {
    path: "/projectlistfinishes",
    exact: true,
    layout: DefaultLayout,
    component: ProjectListFinishes
  },
  {
    path: "/projectlistupdates",
    exact: true,
    layout: DefaultLayout,
    component: ProjectListUpdates
  },
  {
    path: "/projectlistmetrics",
    exact: true,
    layout: DefaultLayout,
    component: ProjectListMetrics
  },
  {
    path: "/projectpropertytypes",
    exact: true,
    layout: DefaultLayout,
    component: ProjectPropertyTypes
  },
  {
    path: "/projectlistbluesprint",
    exact: true,
    layout: DefaultLayout,
    component: ProjectListBluesprint
  },
  {
    path: "/projectlistproperties",
    exact: true,
    layout: DefaultLayout,
    component: ProjectListProperties
  },
  {
    path: "/projectcentermultimedia",
    exact: true,
    layout: DefaultLayout,
    component: ProjectCenterMultimedia
  },
  {
    path: "/projectcontact",
    exact: true,
    layout: DefaultLayout,
    component: ProjectContact
  },
  {
    path: "/generalsettings",
    exact: true,
    layout: DefaultLayout,
    component: GeneralSettings
  },
  {
    path: "/agents",
    exact: true,
    layout: DefaultLayout,
    component: Agents
  },
  {
    path: "/facturation",
    exact: true,
    layout: DefaultLayout,
    component: Facturation
  },
  {
    path: "/security",
    exact: true,
    layout: DefaultLayout,
    component: Security
  },
  {
    path: "/myprofile",
    exact: true,
    layout: DefaultLayout,
    component: Myprofile
  },
  {
    path: "/users",
    exact: true,
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/generalstatus",
    exact: true,
    layout: DefaultLayout,
    component: GeneralStatus
  },
  {
    path: "/countrys",
    exact: true,
    layout: DefaultLayout,
    component: Countrys
  },
  {
    path: "/departament",
    exact: true,
    layout: DefaultLayout,
    component: State
  },
  {
    path: "/cities",
    exact: true,
    layout: DefaultLayout,
    component: Cities
  },
  {
    path: "/persontype",
    exact: true,
    layout: DefaultLayout,
    component: PersonType
  },
  {
    path: "/identificationtype",
    exact: true,
    layout: DefaultLayout,
    component: IdentificationType
  },
  {
    path: "/clients",
    exact: true,
    layout: DefaultLayout,
    component: Clients
  },
  {
    path: "/contacts",
    exact: true,
    layout: DefaultLayout,
    component: Config_contacts
  },
  {
    path: "/logoutuser",
    exact: true,
    layout: Exit,
    component: LogoutUser
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    // component: () => <Redirect to="/loginuser" />
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    exact: true,
    layout: DefaultLayout,
    component: BlogOverview
  }
];
