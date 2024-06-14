const { default: mongoose } = require("mongoose");
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");

const create = validateRequest({
  body: z.object({
    nome: z.string({ required_error: "O nome é obrigatório" }),
    descricao: z.string({ required_error: "A descrição é obrigatória" }),
    img_URL: z.string({ required_error: "O link de imagem é obrigatório" }),
    Tipo: z.string({ required_error: "O tipo é obrigatório" }),
  }),
});

const update = validateRequest({
  body: z.object({
    nome: z.string().optional(),
    descricao: z.string().optional(),
    equipe: z.string().optional(),
  }),
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é valido"),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id não é valido"),
  }),
});

module.exports = {
  create,
  update,
  destroy,
};
