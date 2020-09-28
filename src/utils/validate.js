//验证手机号
export const validate_tel = /^1[3456789]\d{9}$/;
const reg_email = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

export function validate_email(value){
  return reg_email.test(value)
}