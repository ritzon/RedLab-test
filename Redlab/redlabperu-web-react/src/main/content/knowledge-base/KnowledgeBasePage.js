import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {Link} from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import classNames from 'classnames';
import Slide from '@material-ui/core/Slide';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';

function Transition(props)
{
    return <Slide direction="up" {...props} />;
}

const styles = () => ({
    root: {
        width: '100%'
    },
    header: {
        background: "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize: 'cover',
        color: '#fff'
    },
    content: {}
});
const knowledgeBaseDB = [
    {
        'id'              : '1',
        'title'           : 'Mas Información',
        'path'            : '/knowledge-base',
        'articlesCount'   : 3,
        'featuredArticles': [
            {
                'id'     : '1',
                'title'  : 'Acerca de',
                'content': '<p><b>PagoCards</b></p>\n<p style="text-align: justify">PagoCards es una plataforma de pago innovadora basada en tecnología blockchain y NFC que hace posible que las transacciones que se efectúan entre los Clientes/Usuarios y Concesionarios/Comercios afiliados a dicha plataforma sean muy rápidas, seguras y confiables. Con PagoCards, hemos dedicado innumerables horas de trabajo y esfuerzo para ofrecer una infraestructura tecnológica fácil de usar, en la que un usuario puede pagar sus productos o servicios cómodamente en la menor cantidad de tiempo imaginado hasta ahora. Nuestra propuesta, sin ser una plataforma bancaria, provee  todo un esquema de seguridad que brinda los más altos niveles confianza, tanto a los comercios afiliados como a sus usuarios.</p>\n<p style="text-align: justify"> ¡Queremos que ésta sea una experiencia extraordinaria para todos!, por ello PagoCards ofrece los servicios de cobro más accesibles del mercado y los usuarios no tendrán que preocuparse por grandes recargos derivados de su uso. ¡Es una relación ganar-ganar!</p>\n<p style="text-align: justify">¡Bienvenido a red de redes!, usuarios y concesionarios podrán disfrutar de los beneficios de PagoCards inmediatamente, aumentando la visibilidad de sus transacciones y verificando fácilmente sus estadísticas de ventas. Tenemos más de 20 años de experiencia en la industria de desarrollo de software, permítanos mostrarle por qué somos los mejores en lo que hacemos.</p>\n<p><b>Administración PagoCards</b></p>'
            },
            {
                'id'     : '2',
                'title'  : 'Políticas de privacidad',
                'content': '\n<p>Toda la información proporcionada por usted o recopilada en la Plataforma de PagoCards se rige por estas Políticas de Privacidad. PagoCards recomienda enfáticamente que revise la Política de privacidad de cerca. PagoCards puede usar información que recibe o recopila con respecto a los Compradores de acuerdo con los términos de su Política de Privacidad, que puede incluir el uso para mercadeo o promoción de servicios que puedan interesar a dichos Compradores. Además, cualquier información presentada o proporcionada por usted a la Plataforma puede ser de acceso público. Debe cuidar de proteger la información privada que es importante para usted. PagoCards no será responsable de proteger dicha información y no es responsable de la protección de la privacidad del correo electrónico. Tenga en cuenta que si decide divulgar información de identificación personal en la Plataforma, esta información puede hacerse pública</p>\n'
            },
            {
                'id'     : '3',
                'title'  : 'Términos y Condiciones del Servicio',
                'content': '<p style="text-align: justify"><b>ACEPTACIÓN DE TÉRMINOS.</b><br></p><br><br><p style="text-align: justify">1.1 Descripción general <br><br> Los siguientes términos y condiciones rigen todo el uso de la Plataforma, los servicios y software involucrado. El Servicio es propiedad y está operado por Administración PagoCards. El Servicio se ofrece sujeto a su aceptación sin modificación de todos los términos y condiciones aquí contenidos y de todas las demás reglas, políticas y procedimientos operativos que Admistración PagoCards pueda publicar oportunamente. AL UTILIZAR O ACCEDER A CUALQUIER PARTE DEL SERVICIO, ACEPTA TODOS LOS TÉRMINOS Y CONDICIONES CONTENIDOS AQUÍ; SI NO ESTÁ DE ACUERDO CON ALGUNO DE DICHOS TÉRMINOS Y CONDICIONES, NO USE NI ACCEDA A NUESTROS SERVICIO.</p>\n<p style="text-align: justify">1.2 Modificación.<br<br> Admistración PagoCards se reserva el derecho, a su entera discreción, de modificar o reemplazar cualquiera de los términos y condiciones aquí definidos en cualquier momento. Es su responsabilidad verificar estos términos y condiciones periódicamente para conocer los cambios. El uso continuado del Servicio después de la publicación de cualquier cambio en estos términos y condiciones constituye la aceptación de dichos cambios. Si no acepta ningún cambio, su único recurso es dejar de acceder, explotar y utilizar el Servicio.</p><br><br><p style="text-align: justify">2. DESCRIPCIÓN DE LA PLATAFORMA. <br><br> PagoCards proporciona un medio simple y rápido para que los usuarios/clientes ("Compradores") y Concesionarios/Comercios ("Afiliados") realicen transacciones de pago en la compra-venta de producto  o servicios a través de la Plataforma de Pago completamente virtual. Esta Plataforma está constituida sobre un Blockchain Privado con Unidades de Consumos expresados en Puntos (Pto). La Admistración PagoCards gestionará todo el proceso administrativo de la plataforma y determinará el valor de la Unidad de Consumo y las comisiones a cobrar por motivos de uso y suscripción a la plataforma. Los pagos se realizarán a través de un Punto de Venta Móvil especialmente diseñado para la plataforma, que interactúa con una Tarjeta de Consumo NFC manufacturada bajo la tecnología Blockchain para nuestra aplicación. Para obtener más información, contáctenos. Estos términos y condiciones se aplican, tanto a “Compradores” como a “Afiliados”. <br>La Plataforma usa su propia aplicación para servicios de procesamiento de pagos por concepto de adquisición y recarga de las Tarjetas de Consumo. Esta aplicación, indirectamente, utiliza los servicios de procesamiento de pagos Bancarios por tanto, acepta el Acuerdo de Servicios de pago Bancario por Internet <br><br> 3. USO DEL SERVICIO <br><br>3.1 El Servicio.<br><br>El Servicio se deberá utilizar solo para los fines que están permitidos por este contrato de Términos y Condiciones y cualquier ley y normativa aplicable (extranjera y nacional). Usted no permitirá, ni permitirá que nadie más, directa o indirectamente: (i) modifique o cree derivados de ninguna parte del Servicio; (ii) realizar ingeniería inversa, desensamblar, descompilar o intentar descubrir el código fuente o la estructura, secuencia y organización de la totalidad o parte del Servicio; (iii) alquilar, arrendar, revender, distribuir o usar el Servicio para compartir el tiempo, oficina de servicios o fines comerciales; Admistración PagoCards puede cambiar, suspender o descontinuar el Servicio, incluida cualquier característica del Servicio.<br><br>3.2 Software. Admistración PagoCards otorga una licencia intransferible, no sumisible, revocable, terminable, no exclusiva para utilizar el Software únicamente para su uso a través del Punto de Venta o Aplicación Web Administrativa en la plataforma de Cardenales de Lara. Para mayor claridad, el Software se considerará parte del "Servicio".<br><br>4. MÉTODOS DE PAGO.<br><br>(a) Proceso de pago.<br> Cuando un Concesionario/Comercio elige utilizar PagoCards para la facturación de los productos o servicios que suministra, deberá suscribirse a la Plataforma a través de un proceso administrativo, donde se recopilarán los datos necesarios y se procederá a la instalación del Punto de Venta Móvil de la Plataforma, esto representará una licencia de uso. Con la suscripción de este Servicio, (i) La Admistración de PagoCards resguadará, a través del Punto de Venta todas las transacciones que se realicen en la Plataforma en nombre del Concesionario/Comercio por parte de los Compradores y deducirá todos los cargos de servicio aplicables a la transacción; (ii) La Admistración de PagoCards depositará el pago del saldo de las transacciones al Concesionario/Comercio dentro de las (24) horas posteriores al cierre de las actividades; (iii)  La Admistración de PagoCards se reserva el derecho de retener fondos en cualquier momento que se determine que es necesario para el procesamiento y la liquidación de todas las devoluciones, cargos disputados, quejas de clientes, denuncias de fraude y otras discrepancias. Todas las ventas y recargas de Tarjetas de Consumo, cargos y fondos se pagan en la Moneda de Circulación oficial del país, monedas extranjeras o Criptodivisas aceptadas por la Plataforma. Todas las transacciones internas, referente a las transacciones y comisiones de la Plataforma se realizarán bajo el esquema de Unidades de Consumo o Puntos, las cuales se someterán a un factor de conversión a dinero al momento del re-embolso del dinero a Concesionarios/Comercios. Admistración PagoCards se reserva el derecho de agregar cargos adicionales de procesamiento hasta ahora no contemplado <br>(b)Reembolsos. <br>(i) El Comprador acepta que las Tarjetas de Consumo compradas, a través de los servicios de la Plataforma PagoCards, constituyen una Venta Final. El comprador acepta además que los montos contenidos en la Tarjeta de Consumo no son reembolsables. Al usar los servicios de la Plataforma y completar una transacción de compra, el Comprador acepta estar legalmente obligado por los Términos y Condiciones establecidos en este documento. Una comisión por uso de la Plataforma será deducido directamente del saldo de la tarjeta; dicha comisión será determinada por los administradores de la Plataforma. Un estado de cuenta de la Tarjeta de Consumo de los compradores estará disponible en la aplicación de la plataforma para mayor control de las operaciones y desembolsos. (ii) la Plataforma pondrá a disposición de los compradores “agentes de ventas” quienes se encargarán de la venta y recarga de las Tarjetas de Consumo. (iii) El agente de venta de entradas son vendedores y revendedores de Tarjetas de Consumo y no garantizan la precisión, integridad o calidad de ninguna de las informaciones y representaciones de productos o servicios de la Plataforma. El agente de venta de entradas no se responsabilizarán de los daños y perjuicios de ningún tipo que se produzcan como resultado de la información contenida en este documento. La compra de esta Tarjeta de Consumo no es reembolsable por ningún motivo, incluido, entre otros, el descontento del cliente con la experiencia de su uso; la espera para la admisión y/o cualquier cambio en los servicios.<br>(d) Confirmación.<br> Una vez realizada una transacción con la Tarjeta de Consumo, PagoCards genera un mensaje SMS informando al Comprador (dueño de la Tarjeta los Consumo) los datos de la transacción y el saldo actualizado. Es responsabilidad del Comprador verificar la validez de los datos enviados por la plataforma.<br><br> 5. OBLIGACIONES DE REGISTRO <br><br>Para ser registrado en la Plataforma, ya sea como “Compradores” o “Afiliados”, usted acepta: (a) proporcionar información verdadera, precisa, actual y completa, según lo solicite el formulario de registro del Servicio ("Datos de registro") y ( b) mantener y actualizar rápidamente los Datos de registro para mantenerlos verdaderos, precisos, actualizados y completos. Si proporciona información falsa, inexacta, no actual o incompleta, la Administración de PagoCards tiene motivos razonables para sospechar que dicha información es falsa, inexacta, no actual o incompleta, pudiendo suspender o cancelar su cuenta y rechazar cualquier y todo su uso actual o futuro del Servicio (o cualquier parte del mismo). La Administración de PagoCards preocupada por la seguridad y la privacidad de todos sus usuarios, exige que todas las personas suscrita debe tener al menos 18 años de edad. <br><br> 6. CUENTA, CONTRASEÑA Y SEGURIDAD.<br><br>Como parte del proceso de registro en la Plataforma de PagoCards, a cada afiliado de la creará una contraseña y una cuenta. Usted es responsable de mantener la confidencialidad de la contraseña y la cuenta, y es totalmente responsable de todas las actividades que ocurran bajo su contraseña o cuenta. Usted acepta (a) notificar inmediatamente a Administración de PagoCards cualquier uso no autorizado de su contraseña o cuenta o cualquier otra violación de seguridad, y (b) asegurarse de salir de su cuenta al final de cada sesión. PagoCards no puede y no será responsable de ninguna pérdida, daño u otra responsabilidad que surja de su incumplimiento de esta Sección.<br><br>7. FINALIZACIÓN<br><br>PagoCards, bajo su exclusivo criterio, puede rescindir su contraseña, cuenta y/o su derecho a utilizar el Servicio por cualquier motivo que considere irregular, incluyendo, falta de uso o crea que ha violado o actuado de forma inconsistente con la letra o el espíritu de este Documento. Usted acepta que cualquier terminación de su derecho a utilizar el Servicio puede efectuarse sin previo aviso, y reconoce y acepta que PagoCards puede desactivar o eliminar su cuenta. Además, acepta que PagoCards no será responsable ante usted ni ante ningún tercero por la terminación de su derecho a utilizar o acceder al Servicio.  </p>'
               
            },
        ]
    },



];





