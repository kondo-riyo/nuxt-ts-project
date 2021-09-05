module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // colors: {
    // base_red: '#994837',
    // base_green: '#3f582e',
    // base_cream: '#f2e0ca',
    // base_gray: '#998675'
    // },
    // fontSize: {
    //   '1px': '1px',
    //   '3px': '3px',
    //   '5px': '5px',
    //   '8px': '8px',
    //   '10px': '10px',
    //   '14px': '14px',
    //   '18px': '18px',
    //   '20px': '20px',
    // },
    extend: {
      colors: {
        base_red: '#994837',
        base_orange: '#bd5c47',
        base_green: '#3f582e',
        base_cream: '#f2e0ca',
        base_gray: '#998675',
      },
      width: {
        600: '600px',
        650: '650px',
        700: '700px',
        800: '800px',
        900: '900px',
        1000: '1000px',
      },
      // backgroundImage: theme => ({
      //   'cafe-pattern': "url('./assets/img/cafe_background.jpeg')",
      // })
      backgroundImage: (theme) => ({
        starbucks: "url('assets/img/coffee-2734137_1280.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
