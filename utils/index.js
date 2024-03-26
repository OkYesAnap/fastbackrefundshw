export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export const filterInvalidElements = data => data.filter(siteProps => siteProps.name && siteProps.url);