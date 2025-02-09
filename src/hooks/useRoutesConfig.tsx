import { useRoutes } from 'react-router-dom';
import { appRoutes } from '../components/layout/routes';

const useRoutesConfig = () => {
  return useRoutes(appRoutes);
};

export default useRoutesConfig;
