import { toast } from "react-toastify";

import { setupApiClient } from "@/services/api"

const api = setupApiClient();

export const handleDoCard = async (user_id, admin_id) => {
  try {
    const res = await api.patch(`/usuarios/emissao/${user_id}`, { admin_id });
    if(res.data) {
      const response = await api.get(`/usuarios/pendentes`, { params: { admin_id } });
      toast.success('Carteirinha emitida.');
      return response.data;
    }  
  } catch(err) {
    console.log(err);
    toast.error('Erro ao emitir carteirinha.');
  }
}

export const handleSendCard = async (user_id, admin_id) => {
  try {
    const res = await api.patch(`/usuarios/envio/${user_id}`, { admin_id });
    if(res.data) {
      const response = await api.get(`/usuarios/pendentes`, { params: { admin_id } });
      toast.success('Carteirinha enviada.');
      return response.data;
  }
  } catch(err) {
    console.log(err);
    toast.error('Erro ao enviar carteirinha.');
  }
}