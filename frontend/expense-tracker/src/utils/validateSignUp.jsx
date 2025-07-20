export const validateForm = (formdata) => {
  let errors = {};

  // Validate username
  if (!formdata.name.trim()) {
    errors.name = "Username is required";
  }

  // Validate email
  if (!formdata.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
    errors.email = "Invalid email format";
  }

  // Validate password
  if (!formdata.password) {
    errors.password = "Password is required";
  } else if (formdata.password.length < 8) {
    errors.password = "Minimum 8 characters required";
  }

  return errors;
};
