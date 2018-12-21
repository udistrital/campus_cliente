
export let FORM_TIPO_PROYECTO = {
    titulo: 'TipoProyecto',
    tipo_formulario: 'mini',
    btn: 'Guardar',
    alertas: true,
    modelo: 'TipoProyecto',
    campos: [
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Id',
        label_i18n: 'id',
        placeholder_i18n: 'id',
        requerido: true,
        tipo: 'number',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Nombre',
        label_i18n: 'tipo_poyecto_nombre',
        placeholder_i18n: 'placeholder_tipo_poyecto_nombre',
        requerido: true,
        tipo: 'text',
    },
    {
        etiqueta: 'input',
        claseGrid: 'col-6',
        nombre: 'Descripcion',
        label_i18n: 'tipo_proyecto_descripcion',
        placeholder_i18n: 'placeholder_tipo_proyecto_descripcion',
        requerido: false,
        tipo: 'text',
    },
    ],
}
