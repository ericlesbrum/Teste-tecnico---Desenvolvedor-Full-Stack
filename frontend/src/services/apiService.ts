import axios, { type AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response = await axios.get<T>(url, config);
        return response.data;
    } catch (error: any) {
        console.error(`Erro GET: ${url}`, error);
        toast.error('Erro ao obter dados do servidor');
        throw error;
    }
}

export async function post<T>(url: string, data: T, config?: AxiosRequestConfig): Promise<void> {
    try {
        await axios.post(url, data, config);
    } catch (error: any) {
        console.error(`Erro POST: ${url}`, error);
        toast.error('Erro ao enviar dados para o servidor');
        throw error;
    }
}

export async function del(url: string, config?: AxiosRequestConfig): Promise<void> {
    try {
        await axios.delete(url, config);
    } catch (error: any) {
        console.error(`Erro DELETE: ${url}`, error);
        toast.error('Erro ao excluir dados do servidor');
        throw error;
    }
}
