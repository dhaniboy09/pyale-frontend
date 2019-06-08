export const generateRandomString = (length, chars) => {
    let mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    let result = '';
    for (let i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
};

export const containsEmptyValue = (fields) => {
    let hasEmpty = false;
    Object.values(fields).forEach((val) => {
      val.length === 0 && (hasEmpty = true)
    });
    return hasEmpty
};

export const sanitizeUserInput = (fields) => {
    Object.keys(fields).forEach((key) => {
        fields[key] = sanitize(fields[key])
    });
};

export const sanitize = (string) => {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
};

