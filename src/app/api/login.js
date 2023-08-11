import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const apiUrl = 'https://dev.navingtechnologies.com/alto/public/api/auth/login';
    const { username, password, device_name } = req.body;

    try {
      const response = await axios.post(apiUrl, {
        username,
        password,
        device_name

      });

      return res.status(response.status).json(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      return res.status(error.response?.status || 500).json({ message: errorMessage });
    }
  }

  return res.status(405).end();
}
