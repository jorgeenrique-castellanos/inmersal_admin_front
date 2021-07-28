import Servidor from "../helpers/servidor";
import _ from "lodash";

export default function() {
  return [
    {
      id: "c022",
      title: "Constructoras",
      show_title: true,
      type: "link" /*link,header,separator*/,
      view_url: "/constructora",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "image",
      class_prefix: "",
      sub_items: [
        {
          id: "c01",
          title: "Información General",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/companygeneralinformation",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        }
      ]
    },
    {
      id: "i022",
      title: "Proyectos",
      show_title: true,
      type: "link" /*link,header,separator*/,
      view_url: "/imagenes",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "image",
      class_prefix: "",
      sub_items: [
        {
          id: "i01",
          title: "Informacion General",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectgeneralinformation",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i02",
          title: "Ubicación del proyecto",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectLocation",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i03",
          title: "Ubicaciones cercanas",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectlistnearbyplaces",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i04",
          title: "Información acabados",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectlistfinishes",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i05",
          title: "Progreso del proyecto",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectlistupdates",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i06",
          title: "Metricas del proyecto",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectlistmetrics",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i07",
          title: "Tipos de propiedades",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectpropertytypes",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i08",
          title: "Planos del proyecto",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectlistbluesprint",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i09",
          title: "Lista de propiedades",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectlistproperties",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i10",
          title: "Centro multimedia del proyecto",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectcentermultimedia",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i11",
          title: "Información de contacto",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/projectcontact",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        }
      ]
    },
    {
      id: "i001",
      title: "Sala de ventas",
      show_title: true,
      type: "link" /*link,header,separator*/,
      view_url: "/imagenes",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "image",
      class_prefix: "",
      sub_items: [
        {
          id: "i01",
          title: "Pestañas",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/view",
          view_id: "v001",
          parent_id: "i001",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "i02",
          title: "Banner promocional",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/bannerpromotional",
          view_id: "v001",
          parent_id: "i001",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        }
      ]
    },
    {
      id: "i0051",
      title: "Actividad",
      show_title: true,
      type: "link" /*link,header,separator,url*/,
      view_url: "/actividad",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "home",
      class_prefix: ""
    },
    // {
    //   id: "i0050",
    //   title: "Views",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/views",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0050",
    //   title: "titulo separador",
    //   show_title: true,
    //   type: "separator" /*link,header,separator*/,
    //   view_url: "",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },

    {
      id: "i0052",
      title: "Comentarios",
      show_title: true,
      type: "link" /*link,header,separator,url*/,
      view_url: "/commetation",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "home",
      class_prefix: ""
    },
    {
      id: "conf022",
      title: "Configuración",
      show_title: true,
      type: "link" /*link,header,separator*/,
      view_url: "/configuration",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "image",
      class_prefix: "",
      sub_items: [
        {
          id: "c01",
          title: "Ajustes generales",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/generalsettings",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "c02",
          title: "Agentes",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/agents",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "c03",
          title: "Facturación",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/facturation",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        },
        {
          id: "c01",
          title: "Seguridad & identidad",
          show_title: true,
          type: "link" /*link,header,separator*/,
          view_url: "/security",
          view_id: "v001",
          parent_id: "i022",
          url: false,
          language: "ESP",
          access: "",
          icon: "image",
          class_prefix: ""
        }
      ]
    },
    {
      id: "u022",
      title: "Usuarios",
      show_title: true,
      type: "link" /*link,header,separator*/,
      view_url: "/users",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "image",
      class_prefix: ""
    },
    {
      id: "m022",
      title: "Mi perfil",
      show_title: true,
      type: "link" /*link,header,separator*/,
      view_url: "/myprofile",
      view_id: "v001",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "image",
      class_prefix: ""
    },
    {
      id: "i0051",
      title: "Salir",
      show_title: true,
      type: "link" /*link,header,separator,url*/,
      view_url: "/logoutuser",
      view_id: "v000",
      parent_id: false,
      url: false,
      language: "ESP",
      access: "",
      icon: "home",
      class_prefix: ""
    }
    // {
    //   id: "i009",
    //   title: "Proyectos",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/proyectos",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i005",
    //   title: "Paises",
    //   show_title: true,
    //   type: "header" /*link,header,separator*/,
    //   view_url: "/paises",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // sub_items: [
    //   {
    //     id: "i001",
    //     title: "Item 1",
    //     show_title: true,
    //     type: "link" /*link,header,separator*/,
    //     view_url: "/xxx",
    //     view_id: "v001",
    //     parent_id: false,
    //     url: false,
    //     language: "ESP",
    //     access: "",
    //     icon: "image",
    //     class_prefix: ""
    //   },
    // ]
    // },
    // {
    //   id: "i006",
    //   title: "Departamentos",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/departamentos",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i007",
    //   title: "Municipios",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/municipios",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i008",
    //   title: "Empresas",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/empresas",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0010",
    //   title: "Tipos de unidades",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/tiposdeunidades",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0011",
    //   title: "Unidades",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/unidades",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0012",
    //   title: "Tipos de transacciones",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/tiposdetransacciones",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0013",
    //   title: "Transacciones",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/transacciones",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0014",
    //   title: "Blog Post",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/blog-post",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0015",
    //   title: "Add New Post",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/add-new-post",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0016",
    //   title: "Forms & Components",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/components-overview",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0017",
    //   title: "Tables xxxx",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/tables",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0018",
    //   title: "User Profile",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/user-profile-lite",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0019",
    //   title: "Errors",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/errors",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // },
    // {
    //   id: "i0020",
    //   title: "RegistroUsuario",
    //   show_title: true,
    //   type: "link" /*link,header,separator*/,
    //   view_url: "/registrousuario",
    //   view_id: "v001",
    //   parent_id: false,
    //   url: false,
    //   language: "ESP",
    //   access: "",
    //   icon: "image",
    //   class_prefix: ""
    // }
  ];
}
