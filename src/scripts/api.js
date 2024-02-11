export const apiSendFormData = async (user) => {
  try {
    const response = await fetch('http://localhost:9090/api/registration', {
      method: 'POST',
      body: JSON.stringify(user),
    });

    const result = await response.json();

    return result;
  } catch (error) {
    console.log('There was an error', error);
    return null;
  }
};
