export const choosenAppointmentsNav = {
    navClass: 'wrapp',
    ulClass: '',
    liItem: [{text: 'IZABRANI TERMINI', itemClass: '', link: 'appointments/client'}]
  };
  export const homePageNav = {
    navClass: 'wrapp',
    ulClass: '',
    liItem: [
        {text: 'LOG OUT', itemClass: '', link: '/'}, 
        {text: 'RADNO VRENE', itemClass: '', link: '/login/dashboard/working-hours'}
    ]
};
/*
export const homePageNav = {
    navClass: 'wrapp',
    ulClass: '',
    liItem: [{text: 'POČETNA', itemClass: '', link: '/'}]
};
*/
export const servicesPageNav = {
    navClass: 'wrapp',
    ulClass: '',
    liItem: [{link: "/", text: 'početna', itemClass: ''}]
}

export const adminPageNav = {
    navClass: 'wrapp',
    ulClass: '',
    liItem: [
        {link: "/", text: 'početna', itemClass: ''}]
}
export const appointmentsPageNav = {
    navClass: 'wrapp', 
    ulClass: '', 
    liItem: [{text: 'dashboard', itemClass: '', link: '/login/dashboard'}]
};
export const forgotPasswordPageNav = {
    navClass: 'wrapp', 
    ulClass: 'flexed', 
    liItem: [{text: '<<', itemClass: '', link: '/login'}, {link: "/", text: 'početna', itemClass: ''}]
};
export const resetPasswordPageNav = {
    navClass: 'wrapp', 
    ulClass: '', 
    liItem: [{text: '<<', itemClass: '', link: '/forgot-password'}]
};