// Facultades y escuelas de NodOS: agrupa los ~538 planteles del catalogo en
// ~50 grupos con nombre corto y escudo para el lente «facultad» del mapa.
// Los nombres llegan normalizados (minusculas, sin acentos) de tesis_meta.v1.json.
// Orden de GRUPOS = orden de la paleta (slots C_FAC + i en index.html).
// icono: archivo en sitio/escudos/<key>.svg; null = sin marcador en el mapa.
(function () {
  'use strict';

  var GRUPOS = [
    // --- facultades UNAM ---
    { key: 'medicina', nombre: 'Facultad de Medicina', corto: 'Medicina', siglas: 'MED' },
    { key: 'derecho', nombre: 'Facultad de Derecho', corto: 'Derecho', siglas: 'DER' },
    { key: 'ingenieria', nombre: 'Facultad de Ingeniería', corto: 'Ingeniería', siglas: 'ING' },
    { key: 'quimica', nombre: 'Facultad de Química', corto: 'Química', siglas: 'QUI' },
    { key: 'odontologia', nombre: 'Facultad de Odontología', corto: 'Odontología', siglas: 'ODO' },
    { key: 'ffyl', nombre: 'Facultad de Filosofía y Letras', corto: 'Filosofía y Letras', siglas: 'FFyL' },
    { key: 'ciencias', nombre: 'Facultad de Ciencias', corto: 'Ciencias', siglas: 'CIE' },
    { key: 'fcps', nombre: 'Fac. de Ciencias Políticas y Sociales', corto: 'Políticas y Sociales', siglas: 'FCPyS' },
    { key: 'fca', nombre: 'Fac. de Contaduría y Administración', corto: 'Contaduría', siglas: 'FCA' },
    { key: 'arquitectura', nombre: 'Facultad de Arquitectura', corto: 'Arquitectura', siglas: 'ARQ' },
    { key: 'psicologia', nombre: 'Facultad de Psicología', corto: 'Psicología', siglas: 'PSI' },
    { key: 'economia', nombre: 'Facultad de Economía', corto: 'Economía', siglas: 'ECO' },
    { key: 'veterinaria', nombre: 'Fac. de Medicina Veterinaria y Zootecnia', corto: 'Veterinaria', siglas: 'FMVZ' },
    { key: 'fad', nombre: 'Facultad de Artes y Diseño', corto: 'Artes y Diseño', siglas: 'FAD' },
    { key: 'eneo', nombre: 'Fac. de Enfermería y Obstetricia', corto: 'Enfermería', siglas: 'ENEO' },
    { key: 'musica', nombre: 'Facultad de Música', corto: 'Música', siglas: 'MÚS' },
    // --- FES / ENES ---
    { key: 'fes-aragon', nombre: 'FES Aragón', corto: 'FES Aragón', siglas: 'FES-AR' },
    { key: 'fes-acatlan', nombre: 'FES Acatlán', corto: 'FES Acatlán', siglas: 'FES-AC' },
    { key: 'fes-cuautitlan', nombre: 'FES Cuautitlán', corto: 'FES Cuautitlán', siglas: 'FES-CU' },
    { key: 'fes-iztacala', nombre: 'FES Iztacala', corto: 'FES Iztacala', siglas: 'FES-IZ' },
    { key: 'fes-zaragoza', nombre: 'FES Zaragoza', corto: 'FES Zaragoza', siglas: 'FES-ZA' },
    { key: 'enes-leon', nombre: 'ENES unidad León', corto: 'ENES León', siglas: 'ENES-L' },
    { key: 'enes-morelia', nombre: 'ENES unidad Morelia', corto: 'ENES Morelia', siglas: 'ENES-M' },
    { key: 'enes', nombre: 'ENES (otras unidades)', corto: 'ENES', siglas: 'ENES' },
    // --- escuelas nacionales y otros planteles UNAM ---
    { key: 'ents', nombre: 'Escuela Nacional de Trabajo Social', corto: 'Trabajo Social', siglas: 'ENTS' },
    { key: 'enallt', nombre: 'Esc. Nal. de Lenguas, Lingüística y Traducción', corto: 'ENALLT', siglas: 'ENALLT' },
    { key: 'enac', nombre: 'Esc. Nal. de Artes Cinematográficas', corto: 'Artes Cinematográficas', siglas: 'ENAC' },
    { key: 'encit', nombre: 'Esc. Nal. de Ciencias de la Tierra', corto: 'Ciencias de la Tierra', siglas: 'ENCiT' },
    { key: 'enah', nombre: 'Esc. Nal. de Antropología e Historia', corto: 'ENAH', siglas: 'ENAH' },
    { key: 'cch', nombre: 'Colegio de Ciencias y Humanidades', corto: 'CCH', siglas: 'CCH' },
    { key: 'institutos-unam', nombre: 'Institutos y centros UNAM', corto: 'Institutos y centros', siglas: 'UNAM' },
    { key: 'otros-unam', nombre: 'Otros planteles UNAM', corto: 'Otros UNAM', siglas: 'UNAM' },
    // --- otras universidades con presencia en el catalogo ---
    { key: 'don-vasco', nombre: 'Universidad Don Vasco', corto: 'Don Vasco', siglas: 'UDV' },
    { key: 'panamericana', nombre: 'Universidad Panamericana', corto: 'Panamericana', siglas: 'UP' },
    { key: 'la-salle', nombre: 'Universidad La Salle', corto: 'La Salle', siglas: 'ULS' },
    { key: 'uvm', nombre: 'Universidad del Valle de México', corto: 'UVM', siglas: 'UVM' },
    { key: 'uag', nombre: 'Universidad Autónoma de Guadalajara', corto: 'U. Aut. Guadalajara', siglas: 'UAG' },
    { key: 'sotavento', nombre: 'Universidad de Sotavento', corto: 'Sotavento', siglas: 'UdS' },
    { key: 'villa-rica', nombre: 'Universidad Villa Rica', corto: 'Villa Rica', siglas: 'UVR' },
    { key: 'lasallista-benavente', nombre: 'Universidad Lasallista Benavente', corto: 'Lasallista Benavente', siglas: 'ULB' },
    { key: 'latina', nombre: 'Universidad Latina', corto: 'U. Latina', siglas: 'ULat' },
    { key: 'anahuac', nombre: 'Universidad Anáhuac', corto: 'Anáhuac', siglas: 'UA' },
    { key: 'latinoamericana', nombre: 'Universidad Latinoamericana', corto: 'Latinoamericana', siglas: 'ULA' },
    { key: 'nuevo-mundo', nombre: 'Universidad Nuevo Mundo', corto: 'Nuevo Mundo', siglas: 'UNM' },
    { key: 'tec-iberoamericana', nombre: 'Universidad Tecnológica Iberoamericana', corto: 'Tec. Iberoamericana', siglas: 'UTIBER' },
    { key: 'iberoamericana', nombre: 'Universidad Iberoamericana', corto: 'Ibero', siglas: 'IBERO' },
    { key: 'intercontinental', nombre: 'Universidad Intercontinental', corto: 'Intercontinental', siglas: 'UIC' },
    { key: 'del-tepeyac', nombre: 'Universidad del Tepeyac', corto: 'Del Tepeyac', siglas: 'UdT' },
    { key: 'insurgentes', nombre: 'Universidad Insurgentes', corto: 'Insurgentes', siglas: 'UI' },
    { key: 'femenina', nombre: 'Universidad Femenina de México', corto: 'Femenina', siglas: 'UFM' },
    { key: 'motolinia', nombre: 'Universidad Motolinía', corto: 'Motolinía', siglas: 'UM' },
    { key: 'americana-acapulco', nombre: 'Universidad Americana de Acapulco', corto: 'Americana Acapulco', siglas: 'UAA' },
    { key: 'salesiana', nombre: 'Universidad Salesiana', corto: 'Salesiana', siglas: 'US' },
    // --- cierres ---
    { key: 'otras', nombre: 'Otras instituciones', corto: 'Otras', siglas: '' },
    { key: 'sin-dato', nombre: 'Sin plantel registrado', corto: 'Sin plantel', siglas: '' }
  ];
  GRUPOS.forEach(function (g) { g.icono = 'escudos/' + g.key + '.svg'; });

  // Nombres exactos del catalogo que NO siguen el patron general: nombres
  // historicos de planteles UNAM (la Facultad de Derecho fue «escuela de
  // derecho», la FES Zaragoza fue «enep zaragoza»), variantes con division de
  // posgrado y nombres ambiguos verificados por volumen. Lo que no esta aqui ni
  // casa con una regla cae en «otras».
  var EXACT = {
    // medicina
    'facultad de medicina unam': 'medicina', 'facultad de medicina division de estudios de postgrado unam': 'medicina',
    'escuela nacional de medicina': 'medicina',
    'programa de maestria y doctorado en ciencias medicas odontologicas y de la salud': 'medicina',
    'programa de posgrado en ciencias medicas odontologicas y de la salud unam': 'medicina',
    'programa de doctorado en ciencias biomedicas': 'medicina', 'programa de posgrado en ciencias biomedicas unam': 'medicina',
    // derecho
    'facultad de derecho unam': 'derecho', 'facultad de derecho seminario de derecho civil unam': 'derecho',
    'facultad de derecho y ciencias sociales unam': 'derecho',
    'escuela de derecho': 'derecho', 'escuela de derecho y ciencias sociales': 'derecho',
    'programa de posgrado en derecho unam': 'derecho', 'programa unico de especializaciones en derecho': 'derecho',
    // ingenieria
    'facultad de ingenieria unam': 'ingenieria', 'facultad de ingenieria mecanica y electrica unam': 'ingenieria',
    'division de estudios de posgrado facultad de ingenieria unam': 'ingenieria',
    'facultad de ingenieria division de estudios de posgrado en ingenieria unam': 'ingenieria',
    'facultad de ingenieria programa de posgrado en ingenieria unam': 'ingenieria',
    'programa de posgrado en ingenieria unam': 'ingenieria', 'programa de maestria y doctorado en ingenieria': 'ingenieria',
    'programa unico de especializaciones de ingenieria': 'ingenieria',
    'programa de ingenieria quimica ambiental y quimica ambiental': 'ingenieria',
    'escuela de ingenieria': 'ingenieria', 'escuela de ingenieria civil': 'ingenieria',
    'escuela de ingenieria en computacion': 'ingenieria', 'escuela de ingenieria en alimentos': 'ingenieria',
    // quimica
    'facultad de quimica unam': 'quimica', 'facultad de quimica division de estudios de posgrado unam': 'quimica',
    'facultad de quimica division de estudios superiores unam': 'quimica',
    'escuela de quimica': 'quimica', 'escuela de ciencias quimicas': 'quimica',
    'escuela nacional de ciencias quimicas': 'quimica',
    'escuela quimico farmaceutico biologo': 'quimica', 'escuela licenciatura en quimica farmaceutico biologica': 'quimica',
    'programa de posgrado en ciencias quimicas unam': 'quimica', 'programa de maestria y doctorado en ciencias quimicas': 'quimica',
    'programa de maestria y doctorado en ciencias bioquimicas': 'quimica', 'programa de posgrado en ciencias bioquimicas unam': 'quimica',
    // odontologia
    'facultad de odontologia unam': 'odontologia', 'escuela de odontologia': 'odontologia',
    'programa unico de especializaciones odontologicas': 'odontologia', 'programa de especializacion en endoperiodontologia': 'odontologia',
    // filosofia y letras
    'facultad de filosofia y letras unam': 'ffyl',
    'facultad de filosofia y letras division de estudios de posgrado unam': 'ffyl',
    'facultad de filosofia y letras division de estudios superiores unam': 'ffyl',
    'facultad de filosofia y letras colegio de pedagogia unam': 'ffyl',
    'facultat de filosofia y letras': 'ffyl',
    'escuela de filosofia': 'ffyl', 'escuela de filosofia y letras': 'ffyl',
    'escuela de pedagogia': 'ffyl', 'facultad de pedagogia unam': 'ffyl',
    'programa de maestria y doctorado en filosofia': 'ffyl', 'programa de maestria y doctorado en filosofia de la ciencia': 'ffyl',
    'programa de maestria y doctorado en letras': 'ffyl', 'programa de posgrado en letras unam': 'ffyl',
    'programa de maestria y doctorado en historia': 'ffyl', 'programa de posgrado en historia del arte unam': 'ffyl',
    'programa de especializacion maestria y doctorado en historia del arte': 'ffyl',
    'programa de maestria y doctorado en linguistica': 'ffyl',
    'programa de maestria y doctorado en geografia': 'ffyl', 'programa de posgrado en geografia unam': 'ffyl',
    'programa de maestria y doctorado en pedagogia': 'ffyl', 'programa de posgrado en pedagogia unam': 'ffyl',
    'programa de maestria y doctorado en estudios mesoamericanos': 'ffyl', 'maestria y doctorado en estudios mesoamericanos': 'ffyl',
    'programa de maestria en docencia para la educacion media superior': 'ffyl',
    'programa de maestria y doctorado en bibliotecologia y estudios de la informacion': 'ffyl',
    // ciencias
    'facultad de ciencias unam': 'ciencias', 'facultad de ciencias division de estudios de posgrado unam': 'ciencias',
    'escuela de biologia': 'ciencias', 'escuela de matematicas': 'ciencias', 'escuela de actuaria': 'ciencias',
    'programa de posgrado en ciencias fisicas unam': 'ciencias',
    'programa de maestria y doctorado en ciencias matematicas y de la especializacion en estadistica aplicada': 'ciencias',
    'programa de posgrado en ciencias biologicas unam': 'ciencias',
    'programa de posgrado en ciencias del mar y limnologia unam': 'ciencias',
    'programa de posgrado en astrofisica unam': 'ciencias',
    // ciencias politicas y sociales
    'facultad de ciencias politicas y sociales unam': 'fcps',
    'facultad de ciencias politicas y sociales division de estudios de posgrado unam': 'fcps',
    'escuela de ciencias de la comunicacion': 'fcps', 'escuela de relaciones internacionales': 'fcps',
    'programa de maestria y doctorado en ciencias politicas y sociales': 'fcps',
    'programa de posgrado en ciencias politicas y sociales unam': 'fcps',
    'programa de posgrado en ciencias politicas y sociales ciencias politicas y sociales unam': 'fcps',
    'programa de posgrado en estudios de genero unam': 'fcps',
    // contaduria y administracion
    'facultad de contaduria y administracion unam': 'fca', 'facultad de administracion y contabilidad unam': 'fca',
    'escuela de contaduria': 'fca', 'escuela de contaduria y administracion': 'fca',
    'programa de posgrado en ciencias de la administracion unam': 'fca',
    // arquitectura
    'facultad de arquitectura unam': 'arquitectura',
    'escuela de arquitectura': 'arquitectura', 'escuela nacional de arquitectura': 'arquitectura',
    'programa de maestria y doctorado en arquitectura': 'arquitectura', 'programa de maestria y doctorado en urbanismo': 'arquitectura',
    // psicologia
    'facultad de psicologia unam': 'psicologia', 'escuela de psicologia': 'psicologia',
    'programa de maestria y doctorado en psicologia': 'psicologia', 'programa unico de especializaciones en psicologia': 'psicologia',
    // economia
    'facultad de economia unam': 'economia', 'escuela de economia': 'economia',
    'programa de posgrado en economia unam': 'economia', 'programa unico de especializaciones en economia': 'economia',
    // veterinaria
    'facultad de medicina veterinaria y zootecnia unam': 'veterinaria',
    'facultad de medicina veterinaria y zootecnia division de estudios de posgrado unam': 'veterinaria',
    'programa de maestria y doctorado en ciencias de la produccion y de la salud animal': 'veterinaria',
    'programa de posgrado en ciencias de la produccion y de la salud animal unam': 'veterinaria',
    // artes y diseno (incluye su antecedente, la escuela nacional de artes plasticas)
    'facultad de artes y diseno unam': 'fad',
    'escuela nacional de artes plasticas unam': 'fad', 'escuela de artes plasticas': 'fad',
    'escuela de diseno grafico': 'fad', 'escuela de diseno industrial': 'fad',
    'programa de maestria en diseno industrial': 'fad', 'programa de posgrado de artes visuales unam': 'fad',
    'programa de posgrado en artes y diseno unam': 'fad',
    // enfermeria y obstetricia (incluye su antecedente ENEO)
    'facultad de enfermeria y obstetricia unam': 'eneo', 'escuela nacional de enfermeria y obstetricia unam': 'eneo',
    'escuela de enfermeria': 'eneo', 'programa de maestria y doctorado en enfermeria': 'eneo',
    // musica (incluye su antecedente, la escuela nacional de musica)
    'facultad de musica unam': 'musica', 'escuela nacional de musica': 'musica',
    'programa de maestria y doctorado en musica': 'musica',
    // trabajo social
    'escuela nacional de trabajo social unam': 'ents', 'escuela de trabajo social': 'ents',
    'programa de maestria y doctorado en trabajo social': 'ents', 'programa unico de especializaciones en trabajo social': 'ents',
    // otras escuelas nacionales
    'escuela nacional de lenguas linguistica y traduccion unam': 'enallt',
    'escuela nacional de artes cinematograficas unam': 'enac',
    'escuela nacional de ciencias de la tierra unam': 'encit',
    'escuela nacional de antropologia e historia': 'enah',
    // CCH
    'colegio de ciencias y humanidades unam': 'cch',
    'colegio de ciencias y humanidades unidad academica de los ciclos profesional y de posgrado': 'cch',
    'colegio de ciencias y humanidades unidad academica de los ciclos profesional y de posgrado centro de neurobiologia': 'cch',
    'unidad academica de los ciclos profesionales y del posgrado del c c h': 'cch',
    // institutos y centros UNAM que no llevan el sufijo «unam»
    'centro de radioastronomia y astrofisica': 'institutos-unam',
    'centro de investigacion sobre fijacion de nitrogeno': 'institutos-unam',
    'centro de investigaciones en fisiologia celular': 'institutos-unam',
    'centro de ciencias matematicas unidad morelia': 'institutos-unam',
    'centro de investigaciones multidisciplinarias sobre chiapas y la frontera sur': 'institutos-unam',
    'instituto de geociencias': 'institutos-unam',
    // otros programas/planteles UNAM sin facultad
    'escuela de verano': 'otros-unam', 'escuela de cursos temporales': 'otros-unam',
    'escuela de graduados unam': 'otros-unam', 'unidad de posgrado unam': 'otros-unam',
    'escuela para extranjeros': 'otros-unam', 'escuela facultad programa': 'otros-unam',
    'escuela nacional de maestros': 'otros-unam', 'escuela nacional preparatoria': 'otros-unam',
    'centro de ensenanza para extranjeros unam': 'otros-unam', 'centro de estudios de lenguas extranjeras unam': 'otros-unam',
    'centro universitario de teatro unam': 'otros-unam',
    'programa de posgrado en ciencias de la sostenibilidad unam': 'otros-unam',
    'programa de posgrado en ciencias de la tierra unam': 'otros-unam',
    'programa de posgrado en ciencia e ingenieria de materiales unam': 'otros-unam',
    'programa de posgrado en ciencia e ingenieria de la computacion unam': 'otros-unam',
    'programa de posgrado en estudios latinoamericanos unam': 'otros-unam'
  };

  // Reglas sobre el nombre normalizado, en orden: la primera que coincide gana.
  // Ojo con el orden: veterinaria antes que medicina («facultad de medicina
  // veterinaria y zootecnia»), fcps antes que ciencias («ciencias politicas»),
  // y las reglas UNAM no deben atrapar «universidad X facultad de Y».
  var REGLAS = [
    [/estudios (superiores|profesionales) acatlan/, 'fes-acatlan'],
    [/estudios (superiores|profesionales) aragon/, 'fes-aragon'],
    [/estudios (superiores|profesionales) cuautitlan/, 'fes-cuautitlan'],
    [/estudios (superiores|profesionales) iztacala/, 'fes-iztacala'],
    [/estudios (superiores|profesionales) zaragoza/, 'fes-zaragoza'],
    [/estudios superiores unidad leon/, 'enes-leon'],
    [/estudios superiores unidad morelia/, 'enes-morelia'],
    [/escuela nacional de estudios superiores/, 'enes'],
    [/veterinaria/, 'veterinaria'],
    [/^facultad de medicina|^escuela nacional de medicina/, 'medicina'],
    [/^facultad de derecho/, 'derecho'],
    [/facultad de ingenieria|ingenieria.*unam/, 'ingenieria'],
    [/^facultad de quimica/, 'quimica'],
    [/^facultad de odontologia/, 'odontologia'],
    [/filosofia y letras.*unam$|^facultat de filosofia/, 'ffyl'],
    [/ciencias politicas y sociales/, 'fcps'],
    [/^facultad de ciencias/, 'ciencias'],
    [/contaduria y administracion unam|administracion y contabilidad unam/, 'fca'],
    [/^facultad de arquitectura/, 'arquitectura'],
    [/^facultad de psicologia/, 'psicologia'],
    [/^facultad de economia/, 'economia'],
    [/artes y diseno unam/, 'fad'],
    [/enfermeria y obstetricia unam/, 'eneo'],
    [/^facultad de musica|escuela nacional de musica/, 'musica'],
    // institutos, centros y posgrados conjuntos de la UNAM
    [/\bunam$/, 'institutos-unam'],
    // universidades externas con volumen propio
    [/^universidad don vasco/, 'don-vasco'],
    [/^universidad panamericana/, 'panamericana'],
    [/^universidad la salle/, 'la-salle'],
    [/valle de mexico/, 'uvm'],
    [/autonoma de guadalajara/, 'uag'],
    [/sotavento/, 'sotavento'],
    [/villa rica/, 'villa-rica'],
    [/lasallista benavente/, 'lasallista-benavente'],
    [/^universidad latina\b/, 'latina'],
    [/anahuac/, 'anahuac'],
    [/^universidad latinoamericana/, 'latinoamericana'],
    [/nuevo mundo/, 'nuevo-mundo'],
    [/tecnologica iberoamericana/, 'tec-iberoamericana'],
    [/iberoamericana/, 'iberoamericana'],
    [/intercontinental/, 'intercontinental'],
    [/tepeyac/, 'del-tepeyac'],
    [/insurgentes/, 'insurgentes'],
    [/femenina/, 'femenina'],
    [/motolinia/, 'motolinia'],
    [/americana de acapulco/, 'americana-acapulco'],
    [/salesiana/, 'salesiana']
  ];

  function grupoDe(nombre) {
    var n = String(nombre || '').trim();
    if (!n || n === 'no especificado unam' || n === 'no especificado') return 'sin-dato';
    if (EXACT[n] !== undefined) return EXACT[n];
    for (var i = 0; i < REGLAS.length; i++) if (REGLAS[i][0].test(n)) return REGLAS[i][1];
    return 'otras';
  }

  var porKey = {};
  GRUPOS.forEach(function (g, i) { g.index = i; porKey[g.key] = g; });

  window.NodosFacultades = { GRUPOS: GRUPOS, porKey: porKey, grupoDe: grupoDe };
})();
