import { FC } from 'react';
import { Provider } from 'react-supabase';
import { createClient } from '@supabase/supabase-js';

const client = createClient(
  'https://thnzaspwfoftsbaedafb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTE2OTQ1OSwiZXhwIjoxOTU0NzQ1NDU5fQ.s1MEm4tLz3XpaQAqQ2hvLZgqYIs0Iggf8xpsMhnYq1I'
);

export const SupabaseProvider: FC = ({ children }) => <Provider value={client}>{children}</Provider>;
