import { useFilter, useRealtime } from 'react-supabase';
import { Profile } from 'services/auth/typings/profile';

export const useShelters = () => {
  const filter = useFilter((query) => query.eq('accountType', 'SHELTER'));

  return useRealtime<Profile & { userId: string }>('profiles', { select: { filter } });
};

export const useProfile = (id: string) => {
  const filter = useFilter((query) => query.eq('userId', id));

  return useRealtime<Profile & { userId: string }>('profiles', { select: { filter } });
};
