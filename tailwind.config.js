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
    extend: {
      colors: {
        base_red: '#994837',
        base_orange: '#bd5c47',
        base_green: '#3f582e',
        base_cream: '#f2e0ca',
        base_gray: '#998675',
        base_of: '#f6f5f1',
      },
      // backgroundImage: theme => ({
      //   'cafe-pattern': "url('./assets/img/cafe_background.jpeg')",
      // })    
    },
    // extend:{
    //   backgroundImage: theme => ({
    //     'cafe-pattern': "url('./assets/img/cafe_background.jpeg')",
    //   })    
    // }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
