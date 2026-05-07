export const createServerSupabaseClient = async (): Promise<any> => {
  const mockClient = {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (col: string, val: any) => ({
          single: async () => ({ data: { owner_id: 'mock-user-id' }, error: null }),
          maybeSingle: async () => ({ data: { owner_id: 'mock-user-id' }, error: null }),
          order: (col: string, options: any) => ({
            order: (col2: string, options2: any) => ({
              limit: (n: number) => ({
                single: async () => ({ data: {}, error: null }),
                maybeSingle: async () => ({ data: {}, error: null }),
              }),
            }),
            limit: (n: number) => ({
              single: async () => ({ data: {}, error: null }),
              maybeSingle: async () => ({ data: {}, error: null }),
            }),
          }),
          limit: (n: number) => ({
            single: async () => ({ data: {}, error: null }),
          }),
        }),
        is: (col: string, val: any) => ({
          order: (col: string, options: any) => ({
            order: (col2: string, options2: any) => ({
              limit: (n: number) => ({
                single: async () => ({ data: {}, error: null }),
                maybeSingle: async () => ({ data: {}, error: null }),
              }),
            }),
            limit: (n: number) => ({
              single: async () => ({ data: {}, error: null }),
              maybeSingle: async () => ({ data: {}, error: null }),
            }),
          }),
        }),
        limit: (n: number) => ({
          single: async () => ({ data: {}, error: null }),
        }),
      }),
      insert: async (data: any) => ({ data: {}, error: null }),
      update: (data: any) => ({
        eq: (col: string, val: any) => ({
          select: () => ({
            single: async () => ({ data: {}, error: null }),
          }),
          eq: async (col: string, val: any) => ({ data: {}, error: null }),
        }),
      }),
      delete: () => ({
        eq: (col: string, val: any) => ({
          eq: async (col: string, val: any) => ({ data: {}, error: null }),
        }),
      }),
    }),
    rpc: async (fn: string, params: any) => ({ data: 0, error: null }),
    storage: {
      from: (bucket: string) => ({
        upload: async (path: string, blob: any, options: any) => ({ data: { path: '' }, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: '' } }),
      }),
    },
  };
  return mockClient;
};
