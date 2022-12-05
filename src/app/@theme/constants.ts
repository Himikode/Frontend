export class Constants {

    public static tipos_servicio = {
        '00' : 'lectura caudalimetro',
        '01' : 'corto',
        '02' : 'largo',
        '03' : 'corto doble',
        '04' : 'largo doble',
        '05' : 'purga',
        '06' : 'purga',
        '07' : 'purga',
        '08' : 'purga',
        '09' : 'corto custom',
        '10' : 'largo custom',
        '11' : 'corto doble custom',
        '12' : 'largo doble custom',
        '13' : 'custom',
        '14' : 'cancelación',
        '15' : 'purga estandar'
    }
    public static pulsesToLiterRatio_device = {
        '000002' : 1300,
        '000010' : 1440,
        '890129' : 230
    }
}