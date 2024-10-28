import { create } from 'zustand';
import { deleteCategory, deleteContent, getCategories, getContent, postCategory, postContent } from '../utils/fetchinData';
import Swal from 'sweetalert2';

export const useStore = create((set) => ({

    //maneja el JWT
    jwt: null,
    setJwt: (jwt) => {
        set({ jwt });
    },
    //manejar contenido
    contentData: [],
    loading: false,
    error: null,
    fetchContentData: async (jwt) => {
        set({ loading: true });
        try {
            const result = await getContent(jwt);
            set({ contentData: result, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    postContentData: async (jwt, newData) => {
        set({ loading: true });
        try {
            const result = await postContent(jwt, newData);
            console.log(result);
            set((state) => ({ contentData: [...state.contentData, result], loading: false }));
            Swal.fire(
                '¡Excelente!',
                'Contenido creado con éxito',
                'success'
            )
        } catch (error) {
            set({ error: error.message, loading: false });
            Swal.fire(
                'Ups!',
                'Ocurrió un error creando el contenido',
                'error'
            )
        }
    },
    deleteContentData: async (jwt, id) => {
        set({ loading: true });
        try {
            await deleteContent(jwt, id);
            const getCats = await getContent(jwt);
            set((state) => ({ contentData: [...getCats], loading: false }));
            Swal.fire(
                '¡Excelente!',
                'Contenido eliminado con éxito',
                'success'
            )
            .then(() => {})
            .catch(() => {});
        } catch (error) {
            Swal.fire(
                'Ups!',
                'Hubo un error eliminando el contenido',
                'error'
            )
            .then(() => {})
            .catch(() => {});
            set({ error: error.message, loading: false });
        }
    },

    //manejar contenido
    categoriesData: [],
    loadingCategories: false,
    errorCategories: null,
    fetchCategoriesData: async (jwt) => {
        set({ loadingCategories: true });
        try {
            const result = await getCategories(jwt);
            set({ categoriesData: result, loadingCategories: false });
        } catch (error) {
            set({ error: error.message, loadingCategories: false });
        }
    },
    postCategoriesData: async (jwt, newData) => {
        set({ loadingCategories: true });
        try {
            const result = await postCategory(jwt, newData);
            set((state) => ({ categoriesData: [...state.categoriesData, result], loadingCategories: false }));
            Swal.fire(
                '¡Excelente!',
                'Categoría creada con éxito',
                'success'
            )
            .then(() => {})
            .catch(() => {});
        } catch (error) {
            Swal.fire(
                'Ups!',
                'Hubo un error creando la categoría',
                'error'
            )
            .then(() => {})
            .catch(() => {});
            set({ error: error.message, loadingCategories: false });
        }
    },
    deleteCategoriesData: async (jwt, id) => {
        set({ loadingCategories: true });
        try {
            await deleteCategory(jwt, id);
            const getCats = await getCategories(jwt);
            set((state) => ({ categoriesData: [getCats], loadingCategories: false }));
            Swal.fire(
                '¡Excelente!',
                'Categoría eliminada con éxito',
                'success'
            )
            .then(() => {})
            .catch(() => {});
        } catch (error) {
            Swal.fire(
                'Ups!',
                'Hubo un error eliminando la categoría',
                'error'
            )
            .then(() => {})
            .catch(() => {});
            set({ error: error.message, loadingCategories: false });
        }
    },
}));

export default useStore;