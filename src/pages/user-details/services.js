import { toast } from "react-toastify";
import Router from "next/router";

import { setupApiClient } from "@/services/api"
import { setSessionItem } from "@/utils/sessionStorage";
import { signOut } from "@/context/AuthContext";

const api = setupApiClient();

export const handleUpdate = async(data, id) => {
  try {
    const response = await api.put(`usuarios/${id}`, data);
    setSessionItem(response.data);
    toast.success('Cadastro atualizado com sucesso');
    Router.push('/');
  } catch(err) {
    toast.error('Erro ao atualizar o cadastro.');
    Router.push('/');
  }
}

export const handleDelete = async(id) => {
  try {
    await api.delete(`/usuarios/${id}`)
    toast.success('Conta excluída.')
    signOut();
  } catch(err) {
    toast.error('Erro ao excluir sua conta.')
  }
}

export const handleChangePassword = async(data, id) => {
  let { password, passwordConfirmation } = data;

  if(password !== passwordConfirmation) {
    toast.error('A nova senha e sua confirmação não são iguais.');
    return;
  }

  try {
    await api.patch(`/usuarios/change-password/${id}`, data);
    toast.success('Senha alterada.');
    Router.push('/');
  } catch(error) {
    toast.error('Erro ao alterar a senha.');
  }
}