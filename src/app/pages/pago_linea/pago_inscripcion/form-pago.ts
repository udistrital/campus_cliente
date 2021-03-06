export let FORM_PAGO = {
  titulo: 'PagoInscripcion',
  tipo_formulario: 'mini',
  btn: '-',
  btnOculto: false,
  alertas: false,
  modelo: 'PagoInscripcion',
  campos: [
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Secuencia',
      label_i18n: 'secuencia',
      placeholder_i18n: 'secuencia',
      requerido: false,
      tipo: 'number',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Concepto',
      label_i18n: 'concepto_pago',
      placeholder_i18n: 'concepto_pago',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Perpago',
      label_i18n: 'periodo_academico',
      placeholder_i18n: 'periodo_academico',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'Proyecto',
      label_i18n: 'programa_academico',
      placeholder_i18n: 'programa_academico',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'TipoIdentificacion',
      label_i18n: 'tipo_documento',
      placeholder_i18n: 'tipo_documento',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Codigo',
      label_i18n: 'numero_documento',
      placeholder_i18n: 'numero_documento',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Nombre',
      label_i18n: 'nombres',
      placeholder_i18n: 'nombres',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-6 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Apellido',
      label_i18n: 'apellidos',
      placeholder_i18n: 'apellidos',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'Correo',
      label_i18n: 'correo',
      placeholder_i18n: 'correo',
      requerido: false,
      tipo: 'email',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'ValorOrdinario',
      label_i18n: 'valor_pago',
      placeholder_i18n: 'valor_pago',
      requerido: false,
      tipo: 'number',
      minimo: 1000,
      deshabilitar: true,
    },
    {
      etiqueta: 'mat-date',
      claseGrid: 'col-lg-4 col-md-6 col-sm-12 col-xs-12',
      nombre: 'FechaOrdinaria',
      label_i18n: 'fecha_pago',
      placeholder_i18n: 'fecha_pago',
      requerido: false,
      tipo: 'date',
      deshabilitar: true,
    },
    {
      etiqueta: 'input',
      claseGrid: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      nombre: 'EstadoPago',
      label_i18n: 'estado_pago',
      placeholder_i18n: 'estado_pago',
      requerido: false,
      tipo: 'text',
      deshabilitar: true,
    },
  ],
}
