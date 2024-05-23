/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.65rem', // 10px
        'xs': '.75rem', // 12px
        'base': '.875rem', // 14px
        'xl': '0.975rem', // 16px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem' // 32px
      },
      colors: {
        blue: {
          950: '#243B4A',
        },
        lime: {
          300: '#E4EA80',
        },
        green: {
          900: '#237471',
        },
        'white-900': '#F7EEE0'
      },
      fontFamily: {
        sans: ['Lexend', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        'forest': "url('/images/forest.jpeg')",
        'm4n-logo': "url('/images/m4n-logo.svg')",
        'm4n-logo-white': "url('/images/m4n-logo-white.svg')",
        'citizen-science': "url('/images/citizen_science.webp')",
        'europe-flag': "url('/images/flag-of-europe.svg')",
        'ciencias-lisboa': "url('/images/partners/Ciencias-Lisboa.png')",
        'creaf': "url('/images/partners/CREAF.png')",
        'cw': "url('/images/partners/CW.png')",
        'dreamocracy': "url('/images/partners/Dreamocracy.png')",
        'earthwatch': "url('/images/partners/Earthwatch.png')",
        'flb-iaac': "url('/images/partners/FLB-IAAC.png')",
        'tracasa-global': "url('/images/partners/Tracasa-Global.png')",
        'forest-of-the-world': "url('/images/partners/Forests-Of-The-World.png')",
        'ku': "url('/images/partners/ku_logo_uk_h-1 1.png')",
        'niia': "url('/images/partners/NIIA.png')",
        'nilu': "url('/images/partners/NILU.png')",
        'nioo': "url('/images/partners/NIOO.png')",
        'polski': "url('/images/partners/polski_alarm_smogowy_znak_kolor-1 1.png')",
        'unep': "url('/images/partners/UNEPWCMC_Logo-Blue-2019-600x176 1.png')",
        'vito': "url('/images/partners/vito-logo_blue_1-1 1.png')",
        'vizzuality': "url('/images/partners/vizzuality_logo-1 1.png')",
        'vms': "url('/images/partners/VWS_RIVM_Logo_online_ex_pos_en-1 1.png')",
        'ihe': "url('/images/partners/IHE.png')",
        'necu': "url('/images/partners/necu.png')",
        'ecsa': "url('/images/partners/ECSA.png')",
        'nordeco': "url('/images/partners/NORDECO.png')",
      }
    },
  },
  plugins: [],
};
