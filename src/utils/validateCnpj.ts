import { cnpj } from 'cpf-cnpj-validator'

export const validarCnpj = (cnpjParams: string): boolean => {
  const cleanCnpj = cnpjParams.replace(/\D/g, '')
  if (cleanCnpj.length !== 14) {
    return false
  }

  return cnpj.isValid(cleanCnpj)
}
