

export const ValidateMobile = (mobile) => {
    var patt = new RegExp(/^0(6|7)([0-9]{8}$)/g);
    var res = patt.test(mobile);

    return res;
}

export const ValidatePassword = (password) => {
    var patt = new RegExp(/[0-9]{4}/g);
    var res = patt.test(password);

    return res;
}
