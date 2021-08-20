import ProfessionalType from "App/Models/ProfessionalType";

export default class ProfessionalTypesController {
    public async index() {
            const listProfessionalType = await ProfessionalType
                                                .query()
                                                .orderBy('descricao', 'asc')
            return listProfessionalType
    }

    public async show({request}) {
            const professionalType = await ProfessionalType.findOrFail(request.params().id)
            return professionalType
    }

    public async store({request}) {
            const professionalType = await ProfessionalType.create(request.body())
            return professionalType
    }

    public async update({request}) {
            const professionalType = await ProfessionalType.findOrFail(request.params().id)
            return await professionalType.merge(request.body()).save()
    }

    public async destroy({request}) {
            const professionalType = await ProfessionalType.findOrFail(request.params().id)
            return await professionalType.delete()
    }
}
