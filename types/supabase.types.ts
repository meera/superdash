export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      MenuItem: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          description: string | null;
          image: string | null;
          price: number | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          description?: string | null;
          image?: string | null;
          price?: number | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          description?: string | null;
          image?: string | null;
          price?: number | null;
        };
      };
    };
    Functions: {};
  };
}

