import Professional from "App/Models/Professional"

export default class ProfessionalsController {
    public async index() {
            const listProfessional = await Professional
                                            .query()
                                            .preload('tipoProfissional')
                                            .orderBy('nome', 'asc')
            return listProfessional
    }

    public async show({request}) {
            const professional = await Professional
                                        .query()
                                        .preload('tipoProfissional')
                                        .where('id', request.params().id);
            return professional;
    }

    public async store({request}) {
            const professional = await Professional.create(request.body());
            return professional.$isPersisted;
    }

    public async update({request}) {
            const professional = await Professional.findOrFail(request.params().id);
            return await professional.merge(request.body()).save();
    }

    public async destroy({request}) {
            const professional = await Professional.findOrFail(request.params().id);
            return await professional.delete();
    }
}
