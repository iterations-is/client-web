/**
 * @file Axios
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

axios.interceptors.request.use(function(config) {
   const token = cookies.get('JWT');
   if (token && token !== '') {
      config.headers.common['Authorization'] = token;
   }
   return config;
});
