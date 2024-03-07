import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://orejpaqyobciwuwlhiem.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZWpwYXF5b2JjaXd1d2xoaWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyMDI1NDQsImV4cCI6MjAyNDc3ODU0NH0.voJDEQRVpkH0KICK0BGo9wmtRu-KJHN-xS7uY-tdqfY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})