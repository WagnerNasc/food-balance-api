import 'dotenv/config'
import * as yup from 'yup'

const envSchema = yup.object().shape({
  NODE_ENV: yup.mixed().oneOf(['dev', 'prod']).default('dev'),
  PORT: yup
    .number()
    .default(3000)
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('The PORT cannot be empty.'),
})

const _env = envSchema.validateSync(process.env, { stripUnknown: true })

export const env = _env
