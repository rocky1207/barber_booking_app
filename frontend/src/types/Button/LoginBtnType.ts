export interface LoginBtnType {
    type: 'submit' | 'button';
    className: string;
    text: string;
    divClass: string;
    onAction: (data: {username: string; password: string;}) => any;
}