class KnowledgeBasePage extends Component {
    state = {
        data  : knowledgeBaseDB,
        openDialog: false,
        dialogData: {
            title  : null,
            content: null
        }
    };

    componentDidMount()
    {
        // axios.get('/api/knowledge-base').then(res => {
        //     this.setState({data: res.data});
        // });
    }

    handleOpenDialog = (dialogData) => {
        this.setState({
            openDialog: true,
            dialogData
        });
    };

    handleCloseDialog = () => {
        this.setState({
            openDialog: false
        });
    };

    render()
    {
        const {classes} = this.props;
        const {data, openDialog, dialogData} = this.state;

        return (
            <div className={classNames(classes.root)}>

                <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360")}>

                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-36 sm:text-56 font-light">
                            Preguntas Frecuentes
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate duration={400} delay={600}>
                        <Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
                            Bienvenido a la sección de preguntas frecuentes
                        </Typography>
                    </FuseAnimate>
                </div>

                <div className={classNames(classes.content)}>

                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex flex-wrap justify-center max-w-xl w-full mx-auto px-16 sm:px-24 py-32"
                    >
                        {data.map((category) => (
                            <div className="w-full pb-24 md:w-1 md:p-16" key={category.id}>
                                <Card elevation={1}>
                                    <CardContent>
                                        <Typography className="font-medium px-16 pt-8" color="textSecondary">{category.title}</Typography>
                                        <List component="nav">
                                            {category.featuredArticles.map(article => (
                                                <ListItem key={article.id} button onClick={() => this.handleOpenDialog(article)}>
                                                    <ListItemIcon className="mr-0">
                                                        <Icon>note</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText primary={article.title}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                        {/* <Link className="normal-case w-full justify-start" to="/login">Volver</Link> */}
                                        <Link className="normal-case w-full justify-start" to="/login"> <Button className="normal-case w-full justify-start" to="/login" color="secondary">VOLVER</Button></Link>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </FuseAnimateGroup>
                </div>

                <Dialog
                    open={openDialog}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="knowledge-base-document"
                    TransitionComponent={Transition}
                >
                    <DialogTitle>
                        {dialogData.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText dangerouslySetInnerHTML={{__html: dialogData.content}}>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(KnowledgeBasePage);
