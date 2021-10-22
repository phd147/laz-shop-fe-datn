const navbarNavigations = [
  // {
  //   title: 'Nosotros',
  //   child: [
  //     {
  //       title: 'Conócenos',
  //       url: '/nosotros/conocenos',
  //     },
  //     {
  //       title: 'Misión',
  //       url: '/nosotros/mision',
  //     },
  //     {
  //       title: 'Aviso de privacidad',
  //       url: '/nosotros/aviso',
  //     },
  //     {
  //       title: 'Términos y condiciones',
  //       url: '/nosotros/terminos',
  //     },
  //   ],
  // },
  // {
  //   title: 'Ubicación',
  //   url: '/ubicacion',
  // },
  {
    title: 'User account',
    child: [
      {
        title: 'Orders',
        url: '/orders',
      },
      {
        title: 'Profile',
        url: '/profile',
      },
      {
        title: 'Address',
        url: '/address',
      },
      {
        title: 'Wish list',
        url: '/wish-list',
      },
    ],
  },
  {
    title: 'Vendor account',
    child: [
      {
        title: 'Dashboard',
        url: '/vendor/dashboard',
      },
      {
        title: 'Product',
        url: '/vendor/products',
        // child: [
        //   {
        //     title: 'All products',
        //     url: '/vendor/products',
        //   },
        //   {
        //     title: 'Add product',
        //     url: '/vendor/add-product',
        //     icon: NoteAdd
        //   },
        // ],
      },
    ],
  },
]

export default navbarNavigations
