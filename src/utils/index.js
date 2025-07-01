const validationPassword = (password, confirmPassword) => {
    return (password !== confirmPassword) ? false : true;
};

module.exports = {
    validationPassword
}