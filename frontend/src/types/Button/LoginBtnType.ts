export interface LoginBtnType {
    type: 'submit';
    className: string;
    text: string;
    divClass: string;
    onAction: (data: {username: string; password: string;}) => any;
}