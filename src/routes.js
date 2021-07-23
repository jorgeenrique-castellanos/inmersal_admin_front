import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, Login } from "./layouts";

// Route Views
import Imagenes from "./vistas/imagenes";
import Activity from "./views/00_view_activity";
import Commentation from "./views/01_view_commetation";
import Views from "./views/02_view_views";
import Project from "./views/03_view_projects";
import View from "./views/04_view_sales_room/views";
import BannerPromotional from "./views/05_view_banner_promotional";
import Proyecto from "./views/06_view_projectGeneralInformation";
import Projectlocation from "./views/07_view_projectLocation";
import ProjectListNearbyPlaces from "./views/08_view_projectListNearbyPLaces";
import ProjectListFinishes from "./views/09_view_project_List_Finishes";
import ProjectListUpdates from "./views/10_view_project_List_Updates";
import ProjectListMetrics from "./views/11_view_project_List_Metrics";
import ProjectPropertyTypes from "./views/12_view_project_Property_Types";
import Users from "./views/13_view_user";
import LoginUser from "./views/15_view_login_user"
// import TiposDePersonas from "./vistas/v1/tiposdepersonas";
// import TiposDeIdentificaciones from "./vistas/tiposdeidentificaciones";
// import Paises from "./vistas/paises";
// import Departamentos from "./vistas/departamentos";
// import Municipios from "./vistas/municipios";
// import Empresas from "./vistas/empresas";
// import Proyectos from "./vistas/proyectos";
// import TiposDeUnidades from "./vistas/tiposdeunidades";
// import Unidades from "./vistas/unidades";
// import TiposDeTransacciones from "./vistas/tiposdetransacciones";
// import Transacciones from "./vistas/transacciones";
// import RegistroUsuario from "./vistas/registrousuario";
import BlogOverview from "./views/BlogOverview";
// import UserProfileLite from "./views/UserProfileLite";
// import AddNewPost from "./views/AddNewPost";
// import Errors from "./views/Errors";
// import ComponentsOverview from "./views/ComponentsOverview";
// import Tables from "./views/Tables";
// import BlogPosts from "./views/BlogPosts";

export default [
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
    path: "/users",
    exact: true,
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/loginuser",
    exact: true,
    layout: Login,
    component: LoginUser
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
    layout: DefaultLayout,
    component: BlogOverview
  }
  // {
  //   path: "/proyectos",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Project
  // },
  // {
  //   path: "/tiposdepersonas",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: TiposDePersonas
  // },
  // {
  //   path: "/tiposdeidentificaciones",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: TiposDeIdentificaciones
  // },
  // {
  //   path: "/paises",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Paises
  // },
  // {
  //   path: "/registrousuario",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: RegistroUsuario
  // },
  // {
  //   path: "/departamentos",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Departamentos
  // },
  // {
  //   path: "/municipios",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Municipios
  // },
  // {
  //   path: "/empresas",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Empresas
  // },

  // {
  //   path: "/tiposdeunidades",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: TiposDeUnidades
  // },
  // {
  //   path: "/unidades",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Unidades
  // },
  // {
  //   path: "/tiposdetransacciones",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: TiposDeTransacciones
  // },
  // {
  //   path: "/transacciones",
  //   exact: true,
  //   layout: DefaultLayout,
  //   component: Transacciones
  // },

  // {
  //   path: "/user-profile-lite",
  //   layout: DefaultLayout,
  //   component: UserProfileLite
  // },
  // {
  //   path: "/add-new-post",
  //   layout: DefaultLayout,
  //   component: AddNewPost
  // },
  // {
  //   path: "/errors",
  //   layout: DefaultLayout,
  //   component: Errors
  // },
  // {
  //   path: "/components-overview",
  //   layout: DefaultLayout,
  //   component: ComponentsOverview
  // },
  // {
  //   path: "/tables",
  //   layout: DefaultLayout,
  //   component: Tables
  // },
  // {
  //   path: "/blog-posts",
  //   layout: DefaultLayout,
  //   component: BlogPosts
  // }
];
