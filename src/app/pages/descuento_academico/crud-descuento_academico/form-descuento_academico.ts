export let FORM_DESCUENTO = {
  // titulo: 'DescuentoMatricula',
  tipo_formulario: 'mini',
  btn: 'Guardar',
  btnLimpiar: 'Limpiar',
  btnOculto: true,
  alertas: true,
  modelo: 'SolicitudDescuento',
  campos: [
    {
      etiqueta: 'select',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'DescuentoDependencia',
      label_i18n: 'tipo_descuento_matricula',
      placeholder_i18n: 'tipo_descuento_matricula',
      requerido: true,
      tipo: 'DescuentoDependencia',
      key: 'Nombre',
      opciones: [],
    },
    {
      etiqueta: 'file',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      clase: 'form-control',
      nombre: 'Documento',
      label_i18n: 'soporte_documento',
      placeholder_i18n: 'soporte_documento',
      requerido: false,
      tipo: 'pdf',
      tipoDocumento: 7,
      formatos: 'pdf',
      url: '',
      tamanoMaximo: 2,
    },
  ],
}
