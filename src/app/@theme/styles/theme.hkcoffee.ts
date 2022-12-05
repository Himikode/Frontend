import { NbJSThemeOptions, DEFAULT_THEME as baseTheme } from '@nebular/theme';

const baseThemeVariables = baseTheme.variables;


export const HKCOFFEE_THEME = {
  name: 'hkcoffee',
  base: 'default',
  variables: {
    cards: {
      headerSubtitleColor: '#cccccc',
      headerSubtitleFontSize: '#cccccc',
      headerSubtitleFontFamily: '',
      arcEmpty: baseThemeVariables.bg2,
      thumbBg: baseThemeVariables.bg2,
      thumbBorder: baseThemeVariables.primary,
    },

    chartjs: {
      axisLineColor: baseThemeVariables.separator,
      textColor: baseThemeVariables.fgText,
      barColor: '#0033cc',
      areaColor: '#0033cc',
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      }
    },

    colors: {
      frio: [
        '#2F2589',
        '#3B60D8',
        '#3895DC',
        '#3063B0',
        '#6697E1',
        '#9DAEE6',
        '#CCE2E5',
        '#E9EED9',
        '#2F2589',
        '#2F2589',
      ],
      calido: [
        '#C3306F',
        '#F4BD9E',
        '#E8AD3B',
        '#97272F',
        '#C3BD8D',
        '#E98769',
        '#9E307E',
        '#CDA189',
        '#C94548',
        '#D6C27C',        
      ],
      calido2: [
        '#F4BD9E',
        '#E8AD3B',
        '#E98769',
        '#C94548',
        '#E0E8C9',
        '#D7C0DF',
        '#CDB539',
        '#CCE2E5',
        '#A639CD',
        '#CD39B5',
      ],
      frio2: [
        '#2F2589',
        '#B6CCD6',
        '#3063B0',
        '#87BA92',
        '#244CC9',
        '#8DBCCA',
        '#386B77',
        '#5FABC4',
        '#7FA9A1',
        '#CDDFD5',
      ],
      verde: [
        '#418650',
        '#81AD58',
        '#C0D6AC',
        '#5BAFA5',
        '#438981',
        '#A1C182',
        '#346B40',
        '#84C3BB',
        '#366E67',
        '#82C290',
        '#28524D',
      ]      
    }
  },
} as unknown as NbJSThemeOptions;
