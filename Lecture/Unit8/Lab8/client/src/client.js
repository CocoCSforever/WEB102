import { createClient } from '@supabase/supabase-js';

const URL = 'https://wcwipjhnchsnsinevpod.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indjd2lwamhuY2hzbnNpbmV2cG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Nzk4NzAsImV4cCI6MjA2MDA1NTg3MH0.Z7ggO1BUETDwIem_WLTzF4k3u3FNr7jdGjYNWBW-EbY'

export const supabase = createClient(URL, API_KEY);
