import { baseApi } from "./api";

export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

export const itemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Item[], void>({
      query: () => "/items",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Item" as const, id })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
    }),
    addItem: builder.mutation<Item, Omit<Item, "id" | "createdAt">>({
      query: (newItem) => ({
        url: "/items",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    deleteItem: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/items?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Item", id }],
    }),
  }),
});

export const { useGetItemsQuery, useAddItemMutation, useDeleteItemMutation } =
  itemsApi;
