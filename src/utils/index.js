const validationPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) return false;
    if (password.length < 8) return false;
    return true;
};

const validationEmail = (email) => {
    return email.includes('@'); // atau ganti dengan regex jika perlu
};

module.exports = {
    validationPassword,
    validationEmail
};