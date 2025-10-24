import { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../navigation/types';
import { navigationRef } from '../../App';

type CurrentRoute = RouteProp<StackParamList, keyof StackParamList> | undefined;

export function useCurrentRoute(): CurrentRoute {
  const [currentRoute, setCurrentRoute] = useState<CurrentRoute>(
    navigationRef.current?.getCurrentRoute() as CurrentRoute
  );

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', () => {
      const route = navigationRef.current?.getCurrentRoute() as CurrentRoute;
      setCurrentRoute(route);
    });

    return unsubscribe;
  }, []);

  return currentRoute;
}
