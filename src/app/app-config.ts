import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';

export const Config = {
  LOCAL: {
    NUXEO: {
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'http://localhost:8095/v1/',
    CORE_SERVICE: 'http://localhost:8102/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'http://localhost:9013/v1/',
    // #revisar
    DOCENTE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    DOCUMENTO_SERVICE: 'http://localhost:8094/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: 'http://localhost:9014/v1/',
    ENTE_SERVICE: 'http://localhost:8096/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'http://localhost:9016/v1/',
    EXPERIENCIA_SERVICE: 'http://localhost:8099/v1/',
    FORMACION_ACADEMICA_SERVICE: 'http://localhost:8098/v1/',
    FORMULARIO_SERVICE: 'http://localhost:9011/v1/',
    IDIOMA_SERVICE: 'http://localhost:8103/v1/',
    INSCRIPCION_SERVICE: 'http://localhost:8887/v1/',
    MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'http://localhost:8097/v1/',
    PERSONA_SERVICE: 'http://localhost:8083/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'http://localhost:9012/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'http://localhost:8101/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1/',
    EVENTO_SERVICE: 'http://localhost:8081/v1/',
    UBICACION_SERVICE: 'http://localhost:8085/v1/',
    // #revisar
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    // #revisar
    VALIDACION_SNIES_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    // #falta
    PAGO_SERVICE: 'http://prueba.campusvirtual.udistrital.edu.co/pagos/',
    // #falta
    RECIBO_SERVICE: 'http://localhost:9017/v1/',
    TOKEN: {
        AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
        CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
        RESPONSE_TYPE: 'id_token token',
        SCOPE: 'openid email role documento',
        REDIRECT_URL: 'http://localhost:4200/',
        SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
        SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    },
  },
  PREPROD: {
    NUXEO: {
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/campus_mid/v1/',
    CORE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_crud/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/matriculas_descuentos_crud/v1/',
    // #revisar
    DOCENTE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    DOCUMENTO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/documento_crud/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/documento_programa_crud/v1/',
    ENTE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/ente_crud/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/evaluacion_inscripcion_crud/v1/',
    EXPERIENCIA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/experiencia_laboral_crud/v1/',
    FORMACION_ACADEMICA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/formacion_academica_crud/v1/',
    FORMULARIO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/forms_management_crud/v1',
    IDIOMA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/idiomas_crud/v1/',
    INSCRIPCION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/inscripcion_crud/v1/',
    MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/organizacion_crud/v1/',
    PERSONA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/personas_crud/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/produccion_academica_crud/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/programa_academico_crud/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1/',
    EVENTO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/sesiones_crud/v1/',
    UBICACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/ubicaciones_crud/v1/',
    // #revisar
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    // #revisar
    VALIDACION_SNIES_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    // #revisar
    PAGO_SERVICE: 'https://campusvirtual.udistrital.edu.co/pagospr/',
    // #revisar
    RECIBO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/recibo_crud/v1/',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: '3r8DbyjNrVvcf5Z1CSsBGpGWzrwa',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: 'https://cliente.campusvirtual.udistrital.edu.co',
      SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'https://cliente.campusvirtual.udistrital.edu.co',
    },
  },
  PREPRODPL: {
    NUXEO: {
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'http://api.planestic.udistrital.edu.co:8095/v1/',
    CORE_SERVICE: 'http://api.planestic.udistrital.edu.co:8102/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'http://api.planestic.udistrital.edu.co:9013/v1/',
    // #revisar
    DOCENTE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    DOCUMENTO_SERVICE: 'http://api.planestic.udistrital.edu.co:8094/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: 'http://api.planestic.udistrital.edu.co:9014/v1/',
    ENTE_SERVICE: 'http://api.planestic.udistrital.edu.co:8096/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'http://api.planestic.udistrital.edu.co:9016/v1/',
    EXPERIENCIA_SERVICE: 'http://api.planestic.udistrital.edu.co:8099/v1/',
    FORMACION_ACADEMICA_SERVICE: 'http://api.planestic.udistrital.edu.co:8098/v1/',
    FORMULARIO_SERVICE: 'http://api.planestic.udistrital.edu.co:9011/v1',
    IDIOMA_SERVICE: 'http://api.planestic.udistrital.edu.co:8103/v1/',
    INSCRIPCION_SERVICE: 'http://api.planestic.udistrital.edu.co:8887/v1/',
    MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'http://api.planestic.udistrital.edu.co:8097/v1/',
    PERSONA_SERVICE: 'http://api.planestic.udistrital.edu.co:8083/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'http://api.planestic.udistrital.edu.co:9012/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'http://api.planestic.udistrital.edu.co:8101/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1/',
    EVENTO_SERVICE: 'http://api.planestic.udistrital.edu.co:8081/v1/',
    UBICACION_SERVICE: 'http://api.planestic.udistrital.edu.co:8085/v1/',
    // #revisar
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    // #revisar
    VALIDACION_SNIES_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    NOTIFICACION_SERVICE: 'ws://pruebasapi.intranetoas.udistrital.edu.co:8116/ws/join',
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    // #revisar
    PAGO_SERVICE: 'https://campusvirtual.udistrital.edu.co/pagospr/',
    // #revisar
    RECIBO_SERVICE: 'http://api.planestic.udistrital.edu.co:9017/v1/',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: 'N3_OnSMT6PZUJSPitQ6I5d8mJpIa',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: 'https://pruebascampus.portaloas.udistrital.edu.co',
      SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'https://pruebascampus.portaloas.udistrital.edu.co',
    },
    /*   TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: 'e36v1MPQk2jbz9KM4SmKhk8Cyw0a',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: 'http://localhost:4200/',
      SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'http://localhost:4200/',
    }, */
  },
  PROD: {
    NUXEO: {
      PATH: 'https://documental.portaloas.udistrital.edu.co/nuxeo/',
    },
    CAMPUS_MID: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/campus_mid/v1/',
    CORE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/core_crud/v1/',
    DESCUENTO_ACADEMICO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    DOCUMENTO_PROGRAMA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/documento_programa_crud/v1',
    DOCUMENTO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/documento_crud/v1/',
    ENTE_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/ente_crud/v1/',
    EVALUACION_INSCRIPCION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/evaluacion_inscripcion_crud/v1/',
    EXPERIENCIA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/experiencia_laboral_crud/v1/',
    FORMACION_ACADEMICA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/formacion_academica_crud/v1/',
    FORMULARIO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/forms_management_crud/v1',
    IDIOMA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/idiomas_crud/v1/',
    INSCRIPCION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/inscripcion_crud/v1/',
    MENU_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/menu_opcion_padre/ArbolMenus/',
    ORGANIZACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/organizacion_crud/v1/',
    PERSONA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/personas_crud/v1/',
    PRODUCCION_ACADEMICA_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/produccion_academica_crud/v1/',
    PROGRAMA_ACADEMICO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/programa_academico_crud/v1/',
    PROGRAMA_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/oikos_crud_api/v1/',
    EVENTO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/sesiones_crud/v1/',
    UBICACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/ubicaciones_crud/v1/',
    VALIDACION_OIKOS_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/academica_jbpm/v1/',
    CONFIGURACION_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/configuracion_crud_api/v1/',
    //desactivar
    NOTIFICACION_SERVICE: '',
    //esta url esta mal
    WSO2_SERVICE: 'http://jbpm.udistritaloas.edu.co:8280/services',
    //esa no esta registrada en wso2
    PAGO_SERVICE: 'https://campusvirtual.udistrital.edu.co/pagos/',
    RECIBO_SERVICE: 'https://autenticacion.portaloas.udistrital.edu.co/apioas/recibo_crud/v1/',
    TOKEN: {
      AUTORIZATION_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oauth2/authorize',
      CLIENTE_ID: 'gnYvY022RDCqwRCBDgFBkuBS0voa',
      RESPONSE_TYPE: 'id_token token',
      SCOPE: 'openid email role documento',
      REDIRECT_URL: 'https://campus.portaloas.udistrital.edu.co',
      SIGN_OUT_URL: 'https://autenticacion.portaloas.udistrital.edu.co/oidc/logout',
      SIGN_OUT_REDIRECT_URL: 'https://campus.portaloas.udistrital.edu.co',
    },
  },
};

export const GENERAL = {
    ENTORNO: Config[environment.entorno],
};
